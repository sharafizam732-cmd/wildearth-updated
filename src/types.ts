export type VideoCategory = string;

export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  count?: string;
}

export interface Video {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  category: VideoCategory;
  categoryName: string;
  duration: string;
  releaseDate: string;
  isPremium: boolean;
  price: number;
  vimeoId: string;
  vimeoOttUrl?: string;
  trailerUrl?: string;
  unlockUrl?: string; // Direct link to payment gateway website
  previewUrl: string;
  featured: boolean;
  isLatest: boolean;
  tags: string[];
  species: string[];
  location: string;
  director: string;
  resolution: '4K UHD' | '1080p HD';
  rating: number;
  reviewsCount: number;
  viewsCount: string;
  audioTracks: string[];
  published: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'subscriber' | 'admin';
  avatarUrl?: string;
  memberSince: string;
}

export interface CartItem {
  video: Video;
  addedAt: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: Video[];
  total: number;
  paymentMethod: string;
  status: 'completed' | 'processing';
}

export interface ElementorTemplateItem {
  id: string;
  title: string;
  type: 'page' | 'header' | 'footer' | 'single' | 'archive' | 'kit';
  category: string;
  description: string;
  previewImage?: string;
  jsonFileName: string;
  jsonContent: object;
}
