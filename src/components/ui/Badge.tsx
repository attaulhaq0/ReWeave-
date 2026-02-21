import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning';
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
  
  const variants = {
    default: "border-transparent bg-brand-primary text-white hover:bg-brand-primary/80",
    secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "text-gray-950",
    success: "border-transparent bg-brand-accent text-white hover:bg-brand-accent/80",
    warning: "border-transparent bg-brand-warning text-white hover:bg-brand-warning/80",
  }

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className || ""}`} {...props} />
  )
}

export { Badge }
