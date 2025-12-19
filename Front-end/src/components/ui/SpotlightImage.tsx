import { useRef, useState, type MouseEvent } from 'react'

interface SpotlightImageProps {
  src: string
  alt: string
  className?: string
}

export const SpotlightImage = ({
  src,
  alt,
  className = ''
}: SpotlightImageProps) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-1 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(1200px circle at ${position.x}px ${position.y}px, rgba(45, 212, 191, 0.6), transparent 40%)`,
          filter: 'blur(20px)',
          zIndex: -1
        }}
      />
      <img
        src={src}
        alt={alt}
        className="relative z-10 w-full h-auto rounded-3xl shadow-2xl"
      />
    </div>
  )
}
