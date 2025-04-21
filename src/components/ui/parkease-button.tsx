
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ParkEaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

const ParkEaseButton = forwardRef<HTMLButtonElement, ParkEaseButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "font-medium rounded-md transition-colors",
          {
            "bg-parkblue hover:bg-parkblue-dark text-white": variant === "primary",
            "bg-white hover:bg-parkgray-light text-parkblue border border-parkblue": variant === "secondary",
            "bg-transparent hover:bg-parkgray-light text-parkblue border border-gray-200": variant === "outline",
            "py-1 px-3 text-sm": size === "sm",
            "py-2 px-4": size === "md",
            "py-3 px-6 text-lg": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

ParkEaseButton.displayName = "ParkEaseButton";

export { ParkEaseButton };
