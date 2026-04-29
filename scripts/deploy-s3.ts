import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs";
import path from "path";
import { lookup } from "mime-types";

const BUCKET_NAME = process.env.S3_BUCKET_NAME || "getstartedhub";
const REGION = process.env.AWS_REGION || "us-east-1";
const OUT_DIR = path.join(process.cwd(), "out");

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

async function getAllFiles(
  dirPath: string,
  arrayOfFiles: string[] = [],
): Promise<string[]> {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

function getContentType(filePath: string): string {
  const mimeType = lookup(filePath);
  return mimeType || "application/octet-stream";
}

async function uploadFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath);
  const relativePath = path.relative(OUT_DIR, filePath);
  const s3Key = relativePath.replace(/\\/g, "/");

  const contentType = getContentType(filePath);

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: fileContent,
      ContentType: contentType,
      CacheControl: s3Key.includes(".html")
        ? "public, max-age=0, must-revalidate"
        : "public, max-age=31536000, immutable",
    },
  });

  await upload.done();
  console.log(`✅ Uploaded: ${s3Key}`);
}

async function clearBucket() {
  console.log("🗑️  Limpiando bucket S3...");

  const listCommand = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
  });

  const listedObjects = await s3Client.send(listCommand);

  if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
    console.log("Bucket ya está vacío");
    return;
  }

  const deleteCommand = new DeleteObjectsCommand({
    Bucket: BUCKET_NAME,
    Delete: {
      Objects: listedObjects.Contents.map(({ Key }) => ({ Key })),
    },
  });

  await s3Client.send(deleteCommand);
  console.log(`🗑️  Eliminados ${listedObjects.Contents.length} archivos`);
}

async function deployToS3() {
  console.log("🚀 Iniciando deploy a S3...\n");

  if (!fs.existsSync(OUT_DIR)) {
    console.error(
      '❌ Error: El directorio "out" no existe. Ejecuta "npm run build" primero.',
    );
    process.exit(1);
  }

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.error(
      "❌ Error: Configura AWS_ACCESS_KEY_ID y AWS_SECRET_ACCESS_KEY en .env",
    );
    process.exit(1);
  }

  try {
    await clearBucket();

    const files = await getAllFiles(OUT_DIR);
    console.log(`\n📦 Subiendo ${files.length} archivos...\n`);

    for (const file of files) {
      await uploadFile(file);
    }

    console.log(`\n🎉 Deploy completado exitosamente!`);
    console.log(
      `🌐 URL: https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/index.html`,
    );
  } catch (error) {
    console.error("❌ Error durante el deploy:", error);
    process.exit(1);
  }
}

deployToS3();
