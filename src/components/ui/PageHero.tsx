import { type ReactNode } from "react";

interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
  accentColor?: string;
  gradient?: string;
  children?: ReactNode;
}

export function PageHero({
  label,
  title,
  description,
  accentColor = "#C58A6A",
  gradient = "linear-gradient(125deg, #E8EFF5 0%, #F0F5F0 44%, #F7F5F0 100%)",
  children,
}: PageHeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-[#DCE3E8]" style={{ background: gradient }}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #567C99 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div
        aria-hidden
        className="absolute -top-36 -end-24 h-[26rem] w-[26rem] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, #567C9940 0%, transparent 72%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-20 -start-16 h-72 w-72 rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, #7F9B8840 0%, transparent 70%)" }}
      />

      <div className="section-container relative py-12 md:py-16">
        {label && (
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.12em]"
            style={{ color: accentColor }}
          >
            {label}
          </p>
        )}

        <div className="mb-5 flex items-center gap-3">
          <div className="h-1 w-12 rounded-full" style={{ backgroundColor: accentColor }} />
          <div className="h-1 w-4 rounded-full opacity-45" style={{ backgroundColor: accentColor }} />
        </div>

        <h1 className="font-serif mb-4 max-w-2xl text-3xl font-semibold leading-[1.12] tracking-tight text-[#1F2A33] sm:text-4xl md:text-5xl">
          {title}
        </h1>

        {description && (
          <p className="max-w-xl text-base leading-relaxed text-[#4A5A66] sm:text-lg">
            {description}
          </p>
        )}

        {children && <div className="mt-7">{children}</div>}
      </div>
    </div>
  );
}
