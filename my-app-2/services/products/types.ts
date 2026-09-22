export type WeatherCondition =
  | "CLEAR"
  | "CLOUDY"
  | "RAIN"
  | "HEAVY_RAIN"
  | "STORM"
  | "FOG"
  | "SNOW"
  | "NIGHT";

export type TimeOfDay = "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT";

export interface ProductVariant {
  id: string;
  name: string;
  type: "color" | "size" | "storage" | "material" | "finish";
  value: string;
  priceModifier?: number;
  inStock: boolean;
}

export interface ProductSpecification {
  group: string;
  items: { label: string; value: string }[];
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  location?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  category: "electronics" | "fashion" | "watches" | "jewelry" | "lifestyle";
  subcategory: string;
  brand: string;
  price: number; // in INR
  compareAtPrice?: number;
  priceUSD: number;
  discount?: number;
  images: string[];
  videoUrl?: string;
  variants: ProductVariant[];
  specifications: ProductSpecification[];
  inventory: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  attributes: Record<string, string | number | boolean>;
  availability: "in_stock" | "low_stock" | "out_of_stock" | "pre_order";
  weatherAffinity: WeatherCondition[];
  featured?: boolean;
  trending?: boolean;
  isNew?: boolean;
  badge?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  bannerImage: string;
  productCount: number;
  availableAttributes: {
    key: string;
    label: string;
    options: string[];
  }[];
}

export interface FilterState {
  category?: string;
  subcategory?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  attributes?: Record<string, string[]>;
  availability?: string[];
  weather?: WeatherCondition;
  sortBy?: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
  page?: number;
  limit?: number;
}

export interface PaginatedProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  facets: {
    brands: { name: string; count: number }[];
    subcategories: { name: string; count: number }[];
    priceRange: { min: number; max: number };
    dynamicAttributes: Record<string, { value: string; count: number }[]>;
  };
}
