import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2 border-foreground transform translate-x-[-2px] translate-y-[-2px]",
  {
    variants: {
      variant: {
        default:
          "bg-background text-foreground hover:bg-muted shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:translate-x-0 hover:translate-y-0 active:shadow-[0px_0px_0px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:translate-x-0 hover:translate-y-0 active:shadow-[0px_0px_0px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px]",
        outline:
          "bg-background text-foreground hover:bg-accent hover:text-accent-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:translate-x-0 hover:translate-y-0 active:shadow-[0px_0px_0px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:translate-x-0 hover:translate-y-0 active:shadow-[0px_0px_0px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px]",
        success:
          "bg-green-500 text-white hover:bg-green-600 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:translate-x-0 hover:translate-y-0 active:shadow-[0px_0px_0px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px]",
        ghost: "bg-transparent border-transparent shadow-none translate-x-0 translate-y-0 hover:bg-accent hover:text-accent-foreground hover:border-foreground hover:shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:translate-x-[-1px] hover:translate-y-[-1px]",
        link: "bg-transparent border-transparent shadow-none translate-x-0 translate-y-0 text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
