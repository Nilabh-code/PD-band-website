import { ArrowRight, Presentation, Footprints, Waves, Cpu, ScanLine } from 'lucide-react'
import { Reveal, Chip } from './ui'
import WearableSVG from './WearableSVG'

const stats = [
  { icon: <ScanLine size={16} />, label: '6-AXIS IMU' },
  { icon: <Waves size={16} />, label: '16 FEATURES' },
  { icon: <Cpu size={16} />, label: 'EDGE PROCESSING' },
  { icon: <Footprints size={16} />, label: 'MOVEMENT ANALYSIS' },
]

export default function Hero({ onJudgeMode }: { onJudgeMode: () => void }) {
  return (
    <section id="overview" className="section-scroll relative min-h-screen overflow-hidden bg-cream grain">
      {/* soft background blobs */}
      <div className="pointer-events-none absolute -top-32 -right-24 h-[480px] w-[480px] rounded-full bg-mint/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-[420px] w-[420px] rounded-full bg-gold/25 blur-3xl" />

      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 pt-32 pb-16 md:px-8 md:grid-cols-[1.15fr_0.85fr] lg:min-h-screen">
        <div>
          <Reveal>
            <Chip className="border-forest/25 bg-paper/60 text-forest">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-ember animate-pulse-dot" />
              Movement Monitoring · Analysis Prototype
            </Chip>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[15vw] leading-[0.88] font-bold tracking-tight text-forest sm:text-8xl lg:text-[104px]">
              PARKIN
              <br />
              <span className="sketch-underline text-ink">PULSE</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-lg md:text-xl leading-relaxed text-ink-soft">
              An ankle-worn movement monitoring prototype for{' '}
              <strong className="text-forest">Parkinson’s-related gait analysis</strong> — capturing how a
              person walks and moves, and flagging potentially concerning movement patterns towards a
              caregiver.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-3">
              {stats.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-forest/30 bg-paper/70 px-3.5 py-2 font-mono text-[11px] tracking-[0.12em] text-forest-2"
                >
                  <span className="text-ember">{s.icon}</span>
                  {s.label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#pipeline"
                className="group inline-flex items-center gap-2.5 rounded-full bg-forest px-6 py-3.5 font-mono text-[13px] uppercase tracking-[0.14em] text-mint shadow-xl transition hover:bg-forest-2 hover:scale-[1.03] active:scale-95"
              >
                Explore the system
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </a>
              <button
                onClick={onJudgeMode}
                className="inline-flex items-center gap-2.5 rounded-full border-2 border-forest/25 bg-paper/80 px-6 py-3.5 font-mono text-[13px] uppercase tracking-[0.14em] text-forest transition hover:border-ember hover:text-ember active:scale-95"
              >
                <Presentation size={16} />
                Judge Mode
              </button>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <p className="mt-8 font-mono text-[11px] text-ink-soft uppercase tracking-[0.2em]">
              Prototype — not a clinically validated diagnostic device
            </p>
          </Reveal>
        </div>

        {/* wearable illustration side */}
        <Reveal delay={200} className="relative hidden md:block">
          <div className="relative mx-auto max-w-[460px]">
            <div className="ring-sweep" style={{ inset: '-30px' }} />
            <div className="animate-float">
              <WearableSVG className="w-full drop-shadow-2xl" />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-forest/15 bg-paper/80 px-4 py-1.5 font-mono text-[10px] tracking-[0.25em] text-ink-soft backdrop-blur">
              ANKLE-WORN · 9V · ESP32-S3
            </div>
          </div>
        </Reveal>
      </div>

      {/* bottom stat strip */}
      <div className="relative border-t border-forest/15 bg-forest text-mint">
        <div className="overflow-hidden py-3">
          <div className="animate-ticker flex w-max gap-14 whitespace-nowrap font-mono text-[12px] tracking-[0.18em] uppercase opacity-90">
            {Array.from({ length: 2 }).map((_, r) => (
              <div key={r} className="flex gap-14">
                <span>Accelerometer · Gyroscope · FFT · Gait Analysis</span>
                <span>16 Features · Spectral Entropy · Freeze Index · Cadence</span>
                <span>Ankle Placement · 5-Second Windows · Edge Processing</span>
                <span>Tremor-Band Ratio · Stride CV · Step Regularity</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}