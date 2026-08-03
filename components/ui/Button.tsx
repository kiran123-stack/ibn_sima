import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", icon, className = "", ...props }, ref) => {
    // h=56px, px=32px, rounded=18px, hover=lift 4px + shadow + color, duration=0.35s
    const baseStyles =
      "inline-flex items-center justify-center h-[56px] px-[32px] rounded-[18px] gap-[12px] font-medium transition-all duration-[350ms] ease-out group";
    
    const variants = {
      primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] hover:-translate-y-1 hover:shadow-lg",
      secondary: "bg-white text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[var(--color-neutral-light)] hover:-translate-y-1 hover:shadow-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
        {icon && <span className="flex-shrink-0 transition-transform duration-[350ms] group-hover:translate-x-1">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

// Re-usable arrow icon for buttons (clean inline SVG, NO EMOJI)
export const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);
