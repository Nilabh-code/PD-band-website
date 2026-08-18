import { Hand, Waves, Radio } from 'lucide-react'
import { SectionShell, SectionTag, H2, Reveal, Lazy } from './ui'
import { accelWave, gyroWave, fftSpectrum } from '../data/demo'
import { AccelChart, GyroChart, FFTChart } from './Charts'

export default function SignalView() {
  return (
    <SectionShell id="signal" tone="light">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8">
        <Reveal>
          <SectionTag>05 — the signal</SectionTag>
          <H2 className="mt-5 text-forest">
            What a tremor looks like <span className="sketch-underline">as a wave</span>
          </H2>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft leading-relaxed">
            The gyroscope below is angular velocity. A tremor pattern is a fast, repeating oscillation —
            live and unfiltered on the physical prototype, shown here with the same signal views on
            preloaded demonstration data.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Reveal delay={60}>
            <div className="rounded-3xl border border-forest/15 bg-ink text-mint overflow-hidden shadow-xl">
              <div className="flex items-center gap-2 border-b border-mint/15 px-5 py-3">
                <Waves size={16} className="text-ember" />
                <span className="font-mono text-[11px] uppercase tracking-wider">
                  Gyroscope · angular velocity (gx, gy, gz)
                </span>
              </div>
              <div className="px-3 py-2">
                <Lazy>
                  <GyroChart data={gyroWave} height={230} />
                </Lazy>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl border border-forest/15 bg-ink text-mint overflow-hidden shadow-xl">
              <div className="flex items-center gap-2 border-b border-mint/15 px-5 py-3">
                <Waves size={16} className="text-ember" />
                <span className="font-mono text-[11px] uppercase tracking-wider">
                  Accelerometer · three axes (ax, ay, az)
                </span>
              </div>
              <div className="px-3 py-2">
                <Lazy>
                  <AccelChart data={accelWave} height={230} />
                </Lazy>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-5 rounded-3xl border border-forest/15 bg-ink text-mint overflow-hidden shadow-xl">
            <div className="flex items-center gap-2 border-b border-mint/15 px-5 py-3 flex-wrap">
              <Waves size={16} className="text-ember" />
              <span className="font-mono text-[11px] uppercase tracking-wider">
                Frequency view · how the signal becomes numbers
              </span>
              <span className="ml-auto flex gap-2">
                <span className="rounded bg-mint/15 px-2 py-0.5 font-mono text-[10px] text-mint">gait rhythm</span>
                <span className="rounded bg-ember/20 px-2 py-0.5 font-mono text-[10px] text-ember">tremor band</span>
              </span>
            </div>
            <div className="px-3 py-2">
              <Lazy>
                <FFTChart data={fftSpectrum} height={220} hint="▲ dominant peak ≈ 1.84 Hz" />
              </Lazy>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Reveal delay={80}>
            <div className="sketch-card bg-paper p-5">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-forest-3">
                <Hand size={15} className="text-ember" /> Live on the prototype
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                On the physical device, this same signal drives the 3D leg visualizer and live graphs with
                no motor needed — tilt the sensor, watch the leg tilt.
              </p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="sketch-card bg-paper p-5">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-forest-3">
                <Radio size={15} className="text-ember" /> Frequency detection
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                For a handful of key frequencies (gait rhythm, tremor band) the prototype uses
                Goertzel-style selective detection — a full FFT is shown here for illustration.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  )
}