import { Smartphone, Database, Check, TrendingUp, Gauge, Waves, Footprints, Thermometer } from 'lucide-react'
import { SectionShell, SectionTag, H2, Reveal } from './ui'
import { companionCards } from '../data/demo'

const icons = [TrendingUp, Gauge, Waves, Footprints, Thermometer, Waves, Gauge]

export default function Companion() {
  return (
    <SectionShell id="companion" tone="dark" className="blueprint-bg">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionTag dark>11 — companion interface</SectionTag>
            <H2 className="mt-5 text-mint">
              The <span className="sketch-underline">companion view</span>
            </H2>
            <p className="mt-4 max-w-2xl text-lg text-mint-soft/85 leading-relaxed">
              A static recreation of the Parkin Pulse companion interface — how a caregiver would read
              the prototype’s movement summary at a glance.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase text-mint">
              <Smartphone size={14} /> Prototype interface · demonstration data
            </span>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="mt-10 rounded-[36px] border border-mint/20 bg-ink/70 p-5 md:p-8 shadow-2xl">
            {/* phone-style header */}
            <div className="flex items-center justify-between border-b border-mint/15 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-mint/15 text-mint">
                  <Footprints size={20} />
                </span>
                <div>
                  <div className="font-display text-lg font-semibold text-mint leading-tight">
                    Parkin Pulse
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint-soft/60">
                    movement summary · last session
                  </div>
                </div>
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-mint/30 text-mint">
                <Check size={16} />
              </span>
            </div>

            {/* overview strip */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-mint/10 p-3 text-center">
                <div className="font-mono text-[9px] uppercase tracking-wider text-mint-soft/60">Session</div>
                <div className="font-display text-lg font-semibold text-mint">24 min</div>
              </div>
              <div className="rounded-xl bg-mint/10 p-3 text-center">
                <div className="font-mono text-[9px] uppercase tracking-wider text-mint-soft/60">Steps</div>
                <div className="font-display text-lg font-semibold text-mint">1,472</div>
              </div>
              <div className="rounded-xl bg-mint/10 p-3 text-center">
                <div className="font-mono text-[9px] uppercase tracking-wider text-mint-soft/60">Quality</div>
                <div className="font-display text-lg font-semibold text-gold">Steady</div>
              </div>
            </div>

            {/* cards */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {companionCards.map((c, i) => {
                const Icon = icons[i % icons.length]
                return (
                  <div
                    key={c.label}
                    className="rounded-2xl border border-mint/15 bg-ink/50 p-4 transition hover:border-mint/40 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-mint-soft/70">
                        {c.label}
                      </span>
                      <Icon size={14} className="text-ember" />
                    </div>
                    <div className="mt-1.5 font-display text-xl font-semibold text-mint tabular-nums">
                      {c.value}
                    </div>
                    <div className="font-mono text-[10px] text-mint-soft/50">{c.sub}</div>
                  </div>
                )
              })}
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-ember/50 bg-ember/10 p-4 text-center">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ember leading-relaxed">
                  16-feature
                  <br />
                  vector available
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 font-mono text-[10px] text-mint-soft/50 uppercase tracking-wider">
              <Database size={12} className="text-gold" />
              Preloaded static recreation inspired by the flex-poster companion screenshot
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}