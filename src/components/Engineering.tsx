import { useState } from 'react'
import { ChevronRight, Layers } from 'lucide-react'
import { SectionShell, SectionTag, H2, Reveal } from './ui'

const stages = [
  {
    id: 'imu',
    label: 'MPU6050',
    sub: '6-axis inertial data',
    body: 'Raw accelerometer (X, Y, Z) and gyroscope (X, Y, Z) streams captured at high rate from the ankle module.',
  },
  {
    id: 'window',
    label: '5-second windows',
    sub: 'tumbling buffer',
    body: 'The continuous stream is segmented into sliding analysis windows, each capturing several gait cycles.',
  },
  {
    id: 'prep',
    label: 'Preprocessing',
    sub: 'filter · debias',
    body: 'Bias subtraction, drift correction and normalisation prepare each window for frequency and gait analysis.',
  },
  {
    id: 'fft',
    label: 'FFT',
    sub: 'frequency domain',
    body: 'A Fourier Transform converts each window into a power spectrum, exposing rhythmic structure invisible in raw samples.',
  },
  {
    id: 'gaitdet',
    label: 'Gait / Step Detection',
    sub: 'time-domain events',
    body: 'Peak/trough detection locates step events and stride intervals within the window.',
  },
  {
    id: 'feat',
    label: '16 Feature Vector',
    sub: 'time · freq · gait',
    body: 'The window is condensed into sixteen descriptors: eight time-domain, four frequency-domain, four gait.',
  },
  {
    id: 'analysis',
    label: 'Statistical / ML Analysis',
    sub: 'prototype stage',
    body: 'Feature patterns are combined to characterise the movement window — the analysis layer that future trained models can refine.',
  },
  {
    id: 'insight',
    label: 'Movement Insight',
    sub: 'flag · summary',
    body: 'The result is an interpretable movement summary — flags and descriptors a caregiver can act on.',
  },
]

export default function Engineering() {
  const [openStage, setOpenStage] = useState<string | null>('feat')

  return (
    <SectionShell tone="light">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8">
        <Reveal>
          <SectionTag>13 — under the hood</SectionTag>
          <H2 className="mt-5 text-forest">
            THE <span className="sketch-underline">ENGINEERING</span>
          </H2>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft leading-relaxed">
            The full data path of the prototype, stage by stage. Click any stage for the detail.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col lg:flex-row lg:items-start gap-8">
          {/* vertical pipeline */}
          <Reveal delay={80}>
            <div className="w-full lg:w-[420px] lg:shrink-0">
              <div className="relative">
                <div className="absolute left-[22px] top-3 bottom-3 w-px bg-gradient-to-b from-ember/60 via-forest/40 to-mint" />
                <div className="space-y-1">
                  {stages.map((s, i) => {
                    const active = openStage === s.id
                    return (
                      <button
                        key={s.id}
                        onClick={() => setOpenStage(active ? null : s.id)}
                        className="group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-mint-soft"
                      >
                        <span
                          className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 font-mono text-[10px] font-bold transition ${
                            active
                              ? 'border-ember bg-ember text-paper'
                              : 'border-forest/25 bg-paper text-forest group-hover:border-ember'
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="flex-1">
                          <span
                            className={`font-display text-base font-semibold ${
                              active ? 'text-ember' : 'text-forest'
                            }`}
                          >
                            {s.label}
                          </span>
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                            {s.sub}
                          </span>
                        </span>
                        <ChevronRight
                          size={15}
                          className={`text-forest/40 transition ${active ? 'rotate-90 text-ember' : ''}`}
                        />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          {/* detail panel */}
          <Reveal delay={140} className="flex-1">
            <div className="sticky top-24 rounded-3xl border-2 border-dashed border-forest/25 bg-cream/60 p-8 min-h-[320px]">
              {openStage ? (
                (() => {
                  const s = stages.find((x) => x.id === openStage)!
                  return (
                    <div key={s.id} className="animate-fade-up">
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest text-mint">
                          <Layers size={20} />
                        </span>
                        <div>
                          <h3 className="font-display text-2xl font-semibold text-forest">{s.label}</h3>
                          <p className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                            {s.sub}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
                    </div>
                  )
                })()
              ) : (
                <div className="flex h-full items-center justify-center text-ink-soft/60 font-mono text-sm">
                  Click a stage to inspect it
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  )
}