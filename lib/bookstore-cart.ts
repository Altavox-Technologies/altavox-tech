'use client'

export type BookCartItem = {
  productId: string
  slug: string
  title: string
  author: string
  format: 'ebook' | 'print'
  quantity: number
  unitPrice: number
  coverImageUrl: string | null
}

const CART_KEY = 'altavox-bookstore-cart'
const CART_EVENT = 'altavox:cart-updated'

export function readBookCart(): BookCartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item): item is BookCartItem =>
      item && typeof item === 'object' &&
      typeof item.productId === 'string' &&
      typeof item.slug === 'string' &&
      typeof item.title === 'string' &&
      (item.format === 'ebook' || item.format === 'print') &&
      Number.isInteger(item.quantity) && item.quantity > 0 &&
      Number.isFinite(item.unitPrice) && item.unitPrice >= 0
    )
  } catch {
    return []
  }
}

export function writeBookCart(items: BookCartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(CART_EVENT))
}

export function addBookToCart(item: BookCartItem) {
  const items = readBookCart()
  const existing = items.find((entry) => entry.productId === item.productId && entry.format === item.format)
  if (existing) existing.quantity = Math.min(10, existing.quantity + item.quantity)
  else items.push({ ...item, quantity: Math.min(10, item.quantity) })
  writeBookCart(items)
}

export function cartUpdatedEventName() {
  return CART_EVENT
}
