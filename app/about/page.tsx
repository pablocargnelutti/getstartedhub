import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Target,
  Users,
  Lightbulb,
  Rocket,
  Heart,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about GetStartedHub, our mission, and how we help people master new skills and launch their careers.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="mx-auto max-w-4xl text-center animate-fade-in">
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              About{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                GetStartedHub
              </span>
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl">
              Empowering learners worldwide with comprehensive guides and
              tutorials to master the skills that matter most in 2026.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <h2 className="mb-6 text-4xl font-bold tracking-tight">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              At GetStartedHub, we believe that everyone deserves access to
              high-quality, practical education that can transform their career
              and life. Our mission is to break down complex topics into clear,
              actionable guides that help you go from beginner to proficient.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you&apos;re looking to switch careers, level up your
              skills, or explore a new passion, we&apos;re here to guide you
              every step of the way with content that&apos;s always current,
              thoroughly researched, and optimized for efficient learning.
            </p>
          </div>

          <Separator className="my-12" />

          <div className="mb-12">
            <h2 className="mb-8 text-4xl font-bold tracking-tight text-center">
              What We Stand For
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-2 border-primary/20 transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg">
                    <Target className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Quality First
                  </CardTitle>
                  <CardDescription className="text-base">
                    Every guide is thoroughly researched, tested, and reviewed
                    to ensure accuracy and practical value. We don&apos;t
                    publish content just to fill space.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-accent/20 transition-all hover:border-accent hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent/60 shadow-lg">
                    <Users className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                    Learner-Centric
                  </CardTitle>
                  <CardDescription className="text-base">
                    We design our content with you in mind. Clear explanations,
                    practical examples, and step-by-step instructions that
                    respect your time.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-primary/20 transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
                    <Lightbulb className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Always Current
                  </CardTitle>
                  <CardDescription className="text-base">
                    Technology evolves rapidly. We continuously update our
                    content to reflect the latest best practices, tools, and
                    industry standards.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-accent/20 transition-all hover:border-accent hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-primary shadow-lg">
                    <Heart className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    Community Driven
                  </CardTitle>
                  <CardDescription className="text-base">
                    Your feedback shapes our content. We listen to our community
                    and create guides based on what you actually want to learn.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          <Separator className="my-12" />

          <div className="mb-12">
            <h2 className="mb-6 text-4xl font-bold tracking-tight">
              Our Story
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              GetStartedHub was born from a simple observation: there&apos;s an
              overwhelming amount of information online, but finding quality,
              beginner-friendly content that actually helps you get started is
              surprisingly difficult.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              We started with a handful of guides on web development and
              programming, focusing on creating content that we wished existed
              when we were learning. The response was incredible, and we&apos;ve
              grown into a comprehensive learning platform covering everything
              from development to marketing.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, we&apos;re proud to serve thousands of learners worldwide,
              helping them take their first steps into new careers and master
              the skills they need to succeed in the modern digital economy.
            </p>
          </div>

          <Separator className="my-12" />

          <div className="mb-12">
            <h2 className="mb-8 text-4xl font-bold tracking-tight text-center">
              By The Numbers
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center border-2 border-primary/20 hover:border-primary transition-all">
                <CardHeader>
                  <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                    <TrendingUp className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    10K+
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    Active Learners
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center border-2 border-accent/20 hover:border-accent transition-all">
                <CardHeader>
                  <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary">
                    <Rocket className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    100+
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    Comprehensive Guides
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center border-2 border-primary/20 hover:border-primary transition-all">
                <CardHeader>
                  <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                    <Users className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    50+
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    Topics Covered
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 py-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ready to Start Learning?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of learners who are already mastering new skills
              and advancing their careers with GetStartedHub.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25"
                asChild
              >
                <Link href="/blog">Explore Articles</Link>
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
    </div>
  );
}
