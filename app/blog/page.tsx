import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, Search } from "lucide-react";
import { AdSlot } from "@/components/ad-slot";

export const metadata = {
  title: "Blog - All Articles",
  description: "Browse all our guides, tutorials, and articles to help you get started with new skills and technologies.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen">
      <section className="border-b bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-5xl font-bold tracking-tight">
              All Articles
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Explore our comprehensive collection of guides and tutorials
            </p>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search articles..."
                className="h-14 w-full rounded-lg border border-input bg-background pl-12 pr-4 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
        </div>
      </section>

      <AdSlot slot="5555555555" format="auto" />

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-wrap gap-2">
          <Button variant="default" size="sm">
            All
          </Button>
          {categories.map((category) => (
            <Button key={category} variant="outline" size="sm">
              {category.replace("-", " ")}
            </Button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={post.metadata.slug}
              className="group animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Card className="h-full transition-all hover:shadow-xl hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {post.metadata.categoria?.replace("-", " ") || "Article"}
                    </span>
                    <span>•</span>
                    <Clock className="h-3 w-3" />
                    <span>5 min read</span>
                  </div>
                  <CardTitle className="line-clamp-2 text-2xl group-hover:text-primary transition-colors">
                    {post.metadata.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-base">
                    {post.metadata.descripcion}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/blog/${post.metadata.slug}`}
                    className="inline-flex items-center font-medium text-primary hover:underline"
                  >
                    Read more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <Card className="mx-auto max-w-2xl text-center py-12">
            <CardHeader>
              <CardTitle className="text-2xl">No Articles Yet</CardTitle>
              <CardDescription className="text-base">
                Check back soon for new content!
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </section>

      <AdSlot slot="6666666666" format="auto" />
    </div>
  );
}
