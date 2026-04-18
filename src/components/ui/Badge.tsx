import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "muted";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-[#567C99]/12 text-[#567C99] ring-1 ring-[#567C99]/22",
  success: "bg-[#3C7A57]/12 text-[#3C7A57] ring-1 ring-[#3C7A57]/22",
  warning: "bg-[#A06A2C]/12 text-[#A06A2C] ring-1 ring-[#A06A2C]/22",
  error: "bg-[#B34A4A]/12 text-[#B34A4A] ring-1 ring-[#B34A4A]/22",
  info: "bg-[#7F9B88]/12 text-[#7F9B88] ring-1 ring-[#7F9B88]/22",
  muted: "bg-[#E7ECEF] text-[#4A5A66] ring-1 ring-[#D6DEE3]",
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
