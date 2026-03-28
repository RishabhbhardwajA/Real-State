import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (!options.repeat) observer.unobserve(el)
        } else if (options.repeat) {
          setIsVisible(false)
        }
      },
      { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}

export function ScrollReveal({ children, animation = 'fadeUp', delay = 0, className = '', ...props }) {
  const [ref, isVisible] = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${animation} ${isVisible ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s`, ...props.style }}
      {...props}
    >
      {children}
    </div>
  )
}
