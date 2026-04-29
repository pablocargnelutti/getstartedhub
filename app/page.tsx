import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getAllCategories } from "@/lib/markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  BookOpen,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";
import { AdSlot } from "@/components/ad-slot";

export default function Home() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const featuredPosts = posts.slice(0, 6);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="mx-auto max-w-4xl text-center animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-1.5 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Your Journey Starts Here
              </span>
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Master New Skills,
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Launch Your Career
              </span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
              Comprehensive guides and tutorials to help you get started with
              the tools, technologies, and skills that matter most in 2026.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25"
                asChild
              >
                <Link href="/blog">
                  Explore Articles <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg border-2 border-primary/30 hover:bg-primary/10 hover:border-primary"
                asChild
              >
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <AdSlot slot="1234567890" format="auto" />

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-2 border-primary/20 transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader>
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg">
                <BookOpen className="h-7 w-7 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                In-Depth Guides
              </CardTitle>
              <CardDescription className="text-base">
                Step-by-step tutorials designed to take you from beginner to
                proficient
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 border-accent/20 transition-all hover:border-accent hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1">
            <CardHeader>
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent/60 shadow-lg">
                <TrendingUp className="h-7 w-7 text-accent-foreground" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                Always Current
              </CardTitle>
              <CardDescription className="text-base">
                Content updated regularly to reflect the latest industry trends
                and best practices
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 border-primary/20 transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader>
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
                <Clock className="h-7 w-7 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Learn Efficiently
              </CardTitle>
              <CardDescription className="text-base">
                Optimized for quick learning with clear explanations and
                practical examples
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <Separator className="container mx-auto" />

      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">
            Featured Articles
          </h2>
          <p className="text-xl text-muted-foreground">
            Start your learning journey with our most popular guides
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <article
              key={post.metadata.slug}
              className="group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full border-2 border-transparent transition-all hover:shadow-xl hover:-translate-y-1 hover:border-primary/30">
                <CardHeader>
                  <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-medium text-primary-foreground shadow-sm">
                      {post.metadata.categoria?.replace("-", " ") || "Article"}
                    </span>
                    <span>•</span>
                    <Clock className="h-3 w-3" />
                    <span>5 min read</span>
                  </div>
                  <CardTitle className="line-clamp-2 text-2xl group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all">
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
              <CardTitle className="text-2xl">
                No Content Available Yet
              </CardTitle>
              <CardDescription className="text-base">
                Run{" "}
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  npm run generate:content
                </code>{" "}
                to generate sample articles
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/blog">
              View All Articles <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <AdSlot slot="0987654321" format="auto" />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 py-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Never Miss an Update
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Get the latest guides, tutorials, and industry insights delivered
              straight to your inbox.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full rounded-lg border-2 border-primary/20 bg-background px-4 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-80"
              />
              <Button
                size="lg"
                className="h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
              >
                Subscribe
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Join 10,000+ learners. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
