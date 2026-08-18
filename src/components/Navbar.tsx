import { useState } from 'react'
import { Activity, Menu, X, Presentation } from 'lucide-react'

const links = [
  { label: 'Overview', href: '#overview' },
  { label: 'The Signal', href: '#signal' },
  { label: 'Hardware', href: '#hardware' },
  { label: 'Processing', href: '#pipeline' },
  { label: '16 Features', href: '#features' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Companion', href: '#companion' },
  { label: 'Research', href: '#research' },
  { label: 'Future', href: '#future' },
]

export default function Navbar({ onJudgeMode }: { onJudgeMode: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 md:px-8 py-3">
        <a href="#overview" className="flex items-center gap-3 group">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest text-mint shadow-md transition group-hover:rotate-6 duration-300">
            <Activity size={20} strokeWidth={2.2} />
          </span>
          <span className="leading-tight">
            <span className="font-display text-lg font-semibold tracking-tight block">PARKIN PULSE</span>
            <span className="font-mono text-[10px] tracking-[0.25em] text-ink-soft uppercase">
              movement monitoring prototype
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 font-mono text-[12px] uppercase tracking-wider text-ink-soft transition hover:bg-mint-soft hover:text-forest"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onJudgeMode}
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-mint shadow-lg transition hover:bg-forest-2 hover:scale-[1.03] active:scale-95"
          >
            <Presentation size={15} />
            Judge Mode
          </button>
        </nav>

        <div className="lg:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-ink/15"
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-ink/10 bg-paper px-4 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 font-mono text-[12px] uppercase tracking-wider text-ink-soft hover:bg-mint-soft"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false)
              onJudgeMode()
            }}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-mint"
          >
            <Presentation size={15} /> Judge Mode
          </button>
        </nav>
      )}
    </header>
  )
}