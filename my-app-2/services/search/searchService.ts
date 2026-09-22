import { Product } from "@/services/products/types";
import { MOCK_PRODUCTS } from "@/data/products.mock";
import { CATEGORIES } from "@/data/categories.mock";

export interface SearchResult {
  products: Product[];
  categories: { name: string; slug: string; productCount: number }[];
  brands: string[];
  suggestions: string[];
}

export class SearchService {
  private static popularSearches = [
    "8K Drone",
    "Gimbal Camera",
    "Waterproof Trench",
    "Titanium Watch",
    "18K Gold Diamond",
    "Anamorphic Lens",
    "Acoustic Speaker",
  ];

  static async search(query: string): Promise<SearchResult> {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        products: [],
        categories: [],
        brands: [],
        suggestions: this.popularSearches,
      };
    }

    const matchedProducts = MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 8);

    const matchedCategories = CATEGORIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q)
    ).map((c) => ({ name: c.name, slug: c.slug, productCount: c.productCount }));

    const uniqueBrands = Array.from(
      new Set(
        MOCK_PRODUCTS.filter((p) => p.brand.toLowerCase().includes(q)).map((p) => p.brand)
      )
    );

    const matchedSuggestions = this.popularSearches.filter((s) => s.toLowerCase().includes(q));

    return {
      products: matchedProducts,
      categories: matchedCategories,
      brands: uniqueBrands,
      suggestions: matchedSuggestions.length > 0 ? matchedSuggestions : [`${query} in Optics`, `${query} in Haute Fashion`],
    };
  }
}
