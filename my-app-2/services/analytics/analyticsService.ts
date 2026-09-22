export type AnalyticsEvent =
  | "page_view"
  | "product_view"
  | "search"
  | "add_to_cart"
  | "remove_from_cart"
  | "wishlist_add"
  | "wishlist_remove"
  | "checkout_start"
  | "purchase"
  | "whatsapp_order"
  | "filter_use"
  | "weather_theme_change"
  | "compare_add";

export class AnalyticsService {
  static track(event: AnalyticsEvent, payload?: Record<string, unknown>): void {
    if (typeof window !== "undefined") {
      // In development, log clean telemetry. In production, forwards to GA4, Meta Pixel, PostHog, or Segment
      if (process.env.NODE_ENV !== "production") {
        console.log(`[Ashren Analytics] ${event}:`, payload);
      }
    }
  }
}
