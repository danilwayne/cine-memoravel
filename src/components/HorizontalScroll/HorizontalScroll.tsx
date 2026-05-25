import type { ReactNode } from 'react'
import './HorizontalScroll.css'

interface HorizontalScrollProps {
  children: ReactNode
  className?: string
}

export function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  return (
    <div className={`horizontal-scroll ${className}`.trim()}>
      <div className="horizontal-scroll__track">{children}</div>
    </div>
  )
}
