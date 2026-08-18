import { useEffect, useRef, useState, type ReactNode } from 'react'

export function SectionShell({
  id,
  tone = 'light',
  className = '',
  children,
}: {
  id?: string
  tone?: 'light' | 'dark' | 'forest'
  className?: string
  children: ReactNode
}) {
  const bg =
    tone === 'dark'
      ? 'bg-ink text-paper'
      : tone === 'forest'
        ? 'blueprint-bg text-mint-soft'
        : 'bg-paper text-ink'
  return (
    <section id={id} className={`section-scroll relative ${bg} ${className}`}>
      {children}
    </section>
  )
}

export function SectionTag({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase ${
        dark ? 'text-mint' : 'text-forest-3'
      }`}
    >
      <span className="inline-block h-2 w-2 rounded-full bg-ember animate-pulse-dot" />
      {children}
    </span>
  )
}

export function H2({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-4xl md:text-6xl leading-[1.02] tracking-tight font-semibold ${className}`}>
      {children}
    </h2>
  )
}

export function Chip({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-ink/15 px-3 py-1 font-mono text-[11px] tracking-wide ${className}`}
    >
      {children}
    </span>
  )
}

// reveal-on-scroll wrapper (with hard fallback so content can never stay hidden)
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true)
      return
    }
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    const failSafe = window.setTimeout(() => setShow(true), 3000)
    return () => {
      io.disconnect()
      window.clearTimeout(failSafe)
    }
  }, [])
  return (
    <div
      ref={ref}
      className={`${className} ${show ? 'animate-fade-up' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// children only mount once visible (triggers Recharts draw-in animation)
// with a hard fallback so charts are never missing
export function Lazy({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true)
      return
    }
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    io.observe(el)
    const failSafe = window.setTimeout(() => setShow(true), 3000)
    return () => {
      io.disconnect()
      window.clearTimeout(failSafe)
    }
  }, [])
  return (
    <div ref={ref} className={className}>
      {show ? children : null}
    </div>
  )
}

export function Formula({ children }: { children: ReactNode }) {
  return (
    <code className="inline-block rounded-lg bg-ink text-mint px-3 py-1.5 font-mono text-[12.5px] whitespace-pre-wrap">
      {children}
    </code>
  )
}

export function TooltipShell({
  label,
  value,
  unit,
}: {
  label?: string
  value?: number | string
  unit?: string
}) {
  return (
    <div className="rounded-lg border border-ink/10 bg-paper px-3 py-2 shadow-lg">
      <div className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">{label}</div>
      <div className="font-display text-lg font-semibold text-forest">
        {value} <span className="text-xs font-mono text-ink-soft">{unit}</span>
      </div>
    </div>
  )
}

export const chartAxis = {
  stroke: 'rgba(11,20,16,0.22)',
  fontSize: 11,
  fontFamily: 'JetBrains Mono',
}