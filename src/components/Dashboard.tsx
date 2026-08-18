import { Database, Gauge, Waves } from 'lucide-react'
import { SectionShell, SectionTag, H2, Reveal, Lazy } from './ui'
import {
  accelWave,
  gyroWave,
  fftSpectrum,
  gaitSteps,
  strideVals,
  temperatureSeries,
  dashboardMetrics,
} from '../data/demo'
import {
  AccelChart,
  GyroChart,
  FFTChart,
  GaitChart,
  StrideChart,
  TempChart,
} from './Charts'

function MetricCard({ m, i }: { m: (typeof dashboardMetrics)[number]; i: number }) {
  return (
    <Reveal delay={(i % 3) * 70}>
      <div className="group rounded-2xl border border-mint/15 bg-ink/60 p-4 transition hover:-translate-y-1 hover:border-mint/40 hover:bg-ink/80">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mint-soft/70">
            {m.label}
          </span>
          <Gauge size={14} className="text-ember/80" />
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="font-display text-3xl font-semibold text-mint tabular-nums">{m.value}</span>
          <span className="font-mono text-[11px] text-mint-soft/70">{m.unit}</span>
        </div>
        <p className="mt-1 font-mono text-[10px] text-mint-soft/55">{m.sub}</p>
      </div>
    </Reveal>
  )
}

export default function Dashboard() {
  return (
    <SectionShell id="dashboard" tone="dark" className="blueprint-bg">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionTag dark>06 — monitoring view</SectionTag>
            <H2 className="mt-5 text-mint">
              Movement <span className="sketch-underline">dashboard</span>
            </H2>
            <p className="mt-4 max-w-2xl text-lg text-mint-soft/85 leading-relaxed">
              A snapshot of how the prototype summarises a monitoring session into readable descriptors.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold/15 px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase text-gold">
              <Database size={14} /> Demonstration data
            </span>
          </Reveal>
        </div>

        {/* metrics grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9">
          {dashboardMetrics.map((m, i) => (
            <MetricCard key={m.label} m={m} i={i} />
          ))}
        </div>

        {/* charts */}
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Reveal delay={80}>
            <div className="glass-dark rounded-2xl p-5 h-full">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-mint mb-1">
                <Waves size={14} className="text-ember" /> Acceleration waveform · 5 s
                <span className="ml-auto text-mint-soft/50 normal-case">preloaded</span>
              </div>
              <Lazy>
                <AccelChart data={accelWave} height={210} />
              </Lazy>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="glass-dark rounded-2xl p-5 h-full">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-mint mb-1">
                <Waves size={14} className="text-ember" /> Gyroscope waveform · rotational movement
              </div>
              <Lazy>
                <GyroChart data={gyroWave} height={210} />
              </Lazy>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="glass-dark rounded-2xl p-5 h-full">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-mint mb-1">
                <Waves size={14} className="text-ember" /> FFT spectrum
                <span className="ml-auto flex gap-2 normal-case">
                  <span className="rounded px-1.5 py-0.5 bg-mint/15 text-mint">locomotor 0.5–3 Hz</span>
                  <span className="rounded px-1.5 py-0.5 bg-ember/15 text-ember">tremor 4–6 Hz</span>
                </span>
              </div>
              <Lazy>
                <FFTChart data={fftSpectrum} height={225} highlightPeak={1.84} hint="▲ dominant peak ≈ 1.84 Hz" />
              </Lazy>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="glass-dark rounded-2xl p-5 h-full">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-mint mb-1">
                <Waves size={14} className="text-ember" /> Gait timing · detected step markers
              </div>
              <Lazy>
                <GaitChart data={gaitSteps} height={210} />
              </Lazy>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass-dark rounded-2xl p-5 h-full">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-mint mb-1">
                <Waves size={14} className="text-ember" /> Stride variability
                <span className="ml-auto font-mono text-mint-soft/50 normal-case">9 consecutive strides</span>
              </div>
              <Lazy>
                <StrideChart data={strideVals} height={210} />
              </Lazy>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="glass-dark rounded-2xl p-5 h-full">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-mint mb-1">
                <Waves size={14} className="text-ember" /> Temperature · 12 h history
                <span className="ml-auto font-mono text-mint-soft/50 normal-case">auxiliary probe</span>
              </div>
              <Lazy>
                <TempChart data={temperatureSeries} height={210} />
              </Lazy>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <p className="mt-8 text-center font-mono text-[11px] tracking-wide text-mint-soft/50">
            All dashboard values and charts are fixed, preloaded demonstration data for presentation — not live measurements and not clinical data.
          </p>
        </Reveal>
      </div>
    </SectionShell>
  )
}