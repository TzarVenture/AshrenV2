import { Product } from "@/services/products/types";

export class WhatsAppService {
  private static defaultConciergeNumber = "919876543210"; // Client WhatsApp Business Number

  static generateProductOrderUrl(
    product: Product,
    selectedVariant?: string,
    currencySymbol = "₹",
    phone = this.defaultConciergeNumber
  ): string {
    const priceFormatted = `${currencySymbol}${product.price.toLocaleString("en-IN")}`;
    const variantText = selectedVariant ? `\n• Selected Variant: ${selectedVariant}` : "";

    const message = encodeURIComponent(
      `Hello Ashren Haute Concierge,\n\nI would like to inquire about acquiring the following piece:\n• Instrument / Item: ${product.name}\n• Category: ${product.category.toUpperCase()} (${product.subcategory})\n• Price: ${priceFormatted}${variantText}\n\nPlease confirm priority allocation and white-glove dispatch.`
    );

    return `https://wa.me/${phone}?text=${message}`;
  }

  static generateCartOrderUrl(
    items: { product: Product; quantity: number; variant?: string }[],
    totalAmountFormatted: string,
    phone = this.defaultConciergeNumber
  ): string {
    let orderLines = "";
    items.forEach((item, idx) => {
      const vText = item.variant ? ` [${item.variant}]` : "";
      orderLines += `${idx + 1}. ${item.product.name}${vText} x ${item.quantity}\n`;
    });

    const message = encodeURIComponent(
      `Hello Ashren Haute Concierge,\n\nI would like to place an order for the following curated collection:\n\n${orderLines}\nTotal Valuation: ${totalAmountFormatted}\n\nPlease share dispatch timeline and concierge invoice.`
    );

    return `https://wa.me/${phone}?text=${message}`;
  }
}
