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
import { Separator } from "@/components/ui/separator";
import { BookOpen, TrendingUp, Clock } from "lucide-react";

export default function Home() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const postsByCategory = categories.reduce(
    (acc, categoria) => {
      acc[categoria] = posts.filter(
        (post) => post.metadata.categoria === categoria,
      );
      return acc;
    },
    {} as Record<string, typeof posts>,
  );

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                GetStartedHub
              </h1>
              <p className="text-muted-foreground mt-1">
                Guías y tutoriales para empezar
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
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

        <section className="mb-12">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <BookOpen className="w-8 h-8 mb-2 text-primary" />
                <CardTitle>Guías Completas</CardTitle>
                <CardDescription>
                  Tutoriales paso a paso para dominar nuevas tecnologías
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="w-8 h-8 mb-2 text-primary" />
                <CardTitle>Contenido Actualizado</CardTitle>
                <CardDescription>
                  Información relevante y actualizada constantemente
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Clock className="w-8 h-8 mb-2 text-primary" />
                <CardTitle>Aprende Rápido</CardTitle>
                <CardDescription>
                  Contenido optimizado para aprender de forma eficiente
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {categories.map((categoria) => {
          const categoryPosts = postsByCategory[categoria];
          if (!categoryPosts || categoryPosts.length === 0) return null;

          return (
            <section key={categoria} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 capitalize">
                {categoria.replace("-", " ")}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryPosts.map((post) => (
                  <Card
                    key={post.metadata.slug}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="line-clamp-2">
                        {post.metadata.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.metadata.descripcion}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link
                        href={`/${post.metadata.categoria}/${post.metadata.slug}`}
                      >
                        <Button className="w-full">Leer más</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}

        {posts.length === 0 && (
          <Card className="text-center py-12">
            <CardHeader>
              <CardTitle>No hay contenido disponible</CardTitle>
              <CardDescription>
                Ejecuta{" "}
                <code className="bg-muted px-2 py-1 rounded">
                  npm run generate:content
                </code>{" "}
                para generar páginas
              </CardDescription>
            </CardHeader>
          </Card>
        )}

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
      </div>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} GetStartedHub. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
