import { FC, useState, type MouseEvent } from 'react'

export const SpotlightText: FC<{ text: string }> = ({ text }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <span className="text-slate-900">{text}</span>
      <span
        className="absolute inset-0 bg-gradient-to-r from-teal-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          maskImage: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`
        }}
      >
        {text}
      </span>
    </span>
  )
}
