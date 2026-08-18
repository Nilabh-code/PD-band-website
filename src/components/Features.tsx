import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { SectionShell, SectionTag, H2, Reveal, Formula, Lazy } from './ui'
import MiniViz from './MiniViz'
import { features, featureDomains, type ParkinFeature } from '../data/features'

type Filter = 'all' | 'time' | 'frequency' | 'gait'

const filters: Array<{ id: Filter; label: string }> = [
  { id: 'all', label: 'All 16' },
  { id: 'time', label: 'Time Domain' },
  { id: 'frequency', label: 'Frequency Domain' },
  { id: 'gait', label: 'Gait' },
]

function FeatureCard({ f, index }: { f: ParkinFeature; index: number }) {
  const [open, setOpen] = useState(false)
  const dom = featureDomains[f.domain]

  return (
    <Reveal delay={(index % 4) * 60}>
      <div
        className={`group rounded-2xl border bg-white/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
          open ? `border-ember shadow-lg ${dom.bar}` : 'border-forest/15 hover:border-ember/60'
        }`}
        onClick={() => setOpen(!open)}
      >
        <div className="relative p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-ember-2 font-semibold">#{f.num}</span>
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${dom.color} bg-mint-soft`}
                >
                  {dom.label}
                </span>
              </div>
              <h4 className="mt-2 font-display text-lg font-semibold leading-snug text-forest">
                {f.title}
              </h4>
              <p className="mt-1 text-[12.5px] text-ink-soft leading-relaxed">{f.short}</p>
            </div>
            <ChevronDown
              size={18}
              className={`shrink-0 mt-1 text-forest/40 transition-transform duration-300 ${
                open ? 'rotate-180' : 'group-hover:text-ember'
              }`}
            />
          </div>

          <Lazy>
            <div
              className={`grid transition-all duration-300 ${
                open ? 'mt-4 grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-dashed border-forest/20 pt-4">
                  <p className="text-[13.5px] leading-relaxed text-ink">
                    <span className="font-semibold text-forest">Definition · </span>
                    {f.definition}
                  </p>
                  {f.formula && (
                    <div className="mt-3">
                      <Formula>{f.formula}</Formula>
                    </div>
                  )}
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-xl bg-mint-soft/70 p-3">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-forest-3">
                        What it measures
                      </div>
                      <p className="mt-1 text-[12.5px] text-ink">{f.measures}</p>
                    </div>
                    <div className="rounded-xl bg-cream p-3">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-forest-3">
                        Why it is useful
                      </div>
                      <p className="mt-1 text-[12.5px] text-ink">{f.why}</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl border border-forest/10 bg-paper p-2">
                    <Lazy>
                      <MiniViz kind={f.viz} />
                    </Lazy>
                    <div className="px-2 pb-1 font-mono text-[9.5px] uppercase tracking-wider text-ink-soft">
                      illustrative example signal
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Lazy>
        </div>
      </div>
    </Reveal>
  )
}

export default function Features() {
  const [filter, setFilter] = useState<Filter>('all')
  const shown = features.filter((f) => filter === 'all' || f.domain === filter)

  return (
    <SectionShell id="features" tone="light">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionTag>07 — feature set</SectionTag>
            <H2 className="mt-5 text-forest">
              The <span className="sketch-underline">16 features</span>
            </H2>
            <p className="mt-4 max-w-2xl text-lg text-ink-soft leading-relaxed">
              Every 5-second window is compressed into sixteen descriptors. Click any card to open the
              full story — definition, formula, what it measures and an illustrative view.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition ${
                    filter === f.id
                      ? 'bg-forest text-mint shadow'
                      : 'border border-forest/20 text-ink-soft hover:border-ember hover:text-ember'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((f, i) => (
            <FeatureCard key={f.num} f={f} index={i} />
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-8 flex items-center justify-center gap-2 text-[13px] text-ink-soft">
            <X size={14} className="text-ember" />
            No single feature diagnoses Parkinson’s — features are designed to be read together.
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}