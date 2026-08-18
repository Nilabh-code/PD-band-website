import { useState, useEffect, useCallback } from 'react'
import { X, ArrowLeft, ArrowRight, AlertTriangle, HeartPulse, Waves as WavesIcon, Box, Brain, LayoutGrid, ClipboardCheck, Activity, Presentation } from 'lucide-react'
import { Reveal } from './ui'
import { accelWave, gyroWave, fftSpectrum, dashboardMetrics } from '../data/demo'
import { AccelChart, GyroChart, FFTChart } from './Charts'
import WearableSVG from './WearableSVG'

interface Slide {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
}

const slides: Slide[] = [
  { id: 'problem', title: 'THE PROBLEM', subtitle: 'Why continuous movement monitoring matters', icon: <AlertTriangle size={26} /> },
  { id: 'device', title: 'THE DEVICE', subtitle: 'The ankle wearable & the hardware behind it', icon: <Box size={26} /> },
  { id: 'signal', title: 'THE SIGNAL', subtitle: 'Raw accelerometer & gyroscope data', icon: <WavesIcon size={26} /> },
  { id: 'features', title: 'THE PIPELINE', subtitle: 'From motion to the 16-feature vector', icon: <LayoutGrid size={26} /> },
  { id: 'intelligence', title: 'THE INTELLIGENCE', subtitle: 'How features feed an analysis / ML layer', icon: <Brain size={26} /> },
  { id: 'demo', title: 'THE DEMO', subtitle: 'The static monitoring dashboard', icon: <ClipboardCheck size={26} /> },
]

const stageLabels = [
  'MPU6050 · 6-axis inertial data',
  '5-second windows',
  'Preprocessing',
  'FFT',
  'Gait / Step Detection',
  '16 Feature Vector',
  'Statistical / ML Analysis',
  'Movement Insight',
]

export default function JudgeMode({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [idx, setIdx] = useState(0)

  const next = useCallback(() => setIdx((i) => Math.min(i + 1, slides.length - 1)), [])
  const prev = useCallback(() => setIdx((i) => Math.max(i - 1, 0)), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') { e.preventDefault(); next() }
      else if (e.key === 'ArrowLeft' || e.key === 'Backspace') { e.preventDefault(); prev() }
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, next, prev, onClose])

  useEffect(() => {
    setIdx(0)
  }, [open])

  if (!open) return null

  return (
    <div className="judge-overlay fixed inset-0 z-[100] flex flex-col">
      {/* top bar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-mint/20">
        <div className="flex items-center gap-3">
          <Presentation size={20} className="text-mint" />
          <span className="font-display text-lg font-semibold text-mint tracking-wide">JUDGE MODE</span>
        </div>
        <div className="font-mono text-[13px] tracking-[0.25em] text-mint">
          {String(idx + 1).padStart(2, '0')} <span className="text-mint-soft/50">/ {String(slides.length).padStart(2, '0')}</span>
        </div>
        <button
          onClick={onClose}
          className="grid h-10 w-10 place-items-center rounded-full border border-mint/30 text-mint transition hover:bg-mint/10"
          aria-label="Exit judge mode"
        >
          <X size={18} />
        </button>
      </div>

      {/* slide body */}
      <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8">
        <div key={idx} className="animate-fade-up mx-auto max-w-[1200px]">
          {/* slide header */}
          <div className="flex items-center gap-4 mb-8">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-mint/15 text-mint">
              {slides[idx].icon}
            </span>
            <div>
              <div className="font-mono text-[12px] tracking-[0.3em] text-ember uppercase">
                slide {String(idx + 1).padStart(2, '0')}
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-semibold text-mint leading-none mt-1">
                {slides[idx].title}
              </h2>
              <p className="mt-1.5 text-mint-soft/80 text-sm md:text-base">{slides[idx].subtitle}</p>
            </div>
          </div>

          {idx === 0 && <ProblemSlide />}
          {idx === 1 && <DeviceSlide />}
          {idx === 2 && <SignalSlide />}
          {idx === 3 && <FeaturesSlide />}
          {idx === 4 && <IntelligenceSlide />}
          {idx === 5 && <DemoSlide />}

          {/* bottom honest note always visible */}
          <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-mint-soft/40">
            Movement-monitoring and analysis prototype · not a clinically validated diagnostic device
          </p>
        </div>
      </div>

      {/* controls */}
      <div className="px-6 md:px-12 py-4 border-t border-mint/20 flex items-center justify-between gap-4">
        <button
          onClick={prev}
          disabled={idx === 0}
          className="inline-flex items-center gap-2 rounded-full border border-mint/30 px-5 py-2.5 font-mono text-[12px] uppercase tracking-wider text-mint transition enabled:hover:bg-mint/10 disabled:opacity-30"
        >
          <ArrowLeft size={15} /> Back
        </button>
        <div className="hidden md:flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all ${i === idx ? 'w-8 bg-ember' : 'w-2 bg-mint/30 hover:bg-mint/60'}`}
              aria-label={`Go to ${s.title}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={idx === slides.length - 1}
          className="inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 font-mono text-[12px] uppercase tracking-wider text-paper transition enabled:hover:brightness-110 disabled:opacity-30"
        >
          Next <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}

function ProblemSlide() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="glass-dark rounded-2xl p-6">
          <div className="font-mono text-[10px] uppercase tracking-wider text-mint-soft/70">
            living with Parkinson’s in India · project research reference
          </div>
          <div className="mt-1 font-display text-5xl font-bold text-mint tabular-nums">7,00,000+</div>
        </div>
        <div className="glass-dark rounded-2xl p-6">
          <div className="font-mono text-[10px] uppercase tracking-wider text-mint-soft/70">
            projected in India by 2030 · project research reference
          </div>
          <div className="mt-1 font-display text-5xl font-bold text-gold tabular-nums">≈ 28 lakh</div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-dark rounded-3xl p-7">
          <h3 className="font-display text-xl font-semibold text-mint mb-4">The most dangerous part isn’t the tremor</h3>
          <ul className="space-y-3 text-[15px] text-mint-soft/90 leading-relaxed">
            <li className="flex gap-2.5"><HeartPulse size={17} className="shrink-0 text-ember mt-0.5" /> Autonomic dysfunction can cause orthostatic hypotension &amp; fainting on standing.</li>
            <li className="flex gap-2.5"><AlertTriangle size={17} className="shrink-0 text-ember mt-0.5" /> The real risk: a sudden fall — often while completely alone.</li>
            <li className="flex gap-2.5"><WavesIcon size={17} className="shrink-0 text-mint mt-0.5" /> Gait abnormalities, movement instability &amp; freezing-related gait changes.</li>
            <li className="flex gap-2.5"><Activity size={17} className="shrink-0 text-gold mt-0.5" /> Tremor-related oscillations &amp; potentially dangerous movement events.</li>
          </ul>
        </div>
        <div className="glass-dark rounded-3xl p-7">
          <h3 className="font-display text-xl font-semibold text-mint mb-4">The monitoring gap</h3>
          <p className="text-[15px] leading-relaxed text-mint-soft/90">
            These changes surface in short windows and shift hour to hour. Capturing them during daily life
            requires unobtrusive, continuous sensing at the body itself — which is exactly what an
            ankle-worn IMU prototype can provide.
          </p>
          <div className="mt-5 rounded-2xl border border-dashed border-mint/30 p-4 text-[13px] leading-relaxed text-mint-soft/80">
            <strong className="text-mint">Honest framing —</strong> continuous movement monitoring is the goal;
            clinical diagnosis or fall-risk prediction is explicitly out of scope for this prototype.
          </div>
        </div>
      </div>
    </div>
  )
}

function DeviceSlide() {
  return (
    <div className="grid gap-8 md:grid-cols-2 items-center">
      <div className="glass-dark rounded-3xl p-6">
        <WearableSVG seed="judge" className="w-full max-w-[420px] mx-auto" />
      </div>
      <div className="glass-dark rounded-3xl p-7">
        <h3 className="font-display text-xl font-semibold text-mint mb-4">Ankle-worn, edge-processed</h3>
        <div className="flex flex-wrap gap-2 mb-5">
          {['MPU6050', 'ESP32-S3', 'Temp Probe', '3D-printed case', '9V battery', 'LM2596'].map((c) => (
            <span key={c} className="rounded-full bg-mint/10 border border-mint/25 px-3 py-1 font-mono text-[11px] text-mint">
              {c}
            </span>
          ))}
        </div>
        <p className="text-[14.5px] leading-relaxed text-mint-soft/85">
          The ankle sits inside the gait chain: walking rhythm, step timing, stride variability and
          lower-limb movement intensity are all sensed close to their source. All processing runs
          on-device — the prototype never needs a live connection.
        </p>
        <p className="mt-3 text-[13px] text-mint-soft/60 font-mono">
          P&amp;S: ankle placement does not &ldquo;eliminate&rdquo; tremor interference &mdash; it prioritises gait access.
        </p>
      </div>
    </div>
  )
}

function SignalSlide() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="glass-dark rounded-3xl p-5">
        <div className="font-mono text-[11px] uppercase tracking-wider text-mint mb-1">
          Accelerometer · ax ay az · 5 s preloaded window
        </div>
        <AccelChart data={accelWave} height={230} />
      </div>
      <div className="glass-dark rounded-3xl p-5">
        <div className="font-mono text-[11px] uppercase tracking-wider text-mint mb-1">
          Gyroscope · gx gy gz · rotational rate
        </div>
        <GyroChart data={gyroWave} height={230} />
      </div>
      <div className="lg:col-span-2 glass-dark rounded-3xl p-5">
        <div className="font-mono text-[11px] uppercase tracking-wider text-mint mb-1 flex items-center gap-3 flex-wrap">
          FFT spectrum · dominant peak ≈ 1.84 Hz
          <span className="ml-auto rounded bg-mint/15 px-2 py-0.5 text-[10px] text-mint">locomotor 0.5–3 Hz</span>
          <span className="rounded bg-ember/20 px-2 py-0.5 text-[10px] text-ember">tremor 4–6 Hz</span>
        </div>
        <FFTChart data={fftSpectrum} height={200} hint="▲ dominant peak" />
      </div>
    </div>
  )
}

function FeaturesSlide() {
  return (
    <div className="space-y-6">
      <div className="glass-dark rounded-3xl p-6">
        <h3 className="font-display text-xl font-semibold text-mint mb-4">The full path</h3>
        <div className="flex flex-wrap items-center gap-2">
          {stageLabels.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span className="rounded-lg border border-mint/25 bg-mint/5 px-3 py-1.5 text-[12.5px] text-mint font-medium">
                {s}
              </span>
              {i < stageLabels.length - 1 && <span className="text-ember text-sm">→</span>}
            </div>
          ))}
        </div>
        <p className="mt-3 font-mono text-[11px] text-mint-soft/60">
          On-device frequency detection is Goertzel-style (a handful of key bands); a full FFT is shown here for illustration.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass-dark rounded-2xl p-5">
          <div className="font-mono text-[10px] uppercase tracking-wider text-ember mb-2">Time domain · 8</div>
          <p className="text-[13px] text-mint-soft/85 leading-relaxed">
            Magnitude, std dev, RMS, peak-to-peak, SMA, zero-crossings, skewness, kurtosis.
          </p>
        </div>
        <div className="glass-dark rounded-2xl p-5">
          <div className="font-mono text-[10px] uppercase tracking-wider text-ember mb-2">Frequency domain · 4</div>
          <p className="text-[13px] text-mint-soft/85 leading-relaxed">
            Dominant frequency, tremor-band power (4–6 Hz), Freeze Index (3–8 / 0.5–3 Hz), spectral entropy.
          </p>
        </div>
        <div className="glass-dark rounded-2xl p-5">
          <div className="font-mono text-[10px] uppercase tracking-wider text-ember mb-2">Gait · 4</div>
          <p className="text-[13px] text-mint-soft/85 leading-relaxed">
            Mean stride time, stride-time CV%, cadence, step regularity (autocorrelation).
          </p>
        </div>
      </div>
    </div>
  )
}

function IntelligenceSlide() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="glass-dark rounded-3xl p-7">
        <h3 className="font-display text-xl font-semibold text-mint mb-3 flex items-center gap-2">
          <Brain size={20} className="text-gold" /> How the intelligence is built
        </h3>
        <p className="text-[15px] leading-relaxed text-mint-soft/90">
          Each 5-second window is compressed into a <strong className="text-mint">16-feature vector</strong>.
          Features — not raw samples — are what any analysis layer consumes: statistical pattern rules today,
          trained ML models in future work.
        </p>
        <div className="mt-5 space-y-2">
          {[
            ['Combination, not single numbers', 'Patterns are judged across several descriptors together.'],
            ['Offline pipeline', 'Everything shown runs in the browser from preloaded data.'],
            ['Explainable flags', 'The prototype reports WHY (which descriptors moved), not just a score.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl bg-mint/5 border border-mint/20 p-3.5">
              <div className="text-[14px] text-mint font-semibold">{t}</div>
              <div className="text-[13px] text-mint-soft/80">{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-dark rounded-3xl p-7">
        <h3 className="font-display text-xl font-semibold text-mint mb-3">Analysis layer (prototype)</h3>
        <div className="rounded-xl bg-ink/60 border border-mint/15 p-4 font-mono text-[12.5px] text-mint-soft leading-loose">
          <div>window = slice(sensor_stream, 5s)</div>
          <div>spectrum = fft(window)</div>
          <div>steps = detect_gait_events(window)</div>
          <div className="text-gold">features = extract_16(window, spectrum, steps)</div>
          <div className="text-ember">flag = combine_descriptors(features)</div>
          <div>summary = render(flag, features)</div>
        </div>
        <p className="mt-4 text-[13px] text-mint-soft/70">
          Illustrative pseudocode of the prototype pipeline — no live inference is running on this page.
        </p>
      </div>
    </div>
  )
}

function DemoSlide() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h3 className="font-display text-xl font-semibold text-mint">Static monitoring dashboard</h3>
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold/15 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-gold">
          Demonstration data
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {dashboardMetrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-mint/15 bg-ink/60 p-4 text-center">
            <div className="font-mono text-[10px] uppercase tracking-wider text-mint-soft/70">{m.label}</div>
            <div className="mt-1 font-display text-2xl font-semibold text-mint tabular-nums">{m.value} <span className="text-[11px] font-mono text-mint-soft/60">{m.unit}</span></div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[12.5px] font-mono text-mint-soft/60">
        Fixed preloaded values — the dashboard looks identical every time. Not live, not clinical.
      </p>
    </div>
  )
}