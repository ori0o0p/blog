export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  excerpt: string;
  category: string;
  categories?: string[];
  subcategory?: string;
  tags?: string[];
  readingTime?: string;
}

export interface Subcategory {
  name: string;
  title: string;
  description: string;
  posts?: Post[];
}

export interface Category {
  name: string;
  title: string;
  description: string;
  subcategories?: Subcategory[];
  posts?: Post[];
}