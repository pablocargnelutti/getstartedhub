import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs, getAllPosts } from "@/lib/markdown";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import { ReadingProgress } from "@/components/reading-progress";
import { TableOfContents } from "@/components/table-of-contents";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.metadata.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.descripcion,
    keywords: post.metadata.keywords,
    authors: [{ name: post.metadata.autor || "GetStartedHub Team" }],
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.descripcion,
      type: "article",
      publishedTime: post.metadata.fecha,
      authors: [post.metadata.autor || "GetStartedHub Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.descripcion,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.metadata.slug === slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.metadata.fecha).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readingTime = calculateReadingTime(post.content);
  const relatedPosts = posts
    .filter((p) => p.metadata.slug !== slug && p.metadata.categoria === post.metadata.categoria)
    .slice(0, 3);

  const headings = extractHeadings(post.content);

  return (
    <>
      <ReadingProgress />
      
      <article className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <header className="mb-12 animate-fade-in">
                <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-full bg-primary/10 px-4 py-1.5 font-medium text-primary">
                    {post.metadata.categoria?.replace("-", " ") || "Article"}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {readingTime} min read
                  </span>
                </div>

                <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  {post.metadata.title}
                </h1>

                <p className="mb-8 text-xl text-muted-foreground leading-relaxed">
                  {post.metadata.descripcion}
                </p>

                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {(post.metadata.autor || "GH").charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">
                      {post.metadata.autor || "GetStartedHub Team"}
                    </p>
                    <p className="text-sm text-muted-foreground">Content Creator</p>
                  </div>
                </div>
              </header>

              <Separator className="mb-8" />

              <AdSlot slot="1111111111" format="auto" className="mb-12" />

              <div
                className="prose-custom animate-slide-up"
                dangerouslySetInnerHTML={{
                  __html: convertMarkdownToHTML(post.content),
                }}
              />

              <AdSlot slot="2222222222" format="auto" className="my-12" />

              <Separator className="my-12" />

              <div className="rounded-lg bg-muted/50 p-8">
                <h3 className="mb-4 text-2xl font-bold">About this article</h3>
                <p className="mb-6 text-muted-foreground">{post.metadata.descripcion}</p>
                <div className="flex flex-wrap gap-2">
                  {post.metadata.keywords.split(",").map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1.5 text-sm font-medium"
                    >
                      <Tag className="h-3 w-3" />
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <AdSlot slot="3333333333" format="auto" className="my-12" />

              {relatedPosts.length > 0 && (
                <>
                  <Separator className="my-12" />
                  <section>
                    <h2 className="mb-8 text-3xl font-bold tracking-tight">
                      Related Articles
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {relatedPosts.map((relatedPost) => (
                        <Card
                          key={relatedPost.metadata.slug}
                          className="transition-all hover:shadow-lg hover:-translate-y-1"
                        >
                          <CardHeader>
                            <CardTitle className="line-clamp-2">
                              {relatedPost.metadata.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-3">
                              {relatedPost.metadata.descripcion}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Link
                              href={`/blog/${relatedPost.metadata.slug}`}
                              className="font-medium text-primary hover:underline"
                            >
                              Read more →
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                <TableOfContents headings={headings} />
                
                <AdSlot slot="4444444444" format="rectangle" responsive={false} />

                <Card>
                  <CardHeader>
                    <CardTitle>Newsletter</CardTitle>
                    <CardDescription>
                      Get the latest articles delivered to your inbox
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Your email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                      <Button className="w-full">Subscribe</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.metadata.title,
            description: post.metadata.descripcion,
            author: {
              "@type": "Person",
              name: post.metadata.autor || "GetStartedHub Team",
            },
            datePublished: post.metadata.fecha,
            publisher: {
              "@type": "Organization",
              name: "GetStartedHub",
            },
          }),
        }}
      />
    </>
  );
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

function extractHeadings(content: string): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: Array<{ id: string; text: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    headings.push({ id, text, level });
  }

  return headings;
}

function convertMarkdownToHTML(markdown: string): string {
  let html = markdown;

  html = html.replace(/^### (.*$)/gim, (match, p1) => {
    const id = p1.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `<h3 id="${id}">${p1}</h3>`;
  });
  html = html.replace(/^## (.*$)/gim, (match, p1) => {
    const id = p1.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `<h2 id="${id}">${p1}</h2>`;
  });
  html = html.replace(/^# (.*$)/gim, (match, p1) => {
    const id = p1.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `<h1 id="${id}">${p1}</h1>`;
  });

  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  html = html.replace(/^\- (.*$)/gim, "<li>$1</li>");
  html = html.replace(/(<li>[\s\S]*<\/li>)/g, "<ul>$1</ul>");

  html = html.replace(/^\d+\. (.*$)/gim, "<li>$1</li>");

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  html = html.replace(/\n\n/g, "</p><p>");
  html = "<p>" + html + "</p>";

  html = html.replace(/<p><h/g, "<h");
  html = html.replace(/<\/h(\d)><\/p>/g, "</h$1>");
  html = html.replace(/<p><ul>/g, "<ul>");
  html = html.replace(/<\/ul><\/p>/g, "</ul>");
  html = html.replace(/<p><pre>/g, "<pre>");
  html = html.replace(/<\/pre><\/p>/g, "</pre>");

  return html;
}
