import { Product, Category, FilterState, PaginatedProductsResponse, WeatherCondition } from "./types";
import { MOCK_PRODUCTS } from "@/data/products.mock";
import { CATEGORIES } from "@/data/categories.mock";

export class ProductService {
  private static products: Product[] = [...MOCK_PRODUCTS];
  private static categories: Category[] = [...CATEGORIES];

  /**
   * Scalable product listing with dynamic category-aware filtering, pagination, and sorting
   */
  static async getProducts(filters: FilterState = {}): Promise<PaginatedProductsResponse> {
    let result = [...this.products];

    // 1. Category filter
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    // 2. Subcategory filter
    if (filters.subcategory) {
      result = result.filter((p) => p.subcategory.toLowerCase() === filters.subcategory?.toLowerCase());
    }

    // 3. Search query filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    // 4. Price range filter
    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= (filters.minPrice ?? 0));
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= (filters.maxPrice ?? Infinity));
    }

    // 5. Brand filter
    if (filters.brands && filters.brands.length > 0) {
      result = result.filter((p) => filters.brands?.includes(p.brand));
    }

    // 6. Dynamic category attribute filters (e.g. resolution, material, movement)
    if (filters.attributes) {
      Object.entries(filters.attributes).forEach(([attrKey, attrValues]) => {
        if (attrValues && attrValues.length > 0) {
          result = result.filter((p) => {
            const productVal = String(p.attributes[attrKey] || "");
            return attrValues.some((v) => productVal.toLowerCase().includes(v.toLowerCase()));
          });
        }
      });
    }

    // 7. Weather affinity filter
    if (filters.weather) {
      result = result.filter((p) => p.weatherAffinity.includes(filters.weather as WeatherCondition));
    }

    // 8. Availability filter
    if (filters.availability && filters.availability.length > 0) {
      result = result.filter((p) => filters.availability?.includes(p.availability));
    }

    // 9. Sorting
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    // Facet calculations for dynamic filters
    const total = result.length;
    const page = Math.max(1, filters.page || 1);
    const limit = Math.max(1, filters.limit || 12);
    const totalPages = Math.ceil(total / limit);

    // Calculate Brand facets
    const brandCounts: Record<string, number> = {};
    const subcategoryCounts: Record<string, number> = {};
    let minObservedPrice = Infinity;
    let maxObservedPrice = 0;

    result.forEach((p) => {
      brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
      subcategoryCounts[p.subcategory] = (subcategoryCounts[p.subcategory] || 0) + 1;
      if (p.price < minObservedPrice) minObservedPrice = p.price;
      if (p.price > maxObservedPrice) maxObservedPrice = p.price;
    });

    const paginatedItems = result.slice((page - 1) * limit, page * limit);

    return {
      products: paginatedItems,
      total,
      page,
      limit,
      totalPages,
      facets: {
        brands: Object.entries(brandCounts).map(([name, count]) => ({ name, count })),
        subcategories: Object.entries(subcategoryCounts).map(([name, count]) => ({ name, count })),
        priceRange: {
          min: minObservedPrice === Infinity ? 0 : minObservedPrice,
          max: maxObservedPrice || 100000,
        },
        dynamicAttributes: {},
      },
    };
  }

  static async getProductBySlug(slug: string): Promise<Product | null> {
    const found = this.products.find((p) => p.slug === slug);
    return found ? { ...found } : null;
  }

  static async getProductById(id: string): Promise<Product | null> {
    const found = this.products.find((p) => p.id === id);
    return found ? { ...found } : null;
  }

  static async getCategories(): Promise<Category[]> {
    return [...this.categories];
  }

  static async getCategoryBySlug(slug: string): Promise<Category | null> {
    const found = this.categories.find((c) => c.slug === slug);
    return found ? { ...found } : null;
  }

  static async getFeaturedProducts(limit = 6): Promise<Product[]> {
    return this.products.filter((p) => p.featured).slice(0, limit);
  }

  static async getTrendingProducts(limit = 6): Promise<Product[]> {
    return this.products.filter((p) => p.trending).slice(0, limit);
  }

  static async getWeatherAdaptiveProducts(weather: WeatherCondition, limit = 4): Promise<Product[]> {
    const matched = this.products.filter((p) => p.weatherAffinity.includes(weather));
    return (matched.length > 0 ? matched : this.products).slice(0, limit);
  }

  static async getDealsProducts(limit = 4): Promise<Product[]> {
    return this.products.filter((p) => (p.discount ?? 0) > 0).slice(0, limit);
  }
}
