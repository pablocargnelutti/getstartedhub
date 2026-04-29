import Link from "next/link";
import { getAllCategories, getPostsByCategory } from "@/lib/markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Folder } from "lucide-react";

export const metadata = {
  title: "Categories - Browse by Topic",
  description: "Explore articles organized by category. Find guides and tutorials on web development, career, AI/ML, productivity, and design.",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  const categoryData = categories.map((category) => ({
    name: category,
    posts: getPostsByCategory(category),
    displayName: category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  const categoryDescriptions: Record<string, string> = {
    "web-development": "Learn modern web development with React, Next.js, and more",
    "career": "Advance your career with freelancing, job search, and professional development tips",
    "ai-ml": "Master artificial intelligence and machine learning fundamentals",
    "productivity": "Boost your productivity with tools like Notion and effective workflows",
    "design": "Learn UI/UX design principles and create beautiful user experiences",
  };

  const categoryIcons: Record<string, string> = {
    "web-development": "💻",
    "career": "🚀",
    "ai-ml": "🤖",
    "productivity": "⚡",
    "design": "🎨",
  };

  return (
    <div className="min-h-screen">
      <section className="border-b bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Folder className="mx-auto mb-4 h-16 w-16 text-primary" />
            <h1 className="mb-4 text-5xl font-bold tracking-tight">
              Browse by Category
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore our articles organized by topic. Find exactly what you're looking for.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categoryData.map((category, index) => (
            <Link
              key={category.name}
              href={`/blog?category=${category.name}`}
              className="group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full transition-all hover:shadow-xl hover:-translate-y-1 hover:border-primary/50">
                <CardHeader>
                  <div className="mb-4 text-5xl">
                    {categoryIcons[category.name] || "📚"}
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {category.displayName}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {categoryDescriptions[category.name] || "Explore articles in this category"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>
                      {category.posts.length} {category.posts.length === 1 ? "article" : "articles"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {categoryData.length === 0 && (
          <Card className="mx-auto max-w-2xl text-center py-12">
            <CardHeader>
              <CardTitle className="text-2xl">No Categories Yet</CardTitle>
              <CardDescription className="text-base">
                Check back soon for new content!
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </section>
    </div>
  );
}
