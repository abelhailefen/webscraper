import type React from "react"
import styles from "@/styles/ui/separator.module.css"

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

export function Separator({ orientation = "horizontal", className = "", ...props }: SeparatorProps) {
  return <div className={`${styles.separator} ${styles[orientation]} ${className}`} role="separator" {...props} />
}

