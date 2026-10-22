/** Public content assembly. Existing site content is preserved in site-content. */
export * from "./site-content";
import { newsArticles as existingArticles, type NewsArticle as ExistingArticle, type GalleryImage } from "./site-content";
import { emmetGardensArticle } from "./articles/emmet-gardens";

export interface ArticleInline {
  text: string;
  href?: string;
}

export type ArticleBlock =
  | { type: "paragraph"; content: ArticleInline[] }
  | { type: "heading"; text: string }
  | { type: "quote"; paragraphs: string[] }
  | { type: "image"; image: GalleryImage; caption: string }
  | { type: "cta"; title: string; content: ArticleInline[] };

export interface NewsArticle extends ExistingArticle {
  author?: string;
  category?: string;
  heroCaption?: string;
  standfirst?: ArticleInline[];
  seoTitle?: string;
  metaDescription?: string;
  socialDescription?: string;
  blocks?: ArticleBlock[];
}

export const newsArticles: NewsArticle[] = [
  emmetGardensArticle,
  ...existingArticles.filter((article) => article.slug !== emmetGardensArticle.slug),
];
