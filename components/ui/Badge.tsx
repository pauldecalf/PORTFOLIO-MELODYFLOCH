interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'outline'
  className?: string
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-900 text-white hover:bg-gray-900/80',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-100/80',
    destructive: 'bg-red-600 text-white hover:bg-red-600/80',
    success: 'bg-green-600 text-white hover:bg-green-600/80',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-500/80',
    outline: 'text-gray-900 border border-gray-300',
  }

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  )
}


