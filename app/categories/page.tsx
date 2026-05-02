"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Folder,
  Code2,
  Rocket,
  Brain,
  Zap,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import type { Post } from "@/lib/markdown";

export default function CategoriesPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/posts-data.json")
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data.posts || []);
        setCategories(data.categories || []);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error loading posts:", error);
        setIsLoaded(true);
      });
  }, []);

  const categoryData = categories.map((category) => ({
    name: category,
    posts: allPosts.filter((post) => post.metadata.categoria === category),
    displayName: category
      .replace("-", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  const categoryDescriptions: Record<string, string> = {
    "web-development":
      "Learn modern web development with React, Next.js, and more",
    career:
      "Advance your career with freelancing, job search, and professional development tips",
    "ai-ml": "Master artificial intelligence and machine learning fundamentals",
    productivity:
      "Boost your productivity with tools like Notion and effective workflows",
    design:
      "Learn UI/UX design principles and create beautiful user experiences",
  };

  const categoryConfig: Record<
    string,
    { icon: LucideIcon; gradient: string; color: string }
  > = {
    "web-development": {
      icon: Code2,
      gradient: "from-blue-500/10 via-cyan-500/10 to-blue-500/10",
      color: "text-blue-600 dark:text-blue-400",
    },
    career: {
      icon: Rocket,
      gradient: "from-purple-500/10 via-pink-500/10 to-purple-500/10",
      color: "text-purple-600 dark:text-purple-400",
    },
    "ai-ml": {
      icon: Brain,
      gradient: "from-emerald-500/10 via-teal-500/10 to-emerald-500/10",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    productivity: {
      icon: Zap,
      gradient: "from-amber-500/10 via-orange-500/10 to-amber-500/10",
      color: "text-amber-600 dark:text-amber-400",
    },
    design: {
      icon: Palette,
      gradient: "from-rose-500/10 via-pink-500/10 to-rose-500/10",
      color: "text-rose-600 dark:text-rose-400",
    },
  };

  const totalArticles = categoryData.reduce(
    (sum, cat) => sum + cat.posts.length,
    0,
  );

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="border-b bg-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-3 text-4xl font-bold tracking-tight">
              Browse by Category
            </h1>
            <p className="text-base text-muted-foreground">
              {totalArticles} articles across {categoryData.length} categories
            </p>
          </div>
        </div>
      </section>

      <AdSlot slot="7777777777" format="auto" />

      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categoryData.map((category) => {
            const config = categoryConfig[category.name] || {
              icon: Folder,
              gradient: "from-gray-500/10 to-gray-500/10",
              color: "text-gray-600 dark:text-gray-400",
            };
            const Icon = config.icon;

            return (
              <Link
                key={category.name}
                href={`/blog?category=${category.name}`}
                className="group"
              >
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted`}
                      >
                        <Icon className={`h-5 w-5 ${config.color}`} />
                      </div>
                      <CardTitle className="text-xl transition-colors group-hover:text-primary">
                        {category.displayName}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm line-clamp-2">
                      {categoryDescriptions[category.name] ||
                        "Explore articles in this category"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>
                        {category.posts.length}{" "}
                        {category.posts.length === 1 ? "article" : "articles"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {categoryData.length === 0 && (
          <Card className="mx-auto max-w-2xl border-2 border-dashed text-center py-16">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Folder className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">No Categories Yet</CardTitle>
              <CardDescription className="text-base">
                Check back soon for new content!
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </section>

      <AdSlot slot="8888888888" format="auto" />
    </div>
  );
}
