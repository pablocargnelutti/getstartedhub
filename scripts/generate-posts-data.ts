import fs from "fs";
import path from "path";
import { getAllPosts, getAllCategories } from "../lib/markdown";

const postsData = {
  posts: getAllPosts(),
  categories: getAllCategories(),
};

const outputPath = path.join(process.cwd(), "public", "posts-data.json");
fs.writeFileSync(outputPath, JSON.stringify(postsData, null, 2));

console.log("✅ Posts data generated successfully!");
