/**
 * Generates srcSet/sizes for images hosted on providers that support
 * URL-based width transforms (Unsplash, Supabase Storage render endpoint).
 * Falls back to a single src when the URL is not transformable.
 */

type Provider = 'unsplash' | 'supabase' | 'none';

const DEFAULT_WIDTHS = [320, 480, 640, 800, 1200, 1600];

function detectProvider(url: string): Provider {
  if (!url) return 'none';
  if (/images\.unsplash\.com/.test(url)) return 'unsplash';
  if (/\/storage\/v1\/(render\/image|object)\//.test(url)) return 'supabase';
  return 'none';
}

function buildUrl(url: string, width: number, provider: Provider): string {
  try {
    const u = new URL(url);
    if (provider === 'unsplash') {
      u.searchParams.set('w', String(width));
      u.searchParams.set('q', u.searchParams.get('q') || '75');
      u.searchParams.set('auto', u.searchParams.get('auto') || 'format');
      return u.toString();
    }
    if (provider === 'supabase') {
      // Convert object endpoint to render endpoint for transforms
      u.pathname = u.pathname.replace('/storage/v1/object/', '/storage/v1/render/image/');
      u.searchParams.set('width', String(width));
      u.searchParams.set('resize', 'contain');
      u.searchParams.set('quality', u.searchParams.get('quality') || '75');
      return u.toString();
    }
  } catch {
    return url;
  }
  return url;
}

export interface ResponsiveImageAttrs {
  src: string;
  srcSet?: string;
  sizes?: string;
}

/**
 * @param url Original image URL
 * @param sizes Tailwind-style sizes attr, e.g. "(max-width: 640px) 100vw, 33vw"
 * @param widths Optional list of widths to generate
 */
export function getResponsiveImage(
  url: string | null | undefined,
  sizes: string,
  widths: number[] = DEFAULT_WIDTHS
): ResponsiveImageAttrs {
  if (!url) return { src: '' };
  const provider = detectProvider(url);
  if (provider === 'none') return { src: url };

  const srcSet = widths
    .map((w) => `${buildUrl(url, w, provider)} ${w}w`)
    .join(', ');
  const src = buildUrl(url, widths[Math.floor(widths.length / 2)], provider);

  return { src, srcSet, sizes };
}
