import {
  Waves,
  Timer,
  SlidersHorizontal,
  Activity,
  SquareFunction,
  Sparkles,
  ArrowDown,
} from 'lucide-react'
import { SectionShell, SectionTag, H2, Reveal } from './ui'

const stages = [
  {
    icon: <Waves size={22} />,
    title: 'RAW IMU DATA',
    sub: 'ax · ay · az · gx · gy · gz',
    body: 'Six raw inertial channels stream from the MPU6050 — the unprocessed physical truth of every movement.',
  },
  {
    icon: <Timer size={22} />,
    title: '5-SECOND WINDOW',
    sub: 'tumbling buffer',
    body: 'The continuous stream is sliced into analysis windows. Five seconds captures multiple gait cycles while staying computationally light.',
  },
  {
    icon: <SlidersHorizontal size={22} />,
    title: 'SIGNAL PROCESSING',
    sub: 'filter · remove bias · normalize',
    body: 'Each window is cleaned — bias removed, drift corrected, and the signal prepared for frequency analysis.',
  },
  {
    icon: <Activity size={22} />,
    title: 'FFT + GAIT ANALYSIS',
    sub: 'spectrum · step detection',
    body: 'The window is transformed into the frequency domain while a parallel branch detects step events and stride intervals in time.',
  },
  {
    icon: <SquareFunction size={22} />,
    title: '16 FEATURES',
    sub: 'time · frequency · gait',
    body: 'Eight time-domain, four frequency-domain and four gait descriptors condense the whole window into a compact numerical fingerprint.',
  },
  {
    icon: <Sparkles size={22} />,
    title: 'MOVEMENT INTERPRETATION',
    sub: 'combination · insight',
    body: 'Features are combined into an interpretable summary — patterns flagging attention for a caregiver, never a single-number judgment.',
  },
]

export default function SignalPipeline() {
  return (
    <SectionShell id="pipeline" tone="forest">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-8">
        <Reveal>
          <SectionTag dark>06 — from motion to meaning</SectionTag>
          <H2 className="mt-5 text-mint-soft">
            FROM MOTION <span className="sketch-underline text-mint">TO MEANING</span>
          </H2>
          <p className="mt-5 max-w-2xl text-lg text-mint-soft/85 leading-relaxed">
            Six stages. One goal: converting many thousands of raw sensor samples every minute into a
            small set of meaningful, defensible movement descriptors.
          </p>
        </Reveal>

        <div className="mt-16 relative">
          {/* centre guide line */}
          <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-mint/5 via-mint/40 to-mint/5 hidden lg:block" />

          <div className="flex flex-col gap-8 lg:gap-6">
            {stages.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div
                  className={`relative flex lg:items-center ${
                    i % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'
                  }`}
                >
                  {/* big step number */}
                  <span className="hidden lg:block absolute font-display text-[72px] leading-none text-mint/10 font-bold select-none left-1/2 -translate-x-1/2">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="w-full lg:w-[46%]">
                    <div className="group glass-dark rounded-2xl p-6 transition hover:-translate-y-1.5 hover:bg-mint/10 hover:border-mint/45 cursor-default">
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint/15 text-mint group-hover:bg-ember/30 group-hover:text-ember transition">
                          {s.icon}
                        </span>
                        <div>
                          <h3 className="font-display text-xl md:text-2xl font-semibold text-mint leading-tight">
                            {s.title}
                          </h3>
                          <p className="font-mono text-[11px] uppercase tracking-wider text-mint-soft/70 mt-0.5">
                            {s.sub}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-[13.5px] leading-relaxed text-mint-soft/85">{s.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <div className="mt-14 grid gap-4 lg:grid-cols-4">
            {[
              {
                n: '1',
                t: 'Convert counts → real units',
                d: 'Raw sensor counts become g-force and °/s using calibration constants.',
              },
              {
                n: '2',
                t: 'Total movement magnitude',
                d: 'Three accelerometer axes combine into one orientation-independent number — how the band sits on the ankle no longer matters.',
              },
              {
                n: '3',
                t: 'High-pass filter',
                d: 'Gravity is constant, tremor is fast — filtering separates dynamic motion from gravity.',
              },
              {
                n: '4',
                t: 'Frequency detection',
                d: 'Goertzel-style analysis checks just the key bands — gait rhythm and tremor — with far less compute than a full spectrum.',
              },
            ].map((s, i) => (
              <div
                key={s.n}
                className="glass-dark rounded-2xl p-5 transition hover:-translate-y-1 hover:bg-mint/10"
              >
                <div className="font-mono text-[24px] font-bold text-ember/80">{s.n}</div>
                <div className="mt-1 font-display text-base font-semibold text-mint">{s.t}</div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-mint-soft/85">{s.d}</p>
                {i === 3 && (
                  <span className="mt-2 inline-block rounded-full bg-ember/20 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-ember">
                    on-device · not a full FFT
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 flex items-center justify-center gap-3 rounded-full border border-mint/25 bg-mint/10 px-6 py-3 w-max mx-auto">
            <ArrowDown size={16} className="text-ember" />
            <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-mint">
              every feature below originates from this chain
            </span>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}