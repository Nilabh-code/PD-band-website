import { ShieldAlert, ClipboardX, FlaskConical, Hammer } from 'lucide-react'
import { SectionShell, SectionTag, H2, Reveal } from './ui'

const limitations = [
  'Prototype-scale validation',
  'Sensor placement sensitivity',
  'Limited training/validation data',
  'Individual gait differences',
  'Demonstration data is not clinical data',
  'Not a diagnostic device',
  'Clinical fall-risk validation remains future work',
]

const futureNow = [
  'Ankle-worn IMU prototype',
  'Offline edge processing on ESP32-S3',
  '16-feature extraction from 5-second windows',
  'Static demonstration dashboard & companion views',
  'Prototype cost ≈ ₹2,000',
]

const futureLater = [
  'Larger clinical validation across India',
  'Additional physiological sensors',
  'Cloud caregiver / clinician dashboard',
  'Medication-response monitoring',
  'Personalised models per wearer',
  'Longitudinal gait tracking',
  'Larger datasets for analysis tuning',
  'Improved IMU hardware',
  'Edge ML optimisation on-device',
  'Better event detection algorithms',
]

export default function LimitsFuture() {
  return (
    <>
      <SectionShell tone="light">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8">
          <Reveal>
            <SectionTag>14 — honesty</SectionTag>
            <H2 className="mt-5 text-forest">
              Current <span className="sketch-underline">limitations</span>
            </H2>
            <p className="mt-5 max-w-2xl text-lg text-ink-soft leading-relaxed">
              A serious engineering project states its boundaries. Parkin Pulse is a movement-monitoring
              and analysis prototype — and that status comes with clear limits.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {limitations.map((l, i) => (
              <Reveal key={l} delay={i * 50}>
                <div className="flex items-start gap-3 rounded-xl border border-forest/15 bg-white/70 px-4 py-3.5">
                  <ShieldAlert size={16} className="mt-0.5 shrink-0 text-ember-2" />
                  <span className="text-[14px] text-ink leading-snug">{l}</span>
                </div>
              </Reveal>
            ))}
            <Reveal delay={380}>
              <div className="rounded-xl border-2 border-dashed border-ember/50 bg-ember/10 px-4 py-3.5 text-[12.5px] leading-relaxed text-ink-soft">
                Clinical fall-risk validation is explicitly{' '}
                <strong className="text-ember-2">not claimed</strong> by this prototype.
              </div>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="future" tone="forest" className="blueprint-bg">
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-8">
          <Reveal>
            <SectionTag dark>15 — roadmap</SectionTag>
            <H2 className="mt-5 text-mint">
              What comes <span className="sketch-underline text-mint">next</span>
            </H2>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal delay={80}>
              <div className="glass-dark rounded-3xl p-7 h-full">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mint">
                  <Hammer size={15} /> Current prototype
                </div>
                <ul className="mt-5 space-y-3">
                  {futureNow.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[14px] text-mint-soft/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="glass-dark rounded-3xl p-7 h-full border-mint/30 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-mint/15 blur-3xl" />
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                  <ClipboardX size={15} /> Future work
                </div>
                <ul className="mt-5 space-y-3">
                  {futureLater.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[14px] text-mint-soft/85">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="mt-10 flex items-center justify-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-5 py-3 w-max mx-auto font-mono text-[11px] uppercase tracking-wider text-mint">
              <FlaskConical size={14} /> The prototype is a foundation — validation is the next build
            </div>
          </Reveal>
        </div>
      </SectionShell>
    </>
  )
}