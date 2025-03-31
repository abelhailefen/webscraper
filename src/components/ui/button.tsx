import React from "react"
import styles from "@/styles/ui/button.module.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
  children: React.ReactNode
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className = "", asChild = false, children, ...props }, ref) => {
    const classNames = [styles.button, styles[`variant-${variant}`], styles[`size-${size}`], className]
      .filter(Boolean)
      .join(" ")

    return (
      <button className={classNames} ref={ref} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

