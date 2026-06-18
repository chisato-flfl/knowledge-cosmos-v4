export interface Book {
  id: string;
  title: string;
  keywords: string[];
  themes: string[];
  questions: string[];
  color: string;
  size: number;
  // Layout position (calculated client-side)
  x?: number;
  y?: number;
}

export interface RelatedBook {
  bookId: string;
  title: string;
  relevance: string;
  questions: string[];
}

export interface FindRelatedResponse {
  relatedBooks: RelatedBook[];
  cosmicQuery: string;
}
