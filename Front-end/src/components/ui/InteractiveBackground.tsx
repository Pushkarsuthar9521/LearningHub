import React, { useEffect, useRef } from 'react'

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = window.innerWidth
    let height = window.innerHeight

    // Helper function for rotation
    const rotate = (velocity: { x: number; y: number }, angle: number) => {
      return {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
      }
    }

    // Helper function for collision resolution
    const resolveCollision = (particle: Particle, otherParticle: Particle) => {
      const xVelocityDiff = particle.dx - otherParticle.dx
      const yVelocityDiff = particle.dy - otherParticle.dy

      const xDist = otherParticle.x - particle.x
      const yDist = otherParticle.y - particle.y

      // Prevent accidental overlap of particles
      if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        // Grab angle between the two colliding particles
        const angle = -Math.atan2(
          otherParticle.y - particle.y,
          otherParticle.x - particle.x
        )

        // Store mass in var for better readability, collision equation
        const m1 = particle.size
        const m2 = otherParticle.size

        // Velocity before equation
        const u1 = rotate({ x: particle.dx, y: particle.dy }, angle)
        const u2 = rotate({ x: otherParticle.dx, y: otherParticle.dy }, angle)

        // Velocity after 1d collision equation
        const v1 = {
          x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
          y: u1.y
        }
        const v2 = {
          x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m1) / (m1 + m2),
          y: u2.y
        }

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle)
        const vFinal2 = rotate(v2, -angle)

        // Swap particle velocities for realistic bounce effect
        particle.dx = vFinal1.x
        particle.dy = vFinal1.y

        otherParticle.dx = vFinal2.x
        otherParticle.dy = vFinal2.y
      }
    }

    const resize = () => {
      // Handle High-DPI displays for sharpness
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight

      // Set actual size in memory (scaled to account for extra pixel density)
      canvas.width = width * dpr
      canvas.height = height * dpr

      // Set visible size (CSS pixels)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      // Normalize coordinate system to use css pixels
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('resize', resize)
    resize()

    // Mouse state
    const mouse = {
      x: undefined as number | undefined,
      y: undefined as number | undefined,
      radius: 150 // Interaction radius
    }

    window.addEventListener('mousemove', e => {
      mouse.x = e.x
      mouse.y = e.y
    })

    // Colors matching the theme
    const colors = [
      '#2dd4bf', // teal-400
      '#60a5fa', // blue-400
      '#22d3ee', // cyan-400
      '#7dd3fc', // sky-300
      '#a5b4fc' // indigo-300
    ]

    class Particle {
      x: number
      y: number
      dx: number
      dy: number
      size: number
      minSize: number
      color: string

      constructor(x: number, y: number, size: number, color: string) {
        this.x = x
        this.y = y
        this.size = size
        this.minSize = size
        this.dx = (Math.random() - 0.5) * 1 // Speed X
        this.dy = (Math.random() - 0.5) * 1 // Speed Y
        this.color = color
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
      }

      update(particles: Particle[]) {
        // Boundary check
        if (this.x + this.size > width || this.x - this.size < 0) {
          this.dx = -this.dx
        }
        if (this.y + this.size > height || this.y - this.size < 0) {
          this.dy = -this.dy
        }

        // Move
        this.x += this.dx
        this.y += this.dy

        // Mouse interaction
        if (mouse.x !== undefined && mouse.y !== undefined) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx)
            const force = (mouse.radius - distance) / mouse.radius
            const forceX = Math.cos(angle) * force * 5 // Push strength
            const forceY = Math.sin(angle) * force * 5

            this.x -= forceX
            this.y -= forceY
          }
        }

        // Collision detection
        for (let i = 0; i < particles.length; i++) {
          if (this === particles[i]) continue

          const dist = Math.sqrt(
            Math.pow(this.x - particles[i].x, 2) +
              Math.pow(this.y - particles[i].y, 2)
          )

          if (dist - this.size - particles[i].size < 0) {
            resolveCollision(this, particles[i])
          }
        }

        this.draw()
      }
    }

    const particles: Particle[] = []
    const init = () => {
      particles.length = 0
      for (let i = 0; i < 50; i++) {
        const size = Math.random() * 6 + 3
        const color = colors[Math.floor(Math.random() * colors.length)]
        let x = Math.random() * (width - size * 2) + size
        let y = Math.random() * (height - size * 2) + size

        // Simple overlap check to avoid stuck particles on init
        if (i !== 0) {
          for (let j = 0; j < particles.length; j++) {
            const dist = Math.sqrt(
              Math.pow(x - particles[j].x, 2) + Math.pow(y - particles[j].y, 2)
            )
            if (dist - size - particles[j].size < 0) {
              x = Math.random() * (width - size * 2) + size
              y = Math.random() * (height - size * 2) + size
              j = -1
            }
          }
        }
        particles.push(new Particle(x, y, size, color))
      }
    }

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, width, height)
      particles.forEach(particle => particle.update(particles))
    }

    init()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

export default InteractiveBackground
