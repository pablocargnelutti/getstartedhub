import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Tag } from "lucide-react";
import Script from "next/script";

interface PageProps {
  params: Promise<{
    categoria: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map(({ categoria, slug }) => ({
    categoria,
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { categoria, slug } = await params;
  const post = getPostBySlug(categoria, slug);

  if (!post) {
    return {
      title: "Página no encontrada",
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.descripcion,
    keywords: post.metadata.keywords,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.descripcion,
      type: "article",
      publishedTime: post.metadata.fecha,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { categoria, slug } = await params;
  const post = getPostBySlug(categoria, slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.metadata.fecha).toLocaleDateString(
    "es-ES",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-XXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Tag className="w-4 h-4" />
              <span className="capitalize">{categoria.replace("-", " ")}</span>
            </div>
            <CardTitle className="text-4xl mb-4">
              {post.metadata.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-base">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="mb-8">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-XXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        <Card>
          <CardContent className="pt-6">
            <div
              className="prose prose-lg max-w-none dark:prose-invert
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                prose-p:text-base prose-p:leading-7
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-muted prose-pre:border
                prose-ul:list-disc prose-ol:list-decimal
                prose-li:text-base"
              dangerouslySetInnerHTML={{
                __html: convertMarkdownToHTML(post.content),
              }}
            />
          </CardContent>
        </Card>

        <div className="my-8">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-XXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        <Separator className="my-8" />

        <Card>
          <CardHeader>
            <CardTitle>Sobre este artículo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{post.metadata.descripcion}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.metadata.keywords.split(",").map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {keyword.trim()}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-XXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </article>

      <Script id="adsense-init" strategy="afterInteractive">
        {`
          (adsbygoogle = window.adsbygoogle || []).push({});
        `}
      </Script>
    </>
  );
}

function convertMarkdownToHTML(markdown: string): string {
  let html = markdown;

  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    "<pre><code>$2</code></pre>",
  );
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  html = html.replace(/^\- (.*$)/gim, "<li>$1</li>");
  html = html.replace(/(<li>[\s\S]*<\/li>)/g, "<ul>$1</ul>");

  html = html.replace(/^\d+\. (.*$)/gim, "<li>$1</li>");

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
