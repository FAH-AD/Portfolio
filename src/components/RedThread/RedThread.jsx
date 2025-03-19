"use client"

import { useEffect, useRef, useState } from "react"

const ScrollableLine = ({ componentRefs }) => {
  const svgRef = useRef(null)
  const pathRef = useRef(null)
  const [path, setPath] = useState("")
  const [pathLength, setPathLength] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Calculate the path connecting all components
  useEffect(() => {
    const calculatePath = () => {
      // Filter out any undefined refs
      const validRefs = componentRefs.filter((ref) => ref.current)

      if (validRefs.length === 0) return

      let pathData = ""
      const offset = 100 // Horizontal offset for zigzag

      validRefs.forEach((ref, index) => {
        const element = ref.current
        if (!element) return

        const rect = element.getBoundingClientRect()
        const scrollY = window.scrollY

        // Calculate the center x of the component
        const centerX = rect.left + rect.width / 2

        // Calculate the top y of the component (adjusted for scroll)
        const topY = rect.top + scrollY

        // For the first point, we just move to it
        if (index === 0) {
          pathData = `M${centerX},${topY}`
        } else {
          // For subsequent points, we create a zigzag pattern
          const prevRef = validRefs[index - 1]
          const prevElement = prevRef.current
          const prevRect = prevElement.getBoundingClientRect()
          const prevCenterX = prevRect.left + prevRect.width / 2
          const prevBottomY = prevRect.bottom + scrollY

          // Calculate the zigzag points
          const midY = (prevBottomY + topY) / 2

          // Create zigzag pattern
          // First go horizontally to the side
          if (index % 2 === 1) {
            pathData += ` L${prevCenterX + offset},${prevBottomY}`
            // Then go to the middle point
            pathData += ` L${centerX + offset},${midY}`
            // Then go to the component
            pathData += ` L${centerX},${topY}`
          } else {
            pathData += ` L${prevCenterX - offset},${prevBottomY}`
            pathData += ` L${centerX - offset},${midY}`
            pathData += ` L${centerX},${topY}`
          }
        }

        // Add a vertical line through the component
        pathData += ` L${centerX},${topY + rect.height}`
      })

      setPath(pathData)

      // Calculate the total length of the path for animation
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength()
        setPathLength(length)

        // Set initial styles for the path
        pathRef.current.style.strokeDasharray = `${length}`
        pathRef.current.style.strokeDashoffset = `${length}`
      }
    }

    // Calculate initial path after a short delay to ensure components are rendered
    const timer = setTimeout(calculatePath, 500)

    // Recalculate on resize
    window.addEventListener("resize", calculatePath)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", calculatePath)
    }
  }, [componentRefs])

  // Update the path drawing based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Calculate scroll progress (0 to 1)
      const scrollPercentage = scrollY / (documentHeight - windowHeight)
      setScrollProgress(Math.min(1, Math.max(0, scrollPercentage)))

      // Update the path drawing
      if (pathRef.current && pathLength > 0) {
        const drawLength = pathLength * scrollPercentage
        pathRef.current.style.strokeDashoffset = `${pathLength - drawLength}`
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathLength])

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
      <svg ref={svgRef} className="absolute top-0 left-0 w-full h-full" style={{ overflow: "visible" }}>
        <path
          ref={pathRef}
          d={path}
          fill="none"
          stroke="#f0f0f0"
          strokeWidth="2"
          strokeLinecap="round"
          className="transition-all duration-100 ease-out"
          style={{
            opacity: 0.6,
            filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))",
          }}
        />

        {/* Animated circle that follows the path */}
        {path && (
          <circle
            r="8"
            fill="#fff"
            style={{
              filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))",
            }}
          >
            <animateMotion
              dur="1s"
              repeatCount="1"
              fill="freeze"
              path={path}
              keyPoints={[0, scrollProgress]}
              keyTimes="0;1"
              calcMode="linear"
            />
          </circle>
        )}
      </svg>
    </div>
  )
}

export default ScrollableLine

