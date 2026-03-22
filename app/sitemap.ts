import type { MetadataRoute } from 'next';
import vegetables from '../data/vegetables.json';

function nameToSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://potmyveg.vercel.app';

  const vegPages = (vegetables as { name: string }[]).map((v) => ({
    url: `${baseUrl}/vegetables/${nameToSlug(v.name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/vegetables`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    ...vegPages,
  ];
}
