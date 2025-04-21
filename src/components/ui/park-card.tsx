
import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface ParkCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

const ParkCard = forwardRef<HTMLDivElement, ParkCardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        className={cn(
          "bg-white rounded-lg p-4",
          {
            "shadow-sm border border-gray-200": variant === "default",
            "border border-gray-200": variant === "outline",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

ParkCard.displayName = "ParkCard";

export { ParkCard };
