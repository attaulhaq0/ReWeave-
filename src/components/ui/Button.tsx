import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'danger';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-brand-primary text-white shadow hover:bg-brand-primary/90",
      outline: "border border-gray-200 bg-white shadow-sm hover:bg-gray-100 hover:text-gray-900",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      secondary: "bg-brand-accent text-white shadow-sm hover:bg-brand-accent/80",
      danger: "bg-brand-danger text-white shadow-sm hover:bg-brand-danger/90",
    }
    
    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
