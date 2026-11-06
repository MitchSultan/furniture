/**
 * Format currency using Intl.NumberFormat.
 * Supports KES and USD.
 *
 * @param {number} amount
 * @param {"KES"|"USD"} [currency="KES"]
 * @returns {string}
 */
export function formatPrice(amount, currency = "KES") {
  if (typeof amount !== "number" || isNaN(amount)) return "";

  if (currency === "KES") {
    // KES 145,000
    const formatted = new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(amount);
    // Ensure clean KES spacing
    return formatted.replace("Ksh", "KES").replace("KES", "KES ");
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date string into human-readable format.
 * @param {string} dateString - e.g. "2025-10-12"
 * @returns {string} - e.g. "October 12, 2025"
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
