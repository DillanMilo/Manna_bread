export function formatDisplayPrice(price: string) {
  return price.replace(/\+/g, '').trim();
}
