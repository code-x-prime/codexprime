import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Lightweight SVG shimmer placeholder for next/image blurDataURL
export const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#f6f7f8" offset="20%" />
        <stop stop-color="#edeef1" offset="50%" />
        <stop stop-color="#f6f7f8" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#f6f7f8" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

// Replace clearly invalid or known-bad image URLs with a local fallback to avoid 404s from the Next image optimizer
export function safeImageUrl(src?: string | null, fallback: string = '/og-image.png'): string {
  if (!src || typeof src !== 'string') return fallback;
  try {
    // Allow root-relative assets as-is
    if (src.startsWith('/')) return src;

    const u = new URL(src);
    // Heuristic: avoid paths that contain '/localhost/' which are known to 404 from the API storage
    if (u.pathname.includes('/localhost/')) return fallback;
    // Basic extension/format check (optional, lenient)
    if (!/[.](png|jpe?g|gif|webp|avif|svg)(\?.*)?$/i.test(u.pathname)) {
      return fallback;
    }
    return src;
  } catch {
    return fallback;
  }
}

