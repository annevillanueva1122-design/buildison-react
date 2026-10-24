export const prefersReducedMotion = () =>
  !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

export const hasFinePointer = () =>
  !!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches)
