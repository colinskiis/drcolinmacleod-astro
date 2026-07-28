/**
 * The site's button system, in one place.
 *
 * Two independent axes:
 *
 *   variant — semantic emphasis. `primary` is the page's main action and looks
 *     the same everywhere, because that repetition is what makes it
 *     recognisable. `secondary` is any lesser action.
 *
 *   surface — physical. A solid button cannot use one fill on both dark and
 *     light sections, so the palette inverts. The visual weight does not.
 *
 * Consumed by `BookingButton` (which adds the JaneApp link and GA tracking) and
 * by `ActionButton` (everything else). Booking and non-booking controls must
 * share the look without sharing the tracking attribute — a "Get Directions"
 * click that fired `booking_click` would quietly corrupt the conversion data.
 *
 * CONTRAST — every boundary below clears the 3:1 that WCAG 1.4.11 requires for
 * a control's edge. Two dark surfaces are in use and they are not equivalent:
 *
 *                              emerald-950 #022c22   hero gradient #065640
 *   primary   mint fill              7.88:1                4.53:1
 *   secondary white/55 border        5.51:1                3.81:1
 *
 * `secondary` was originally specified at white/40, validated against
 * emerald-950 alone at 3.57:1. On the lighter hero gradient that is 2.74:1 and
 * fails. white/55 is the first step that clears 3:1 on both, so any new dark
 * surface must be checked against the *lightest* one, not the darkest.
 */

export type Variant = 'primary' | 'secondary';
export type Surface = 'dark' | 'light';
export type Size = 'sm' | 'md' | 'lg';

const FILLS: Record<Variant, Record<Surface, string>> = {
  primary: {
    dark: 'bg-emerald-400 text-emerald-950 hover:bg-emerald-300 shadow-lg shadow-black/15',
    light: 'bg-emerald-900 text-white hover:bg-emerald-800 shadow-lg shadow-emerald-900/20',
  },
  secondary: {
    dark: 'bg-white/10 text-white border border-white/55 backdrop-blur-sm hover:bg-white/20 hover:border-white/75',
    light: 'bg-white text-emerald-900 border border-emerald-700 hover:bg-emerald-50 hover:border-emerald-900',
  },
};

// The focus ring offset must match the surface, or the ring reads as a halo of
// the wrong colour.
const RINGS: Record<Surface, string> = {
  dark: 'focus-visible:ring-emerald-300 focus-visible:ring-offset-emerald-950',
  light: 'focus-visible:ring-emerald-600 focus-visible:ring-offset-white',
};

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

const BASE = [
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold',
  'transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
].join(' ');

export function buttonClasses(opts: {
  variant?: Variant;
  surface?: Surface;
  size?: Size;
  fullWidth?: boolean;
  extra?: string;
} = {}): string {
  const { variant = 'primary', surface = 'dark', size = 'md', fullWidth = false, extra } = opts;
  return [
    BASE,
    FILLS[variant][surface],
    SIZES[size],
    RINGS[surface],
    fullWidth ? 'w-full' : '',
    extra ?? '',
  ].filter(Boolean).join(' ');
}

/**
 * Border colours for controls that are not pill buttons but still need a
 * visible edge — the contact action grid, the article topic filters. Both of
 * these previously used emerald-100/200, which is 1.05–1.28:1 on white.
 */
export const EDGE_ON_LIGHT = 'border-emerald-700'; // 4.83:1 on white
