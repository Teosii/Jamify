// Utility to format a price value (number or string) as USD currency
export default function formatPrice(value) {
  if (value === null || value === undefined || value === "") return "";

  // If it's already a number, use it. If string, strip non-numeric chars and parse.
  let num;
  if (typeof value === "number") {
    num = value;
  } else {
    // Remove anything that's not a digit, dot, minus sign
    const cleaned = String(value).replace(/[^0-9.-]+/g, "");
    num = parseFloat(cleaned);
  }

  if (Number.isNaN(num)) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(num);
}
