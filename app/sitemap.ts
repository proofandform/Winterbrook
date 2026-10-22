import type { MetadataRoute } from "next";
import { developments, newsArticles } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = "https://www.winterbrook.ie";
  const pages = ["", "/homes", "/past-developments", "/land", "/about", "/news", "/contact"];
  return [
    ...pages.map((path) => ({ url: `${site}${path}` })),
    ...developments.map((development) => ({ url: `${site}/homes/${development.slug}` })),
    ...newsArticles.map((article) => ({ url: `${site}/news/${article.slug}`, lastModified: article.date })),
  ];
}
