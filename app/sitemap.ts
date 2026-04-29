import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://getstartedhub.com';
  
  const slugs = getAllSlugs();
  
  const posts = slugs.map(({ categoria, slug }) => ({
    url: `${baseUrl}/${categoria}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...posts,
  ];
}
