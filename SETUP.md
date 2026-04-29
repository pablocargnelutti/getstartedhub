# GetStartedHub - Premium Blog Setup Guide

A modern, high-conversion blog website optimized for AdSense revenue and user engagement.

## 🎯 Features

### Design & UX
- ✅ Premium, minimalist design inspired by Medium, Notion, and Stripe
- ✅ Excellent typography with strong visual hierarchy
- ✅ Smooth animations and transitions
- ✅ Sticky header with navigation
- ✅ Light/dark mode toggle
- ✅ Fully responsive (mobile-first)
- ✅ Reading progress bar on articles
- ✅ Estimated reading time per article

### Content & Layout
- ✅ Hero section with strong headline
- ✅ Grid of featured articles
- ✅ Categories/tags section
- ✅ Email capture CTA (newsletter)
- ✅ Blog post page with:
  - Large title + subtitle
  - Author info + date + reading time
  - Auto-generated table of contents
  - Clean article layout optimized for reading
  - Related posts section

### AdSense Optimization
- ✅ Strategically placed ad slots:
  - After hero section
  - Mid-content
  - End of article
  - Sidebar (desktop only)
- ✅ Non-spammy layout
- ✅ High readability focus

### SEO & Performance
- ✅ Dynamic meta tags
- ✅ Open Graph + Twitter cards
- ✅ Structured data (Article schema)
- ✅ Clean URLs (/blog/slug)
- ✅ Sitemap generation
- ✅ Lazy loading images
- ✅ next/image optimization
- ✅ Code splitting
- ✅ Minimal JavaScript

### Extra Features
- ✅ Search functionality (UI ready)
- ✅ Category filtering
- ✅ Markdown support for content
- ✅ 5 high-quality sample articles

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX
```

Replace `XXXXXXXXXX` with your actual Google AdSense client ID.

3. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## 📁 Project Structure

```
getstartedhub/
├── app/                          # Next.js App Router
│   ├── blog/                     # Blog pages
│   │   ├── [slug]/              # Individual blog posts
│   │   └── page.tsx             # Blog listing page
│   ├── categories/              # Categories page
│   ├── layout.tsx               # Root layout with header/footer
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ui/                      # UI components (shadcn/ui)
│   ├── header.tsx               # Site header
│   ├── footer.tsx               # Site footer
│   ├── theme-provider.tsx       # Dark mode provider
│   ├── theme-toggle.tsx         # Theme toggle button
│   ├── ad-slot.tsx              # AdSense ad component
│   ├── reading-progress.tsx    # Reading progress bar
│   └── table-of-contents.tsx   # Auto-generated TOC
├── content/                      # Blog content (Markdown)
│   └── posts/
│       ├── web-development/
│       ├── career/
│       ├── ai-ml/
│       ├── productivity/
│       └── design/
├── lib/                          # Utility functions
│   ├── markdown.ts              # Markdown processing
│   └── utils.ts                 # Helper functions
└── public/                       # Static assets
```

## ✍️ Adding Content

### Create a New Article

1. Choose a category folder in `content/posts/` or create a new one
2. Create a new `.md` file with a descriptive slug name
3. Add frontmatter at the top:

```markdown
---
title: "Your Article Title"
categoria: "web-development"
slug: "your-article-slug"
fecha: "2026-04-29"
descripcion: "A compelling description for SEO and social sharing"
keywords: "keyword1, keyword2, keyword3"
autor: "Your Name"
---

Your article content here in Markdown format...
```

### Markdown Features Supported

- Headings (H1-H3)
- Bold and italic text
- Code blocks with syntax highlighting
- Lists (ordered and unordered)
- Links
- Blockquotes

### Sample Article Structure

```markdown
## Introduction

Start with a hook that captures attention...

## Main Section 1

### Subsection

Content with **bold** and *italic* text.

- Bullet point 1
- Bullet point 2

## Main Section 2

More content...

## Conclusion

Wrap up with key takeaways...
```

## 🎨 Customization

### Update Site Metadata

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: {
    default: "Your Site Name",
    template: "%s | Your Site Name",
  },
  description: "Your site description",
  // ... other metadata
};
```

### Customize Colors

Edit `app/globals.css` to change the color scheme:

```css
:root {
  --primary: 0 0% 9%;        /* Primary color */
  --secondary: 0 0% 96.1%;   /* Secondary color */
  /* ... other colors */
}
```

### Configure AdSense

1. Sign up for Google AdSense
2. Get your client ID
3. Update `.env.local` with your client ID
4. Update ad slot IDs in:
   - `app/page.tsx` (homepage ads)
   - `app/blog/[slug]/page.tsx` (article ads)
   - `components/ad-slot.tsx` (default component)

### Add/Remove Navigation Links

Edit `components/header.tsx`:

```typescript
<nav className="hidden md:flex items-center gap-6">
  <Link href="/">Home</Link>
  <Link href="/blog">Blog</Link>
  <Link href="/categories">Categories</Link>
  <Link href="/about">About</Link>
</nav>
```

## 🔧 Advanced Configuration

### Add New Categories

1. Create a new folder in `content/posts/`
2. Add articles to that folder
3. Update category descriptions in `app/categories/page.tsx`

### Customize Typography

Edit the font in `app/layout.tsx`:

```typescript
import { Inter, Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});
```

### Add Analytics

Install your preferred analytics (Google Analytics, Plausible, etc.):

```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

// In the body:
<Analytics />
```

## 📊 SEO Optimization

### Sitemap

The sitemap is automatically generated at `/sitemap.xml`. It includes:
- Homepage
- All blog posts
- Categories page

### Robots.txt

Located at `/robots.ts`, configured to allow all crawlers.

### Structured Data

Each blog post includes JSON-LD structured data for better search engine understanding.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

```bash
npm run build  # Test production build locally
```

### Deploy to Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

### Deploy to Other Platforms

The site is a standard Next.js app and can be deployed to any platform that supports Next.js:
- AWS Amplify
- Cloudflare Pages
- Railway
- Render

## 📈 Performance Tips

1. **Optimize Images**: Always use `next/image` for automatic optimization
2. **Lazy Load**: Components below the fold load on demand
3. **Code Splitting**: Automatic with Next.js App Router
4. **Caching**: Configure caching headers in `next.config.ts`

## 🐛 Troubleshooting

### Build Errors

**Issue**: "Module not found"
**Solution**: Run `npm install` to ensure all dependencies are installed

**Issue**: "Invalid frontmatter"
**Solution**: Check that all markdown files have valid YAML frontmatter

### Styling Issues

**Issue**: Tailwind classes not working
**Solution**: Ensure `globals.css` is imported in `layout.tsx`

**Issue**: Dark mode not working
**Solution**: Check that `ThemeProvider` wraps your app in `layout.tsx`

## 📝 Content Strategy

### Writing High-Quality Articles

1. **Research Keywords**: Use tools like Ahrefs or SEMrush
2. **Write Long-Form**: Aim for 2000+ words for better SEO
3. **Use Headings**: Structure content with H2 and H3 tags
4. **Add Images**: Break up text with relevant images
5. **Internal Linking**: Link to related articles
6. **Update Regularly**: Keep content fresh and current

### Optimizing for AdSense

1. **Quality Content**: Google rewards high-quality, original content
2. **User Experience**: Fast loading, mobile-friendly, easy navigation
3. **Ad Placement**: Strategic but not overwhelming
4. **Traffic**: Focus on SEO and social media to drive traffic
5. **Compliance**: Follow AdSense policies strictly

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For questions or issues:
- Open an issue on GitHub
- Check the Next.js documentation
- Review the Tailwind CSS docs

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
