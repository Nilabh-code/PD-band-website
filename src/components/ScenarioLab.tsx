import { useState } from 'react'
import { FlaskConical, Info } from 'lucide-react'
import { SectionShell, SectionTag, H2, Reveal, Lazy } from './ui'
import { scenarios, scenarioIds, type Scenario } from '../data/demo'
import { AccelChart, FFTChart, StrideChart } from './Charts'
import MiniViz from './MiniViz'

function Metric({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="glass-dark rounded-xl px-4 py-3">
      <div className="font-mono text-[10px] uppercase tracking-wider text-mint-soft/70">{label}</div>
      <div className="mt-1 font-display text-2xl font-semibold tabular-nums" style={{ color: accent }}>
        {value}
      </div>
    </div>
  )
}

function ScenarioPanel({ s }: { s: Scenario }) {
  return (
    <div className="mt-8 rounded-3xl border border-mint/20 bg-ink/50 p-6 md:p-8">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass-dark rounded-2xl p-4">
          <div className="font-mono text-[11px] uppercase tracking-wider text-mint mb-1 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.accent }} />
            Acceleration · 5 s
          </div>
          <Lazy>
            <AccelChart data={s.wave} height={200} />
          </Lazy>
        </div>
        <div className="glass-dark rounded-2xl p-4">
          <div className="font-mono text-[11px] uppercase tracking-wider text-mint mb-1 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.accent }} />
            FFT spectrum
          </div>
          <Lazy>
            <FFTChart data={s.fft} height={200} highlightPeak={s.dominantFreq} />
          </Lazy>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Metric label="Cadence" value={`${s.cadence} steps/min`} accent={s.accent} />
        <Metric label="Stride CV" value={`${s.strideCV}%`} accent={s.accent} />
        <Metric label="Freeze Index" value={String(s.freezeIndex)} accent={s.accent} />
        <Metric label="Step Regularity" value={String(s.stepRegularity)} accent={s.accent} />
        <Metric label="Tremor Band" value={`${s.tremorBand}%`} accent={s.accent} />
      </div>

      <p className="mt-5 text-[13px] leading-relaxed text-mint-soft/75">{s.desc}</p>
    </div>
  )
}

export default function ScenarioLab() {
  const [active, setActive] = useState<'normal' | 'irregular' | 'tremor' | 'freezing'>('normal')
  const s = scenarios[active]

  return (
    <SectionShell tone="light">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8">
        <Reveal>
          <SectionTag>10 — interactive demonstration</SectionTag>
          <H2 className="mt-5 text-forest">
            What <span className="sketch-underline">happens if…?</span>
          </H2>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft leading-relaxed">
            Select a movement scenario and watch the preloaded waveforms, spectrum and descriptors swap.
            Everything here is an illustrative simulation — the exact same analysis chain, fed with
            different movement patterns.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-9 flex flex-wrap gap-3">
            {scenarioIds.map((id) => {
              const sc = scenarios[id]
              const isActive = active === id
              return (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[12px] uppercase tracking-wider transition ${
                    isActive
                      ? 'bg-forest text-mint shadow-lg scale-[1.03]'
                      : 'border-2 border-dashed border-forest/30 text-ink-soft hover:border-ember hover:text-ember'
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: isActive ? '#9cd9bc' : sc.accent }}
                  />
                  {sc.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div key={active} className="animate-fade-up">
          <ScenarioPanel s={s} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-forest/15 bg-cream/70 px-4 py-3">
          <Info size={15} className="text-ember" />
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">
            Illustrative demonstration — not patient data · no sensor connection
          </p>
        </div>

        {/* spectral entropy micro-demo */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal delay={80}>
            <div className="sketch-card bg-paper p-6">
              <div className="font-mono text-[11px] uppercase tracking-wider text-forest-3">
                Concentrated spectrum · low spectral entropy
              </div>
              <p className="mt-1 text-[12.5px] text-ink-soft">
                Energy concentrated in a few bands — typical of a strong, regular rhythm.
              </p>
              <Lazy>
                <MiniViz kind="entropy" />
              </Lazy>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="sketch-card bg-paper p-6">
              <div className="font-mono text-[11px] uppercase tracking-wider text-forest-3">
                Diffuse spectrum · higher spectral entropy
              </div>
              <p className="mt-1 text-[12.5px] text-ink-soft">
                Energy spread widely — characteristic of irregular, less repeatable movement.
              </p>
              <div className="opacity-40">
                <MiniViz kind="entropy" />
              </div>
              <span className="inline-block rounded-full bg-mint-soft px-2 py-1 font-mono text-[10px] text-forest">
                stylised comparison
              </span>
            </div>
          </Reveal>
        </div>

      </div>
    </SectionShell>
  )
}