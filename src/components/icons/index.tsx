/**
 * Shared SVG Icon Components
 *
 * Usage convention:
 *   ChevronLeft / ChevronRight  →  intra-component navigation (carousels, galleries)
 *   ArrowLeft   / ArrowRight    →  page-level navigation (back buttons) and CTAs (read more)
 */

interface IconProps {
    /** Tailwind class(es) for size and colour. Defaults to w-5 h-5. */
    className?: string;
}

// ── Chevrons (no shaft — for tight, contained controls) ──────────────────────

export const ChevronLeft = ({ className = 'w-5 h-5' }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

export const ChevronRight = ({ className = 'w-5 h-5' }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

// ── Arrows (with shaft — for navigation and directional CTAs) ────────────────

export const ArrowLeft = ({ className = 'w-5 h-5' }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

export const ArrowRight = ({ className = 'w-5 h-5' }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);
