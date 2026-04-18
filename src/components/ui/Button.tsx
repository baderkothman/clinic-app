"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-b from-[#567C99] to-[#3D5E78] text-white hover:from-[#476E89] hover:to-[#2F4C61] active:from-[#3D5E78] active:to-[#2F4C61] shadow-md",
  secondary:
    "bg-gradient-to-b from-[#7F9B88] to-[#6A8671] text-white hover:from-[#708A79] hover:to-[#5B7565] active:from-[#6A8671] active:to-[#5B7565] shadow-md",
  outline:
    "bg-white text-[#567C99] border border-[#567C99] hover:bg-[#567C99]/5 active:bg-[#567C99]/10 shadow-sm",
  ghost:
    "text-[#4A5A66] hover:bg-[#567C99]/8 active:bg-[#567C99]/12",
  danger:
    "bg-gradient-to-b from-[#B34A4A] to-[#933A3A] text-white hover:from-[#A24343] hover:to-[#7F3232] active:from-[#933A3A] active:to-[#7F3232] shadow-md",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.75 text-sm rounded-md gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-lg gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-150 hover:-translate-y-0.5",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#567C99]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "min-h-[44px] min-w-[44px]",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
