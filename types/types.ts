import { BlockType } from "notion-block-renderer";
import { ParsedUrlQuery } from "querystring";

export type LayoutProps = {
  path: string;
  title: string;
  description?: string;
  ogImage?: string;
  noindex?: boolean;
  noTitleTemplate?: boolean;
  isTopPage?: boolean;
  children: React.ReactNode;
  database: Database;
};

export type PageProps = {
  title: string;
  tags: string[];
  category: string;
  slug: string;
  cover: string;
  publishedAt: string;
  updatedAt: string;
  content: string;
};

export type Database = {
  response: { properties: PropertyType };
};

export type CardProps = { page: PageType };

export type ArticleProps = {
  page: PageType | any;
  blocks: BlockType[];
  database: any;
};

export type IndexProps = {
  pages: PageType[];
  database: Database;
};

export type CategoryProps = IndexProps & { category: string };

export type TagProps = IndexProps & { tag: string };

export type BlockProps = { block: BlockType };

export type Params = ParsedUrlQuery & {
  slug?: string;
  category?: string;
  tag?: string;
};

export type FileType = {
  file?: { url: string };
  external?: { url: string };
};

export type AnnotationType = {
  bold: boolean;
  code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  color: string;
};

export type RichTextType = {
  plain_text: string;
  href: string | null;
  annotations: AnnotationType;
};

export type PropertyType = {
  title: { title: RichTextType[] };
  slug: { rich_text: RichTextType[] };
  publishedAt: { date: { start: string } };
  updatedAt: { last_edited_time: string };
  isPublic: { checkbox: boolean };
  category: { select: { options: { id: string; name: string }[] } };
  tags: {
    multi_select: { options: { id: string; name: string }[] };
  };
};

export type PageType = {
  id: string;
  cover: FileType | null;
  properties: PropertyType;
};
