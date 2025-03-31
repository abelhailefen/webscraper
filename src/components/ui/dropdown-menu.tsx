"use client"

import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import styles from "@/styles/ui/dropdown-menu.module.css"

type DropdownMenuContextType = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DropdownMenuContext = createContext<DropdownMenuContextType | undefined>(undefined)

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className={styles.dropdownMenu}>{children}</div>
    </DropdownMenuContext.Provider>
  )
}

interface DropdownMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  children: React.ReactNode
}

export const DropdownMenuTrigger = React.forwardRef<HTMLDivElement, DropdownMenuTriggerProps>(
  ({ asChild = false, children, className = "", ...props }, ref) => {
    const context = useContext(DropdownMenuContext)
    if (!context) throw new Error("DropdownMenuTrigger must be used within a DropdownMenu")

    const { open, setOpen } = context

    return (
      <div
        ref={ref}
        className={`${styles.dropdownMenuTrigger} ${className}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        {...props}
      >
        {children}
      </div>
    )
  },
)
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  children: React.ReactNode
}

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ align = "center", children, className = "", ...props }, ref) => {
    const context = useContext(DropdownMenuContext)
    if (!context) throw new Error("DropdownMenuContent must be used within a DropdownMenu")

    const { open, setOpen } = context
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
          setOpen(false)
        }
      }

      if (open) {
        document.addEventListener("mousedown", handleClickOutside)
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [open, setOpen])

    if (!open) return null

    return (
      <div
        ref={(node) => {
          if (typeof ref === "function") ref(node)
          else if (ref) ref.current = node
          contentRef.current = node
        }}
        className={`${styles.dropdownMenuContent} ${styles[`align-${align}`]} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  },
)
DropdownMenuContent.displayName = "DropdownMenuContent"

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ children, className = "", ...props }, ref) => {
    const context = useContext(DropdownMenuContext)
    if (!context) throw new Error("DropdownMenuItem must be used within a DropdownMenu")

    const { setOpen } = context

    return (
      <div ref={ref} className={`${styles.dropdownMenuItem} ${className}`} onClick={() => setOpen(false)} {...props}>
        {children}
      </div>
    )
  },
)
DropdownMenuItem.displayName = "DropdownMenuItem"

