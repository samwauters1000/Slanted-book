export interface ContentNode {
  id: string;
  title: string;
  level: number;
  paragraphs: string[];
  images: string[];
  graphics?: string[];
  children: ContentNode[];
}

export interface BookMeta {
  title: string;
  subtitle: string;
  author: string;
  institute: string;
  isbn: string;
  rights: string;
  preview: string[];
}

export interface BookData {
  meta: BookMeta;
  chapters: ContentNode[];
}
