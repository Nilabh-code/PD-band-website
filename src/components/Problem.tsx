import { AlertTriangle, Footprints, HeartPulse, Timer, Activity, Move3d, Gauge } from 'lucide-react'
import { SectionShell, SectionTag, H2, Reveal, Chip } from './ui'

const problemPoints = [
  {
    title: 'Autonomic dysfunction',
    body: 'Parkinson’s can involve the autonomic nervous system. Dysregulated autonomic responses can lead to orthostatic hypotension — a drop in blood pressure on standing — which may cause dizziness or fainting episodes.',
  },
  {
    title: 'Why movement matters',
    body: 'Beyond episodic events, the disease is characterised by movement-related changes: gait abnormalities, movement instability, tremor-related oscillations, freezing episodes with gait disturbances, and potentially dangerous movement events.',
  },
  {
    title: 'The monitoring gap',
    body: 'These changes can appear in short windows and vary hour to hour. Capturing them during daily life requires continuous, unobtrusive sensing at the body itself — exactly what a wearable can provide.',
  },
]

const solutionPoints = [
  {
    icon: <Timer size={20} />,
    title: 'Walking rhythm',
    body: 'The ankle sits directly inside the gait cycle, so step timing and cadence are sensed at their source.',
  },
  {
    icon: <Footprints size={20} />,
    title: 'Step timing',
    body: 'Each heel contact and push-off produces a clear, localised signal — ideal for robust step detection.',
  },
  {
    icon: <Gauge size={20} />,
    title: 'Stride variability',
    body: 'Cycle-to-cycle timing consistency is measurable from adjacent stride intervals.',
  },
  {
    icon: <Activity size={20} />,
    title: 'Movement intensity',
    body: 'Lower-limb acceleration captures surge and effort across a whole window of movement.',
  },
  {
    icon: <Move3d size={20} />,
    title: 'Spectral content',
    body: 'Frequency-domain gait characteristics and rhythm regularity are derived from the same IMU stream.',
  },
]

export default function Problem() {
  return (
    <>
      <SectionShell tone="light">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
<Reveal>
          <SectionTag>01 — the problem</SectionTag>
          <H2 className="mt-5 text-forest">
            Why watch <span className="sketch-underline">movement</span> continuously?
          </H2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Parkinson’s disease affects far more than the tremor people picture most often. It disturbs
            the autonomic nervous system and, critically, the machinery of everyday movement.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Chip><HeartPulse size={13} className="mr-1 text-ember" />Orthostatic hypotension</Chip>
            <Chip><AlertTriangle size={13} className="mr-1 text-ember" />Fainting risk</Chip>
            <Chip>Gait instability</Chip>
            <Chip>Freezing episodes</Chip>
          </div>
        </Reveal>

        {/* hook stats band (script beat 0:00) */}
        <Reveal delay={120}>
          <div className="rounded-3xl border-2 border-dashed border-forest/30 bg-cream/80 p-6 md:p-8">
            <p className="font-display text-xl md:text-2xl font-semibold text-forest leading-snug">
              “One of the most dangerous parts isn’t the tremor itself — it’s the risk of a sudden fall,
              often while completely alone.”
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-forest p-5 text-mint">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint-soft/70">
                  living with Parkinson’s in India (project research reference)
                </div>
                <div className="mt-1 font-display text-4xl md:text-5xl font-bold tabular-nums">7,00,000+</div>
              </div>
              <div className="rounded-2xl bg-ink p-5 text-mint">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint-soft/70">
                  projected in India by 2030 (project research reference)
                </div>
                <div className="mt-1 font-display text-4xl md:text-5xl font-bold tabular-nums text-gold">
                  ≈ 28 lakh
                </div>
              </div>
            </div>
            <p className="mt-4 font-mono text-[10.5px] tracking-wide text-ink-soft">
              Figures as cited in the project’s outreach materials — shared here as a presentation
              reference, not a clinical claim.
            </p>
          </div>
        </Reveal>

            <div className="grid gap-5">
              {problemPoints.map((p, i) => (
                <Reveal key={p.title} delay={i * 90}>
                  <div className="sketch-card bg-paper/80 p-6">
                    <div className="font-mono text-[11px] tracking-[0.2em] text-ember-2 uppercase">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-forest">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>
      <SectionShell tone="dark" className="blueprint-bg">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8">
          <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <SectionTag dark>02 — the solution</SectionTag>
              <H2 className="mt-5 text-mint">
                A wearable that lives <span className="sketch-underline">where movement happens</span>
              </H2>
              <p className="mt-6 text-lg leading-relaxed text-mint-soft">
                Parkin Pulse is a lightweight ankle-worn IMU device for continuous movement monitoring.
                The ankle is chosen deliberately: it participates directly in gait and lower-limb motion,
                giving the sensor clear, unfiltered access to how a person actually walks.
              </p>
              <div className="mt-6 rounded-2xl border border-mint/25 bg-mint/10 p-5">
                <p className="text-sm leading-relaxed text-mint-soft">
                  <span className="text-mint font-semibold">Placement rationale —</span> ankle placement
                  provides useful access to walking rhythm, step timing, stride variability, movement
                  intensity and frequency-domain gait characteristics. The prototype does{' '}
                  <em>not</em> claim that ankle placement eliminates tremor interference.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {solutionPoints.map((p, i) => (
                <Reveal key={p.title} delay={i * 70}>
                  <div className="glass-dark rounded-2xl p-5 h-full transition hover:-translate-y-1 hover:border-mint/40">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-mint/15 text-mint">
                      {p.icon}
                    </div>
                    <h4 className="mt-3 font-display text-lg font-semibold text-mint">{p.title}</h4>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-mint-soft/90">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>
    </>
  )
}