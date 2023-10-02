"use client"

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

interface ProgressProps {
  variant?: "default" | "destructive" | "pending" | "success" | "inprogress";
  value?: number;
  className?: string;
}

const progressVariants = cva(
  "h-full w-full flex-1 transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        pending: "bg-orange-500 hover:bg-orange-500/90",
        inprogress: "bg-teal-500 hover:bg-teal-500/90",
        success: "bg-green-500 hover:bg-green-500/90"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>((props, ref) => {
  const { className, value, variant = "default", ...restProps } = props;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...restProps}
    >
      <ProgressPrimitive.Indicator
        className={cn(progressVariants({ variant, className }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)`, transition: "transform 0.5s ease-in-out" }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
