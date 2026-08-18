import { useState } from 'react'
import { Search, ArrowDown, ArrowUp, ChevronRight } from 'lucide-react'
import { SectionShell, SectionTag, H2, Reveal } from './ui'
import { scenarioIds, scenarios } from '../data/demo'

interface Flag {
  label: string
  dir: 'up' | 'down'
  from: string
  to: string
  note: string
}

const flags: Flag[] = [
  { label: 'Stride CV', dir: 'up', from: '4.6%', to: '22.6%', note: 'step timing became far less consistent' },
  { label: 'Step Regularity', dir: 'down', from: '0.87', to: '0.44', note: 'successive strides no longer resembled each other' },
  { label: 'Freeze Index', dir: 'up', from: '0.214', to: '1.42', note: 'band-power shifted toward higher frequencies' },
  { label: 'Tremor-band power', dir: 'up', from: '7.8%', to: '24.8%', note: 'energy concentrated in the 4–6 Hz band' },
  { label: 'Cadence', dir: 'down', from: '61/min', to: '38/min', note: 'stepping rate dropped sharply' },
]

export default function Explainable() {
  const [open, setOpen] = useState(false)
  const base = scenarios.normal
  const flagged = scenarios.freezing

  return (
    <SectionShell tone="forest">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionTag dark>08 — explainability</SectionTag>
            <H2 className="mt-5 text-mint-soft leading-tight">
              WHY DID PARKIN PULSE <span className="sketch-underline text-mint">FLAG THIS?</span>
            </H2>
            <p className="mt-5 text-lg text-mint-soft/85 leading-relaxed">
              A simulated example — a “potentially concerning movement pattern” detected in the
              demonstration feed. The system doesn’t return a single score; it shows{' '}
              <strong className="text-mint">why</strong>, listing the descriptors that moved.
            </p>

            <div className="mt-7 space-y-2.5">
              {flags.map((f, i) => (
                <Reveal key={f.label} delay={i * 70}>
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-mint/20 bg-mint/5 px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`grid h-7 w-7 place-items-center rounded-full ${
                          f.dir === 'up' ? 'bg-ember/80 text-paper' : 'bg-mint/80 text-forest'
                        }`}
                      >
                        {f.dir === 'up' ? <ArrowUp size={15} /> : <ArrowDown size={15} />}
                      </span>
                      <div>
                        <div className="font-display text-base font-semibold text-mint">{f.label}</div>
                        <div className="font-mono text-[10.5px] text-mint-soft/60">
                          {f.from} → {f.to}
                        </div>
                      </div>
                    </div>
                    <p className="hidden text-right text-[12px] text-mint-soft/75 md:block max-w-[220px]">
                      {f.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="glass-dark rounded-3xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-ember/20 blur-3xl" />
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-ember">
                flag reasoning
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold text-mint">
                Potentially concerning movement pattern
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-mint-soft/85">
                Parkin Pulse is designed around <strong className="text-mint">combining multiple
                movement descriptors</strong> rather than relying on a single measurement. Each flagged
                descriptor contributes evidence; together they build a readable, defensible pattern.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-mint/15 bg-ink/50 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-mint-soft/60">Example window</div>
                  <div className="mt-1 font-display text-4xl font-semibold text-gold tabular-nums">{flagged.freezeIndex.toFixed(2)}</div>
                  <div className="text-[11px] text-mint-soft/60">Freeze Index</div>
                  <div className="mt-1 font-mono text-[10px] text-mint-soft/50">base {base.freezeIndex.toFixed(2)}</div>
                </div>
                <div className="rounded-2xl border border-mint/15 bg-ink/50 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-mint-soft/60">Window cadence</div>
                  <div className="mt-1 font-display text-4xl font-semibold text-ember tabular-nums">{flagged.cadence}</div>
                  <div className="text-[11px] text-mint-soft/60">steps/min</div>
                  <div className="mt-1 font-mono text-[10px] text-mint-soft/50">base {base.cadence}</div>
                </div>
              </div>

              <button
                onClick={() => setOpen(!open)}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-mint/30 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-mint transition hover:bg-mint/10"
              >
                <Search size={14} />
                How the pattern was assembled
                <ChevronRight size={14} className={`transition ${open ? 'rotate-90' : ''}`} />
              </button>
              {open && (
                <div className="mt-4 rounded-2xl border border-mint/20 bg-ink/60 p-4 text-[13px] leading-relaxed text-mint-soft/85">
                  <p>The analysis chain takes the same 5-second window used on every earlier screen, extracts the 16-feature vector, then compares descriptor ratios against a baseline built from the demonstration session.</p>
                  <p className="mt-2">
                    A movement flag is raised only when <em>several</em> descriptors move together — 
                    never from a single feature. That is deliberate: it reduces sensitivity to noise and keeps the explanation legible.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <p className="mt-12 text-center font-mono text-[11px] text-mint-soft/50 tracking-wide">
            Illustrative demonstration of prototype reasoning — not a clinical prediction.
          </p>
        </Reveal>
      </div>
    </SectionShell>
  )
}

export { scenarioIds }