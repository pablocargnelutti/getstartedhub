import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export interface PostMetadata {
  title: string;
  categoria: string;
  slug: string;
  fecha: string;
  descripcion: string;
  keywords: string;
  autor?: string;
}

export interface Post {
  metadata: PostMetadata;
  content: string;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

export function getAllCategories(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const categories = fs.readdirSync(postsDirectory);
  return categories.filter((category) => {
    const categoryPath = path.join(postsDirectory, category);
    return fs.statSync(categoryPath).isDirectory();
  });
}

export function getCategoriesWithCount(): Category[] {
  const categories = getAllCategories();

  return categories
    .map((slug) => {
      const categoryPath = path.join(postsDirectory, slug);
      const files = fs.readdirSync(categoryPath);
      const count = files.filter((file) => file.endsWith(".md")).length;

      const name = slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return {
        name,
        slug,
        count,
      };
    })
    .sort((a, b) => b.count - a.count);
}

export function getAllPosts(): Post[] {
  const categories = getAllCategories();
  const allPosts: Post[] = [];

  categories.forEach((categoria) => {
    const categoryPath = path.join(postsDirectory, categoria);
    const files = fs.readdirSync(categoryPath);

    files.forEach((filename) => {
      if (filename.endsWith(".md")) {
        const filePath = path.join(categoryPath, filename);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);

        allPosts.push({
          metadata: data as PostMetadata,
          content,
        });
      }
    });
  });

  return allPosts.sort(
    (a, b) =>
      new Date(b.metadata.fecha).getTime() -
      new Date(a.metadata.fecha).getTime(),
  );
}

export function getPostsByCategory(categoria: string): Post[] {
  const categoryPath = path.join(postsDirectory, categoria);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = fs.readdirSync(categoryPath);
  const posts: Post[] = [];

  files.forEach((filename) => {
    if (filename.endsWith(".md")) {
      const filePath = path.join(categoryPath, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      posts.push({
        metadata: data as PostMetadata,
        content,
      });
    }
  });

  return posts.sort(
    (a, b) =>
      new Date(b.metadata.fecha).getTime() -
      new Date(a.metadata.fecha).getTime(),
  );
}

export function getPostBySlug(categoria: string, slug: string): Post | null {
  const filePath = path.join(postsDirectory, categoria, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    metadata: data as PostMetadata,
    content,
  };
}

export function getAllSlugs(): { categoria: string; slug: string }[] {
  const categories = getAllCategories();
  const slugs: { categoria: string; slug: string }[] = [];

  categories.forEach((categoria) => {
    const categoryPath = path.join(postsDirectory, categoria);
    const files = fs.readdirSync(categoryPath);

    files.forEach((filename) => {
      if (filename.endsWith(".md")) {
        const slug = filename.replace(/\.md$/, "");
        slugs.push({ categoria, slug });
      }
    });
  });

  return slugs;
}
