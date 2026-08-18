import { Activity } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest text-mint">
      <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-mint text-forest">
                <Activity size={20} />
              </span>
              <span className="font-display text-2xl font-bold tracking-tight">PARKIN PULSE</span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-mint-soft/80">
              A smart ankle-worn wearable prototype that watches how a Parkinson’s patient walks and
              shakes — and warns a caregiver before a fall happens.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-2 font-mono text-[12px] uppercase tracking-wider text-mint-soft/70">
            <a href="#overview" className="hover:text-mint">Overview</a>
            <a href="#hardware" className="hover:text-mint">Hardware</a>
            <a href="#pipeline" className="hover:text-mint">Signal Processing</a>
            <a href="#features" className="hover:text-mint">16 Features</a>
            <a href="#dashboard" className="hover:text-mint">Dashboard</a>
            <a href="#companion" className="hover:text-mint">Companion</a>
            <a href="#research" className="hover:text-mint">Research</a>
            <a href="#future" className="hover:text-mint">Future</a>
          </nav>
        </div>
        <div className="mt-10 border-t border-mint/20 pt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] text-mint-soft/60">
            Movement-monitoring and analysis prototype — not a clinically validated diagnostic device.
          </p>
          <p className="font-mono text-[11px] text-mint-soft/60">
            © 2026 Parkin Pulse · science &amp; technology exhibition
          </p>
        </div>
      </div>
    </footer>
  )
}