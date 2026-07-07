import { Link } from "@tanstack/react-router";

/**
 * DivyaGram wordmark + mark. Pure SVG so it inherits theme colors and
 * scales crisply without shipping an image asset.
 */
export function LogoMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="dg-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.85 0.16 82)" />
          <stop offset="100%" stopColor="oklch(0.62 0.18 55)" />
        </linearGradient>
      </defs>
      {/* Temple bell + lotus abstraction */}
      <path
        d="M16 3 L21 9 Q24 12 24 17 Q24 22 16 26 Q8 22 8 17 Q8 12 11 9 Z"
        fill="none"
        stroke="url(#dg-gold)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="28" r="1.4" fill="url(#dg-gold)" />
      <path d="M12 17 Q16 13 20 17" fill="none" stroke="url(#dg-gold)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/home"
      className={`inline-flex items-center gap-2 font-display font-semibold tracking-tight text-foreground ${className}`}
    >
      <LogoMark className="size-6" />
      <span className="text-[1.35rem] leading-none">
        Divya<span className="text-gold">Gram</span>
      </span>
    </Link>
  );
}
