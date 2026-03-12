import { useCallback, useRef } from 'react'

const MAX_TILT = 15
const TRANSITION_MS = 150

export function useTilt() {
  const ref = useRef(null)
  const rafId = useRef(null)

  const handlePointerMove = useCallback((e) => {
    const el = ref.current
    if (!el) return

    if (rafId.current) cancelAnimationFrame(rafId.current)

    rafId.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      const rotateY = (x - 0.5) * MAX_TILT * 2
      const rotateX = (0.5 - y) * MAX_TILT * 2

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      el.style.transition = `transform ${TRANSITION_MS}ms ease-out`

      el.style.setProperty('--mouse-x', `${x * 100}%`)
      el.style.setProperty('--mouse-y', `${y * 100}%`)
    })
  }, [])

  const handlePointerLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (rafId.current) cancelAnimationFrame(rafId.current)

    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    el.style.transition = 'transform 600ms ease-out'
    el.style.setProperty('--mouse-x', '50%')
    el.style.setProperty('--mouse-y', '50%')
  }, [])

  return { ref, handlePointerMove, handlePointerLeave }
}
