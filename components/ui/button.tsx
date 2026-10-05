import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/70 border border-border",
      outline:
        "border border-border bg-transparent hover:bg-secondary text-foreground",
      ghost:
        "hover:bg-secondary text-muted-foreground hover:text-foreground",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 text-xs rounded-sm",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10 p-2 items-center justify-center",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
