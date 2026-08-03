import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", hoverEffect = true, ...props }, ref) => {
    // Base styles from Design.md: Padding 32px, Radius 28px, Soft shadow 0 20px 60px rgba(0,0,0,.06)
    const baseStyles = "p-[32px] rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)]";
    
    // Hover: Translate Y -8px, Scale 1.02, Shadow increases 0 28px 80px rgba(0,0,0,.09), Duration 0.45s
    const hoverStyles = hoverEffect 
      ? "transition-all duration-[450ms] ease-out hover:-translate-y-[8px] hover:scale-[1.02] hover:shadow-[0_28px_80px_rgba(0,0,0,0.09)]" 
      : "";

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
