import { Product, WeatherCondition } from "@/services/products/types";
import { MOCK_PRODUCTS } from "@/data/products.mock";

export class RecommendationService {
  static async getRecommendations(options: {
    type: "weather" | "similar" | "frequently-bought" | "trending" | "recently-viewed";
    productId?: string;
    weather?: WeatherCondition;
    category?: string;
    limit?: number;
  }): Promise<Product[]> {
    const limit = options.limit || 4;

    switch (options.type) {
      case "similar":
        if (options.productId) {
          const current = MOCK_PRODUCTS.find((p) => p.id === options.productId);
          if (current) {
            return MOCK_PRODUCTS.filter(
              (p) => p.id !== current.id && (p.category === current.category || p.subcategory === current.subcategory)
            ).slice(0, limit);
          }
        }
        return MOCK_PRODUCTS.slice(0, limit);

      case "frequently-bought":
        // Pair tech with optical lenses / protective trunks
        if (options.productId) {
          const current = MOCK_PRODUCTS.find((p) => p.id === options.productId);
          if (current?.category === "electronics") {
            return MOCK_PRODUCTS.filter(
              (p) => p.id !== current.id && (p.subcategory === "Cinema Optics" || p.subcategory === "Travel Trunks")
            ).slice(0, 2);
          }
        }
        return MOCK_PRODUCTS.filter((p) => p.category === "electronics" || p.category === "lifestyle").slice(0, 2);

      case "weather":
        if (options.weather) {
          const matched = MOCK_PRODUCTS.filter((p) => p.weatherAffinity.includes(options.weather!));
          return (matched.length > 0 ? matched : MOCK_PRODUCTS).slice(0, limit);
        }
        return MOCK_PRODUCTS.slice(0, limit);

      case "trending":
      default:
        return MOCK_PRODUCTS.filter((p) => p.trending).slice(0, limit);
    }
  }
}
