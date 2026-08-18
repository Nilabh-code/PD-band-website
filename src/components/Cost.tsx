import { Banknote, Cpu, BatteryCharging, Package, Thermometer, Zap } from 'lucide-react'
import { SectionShell, SectionTag, H2, Reveal } from './ui'

const parts = [
  { icon: <Cpu size={16} />, label: 'Sensing core', sub: 'MPU6050 IMU' },
  { icon: <Zap size={16} />, label: 'Edge controller', sub: 'ESP32-S3' },
  { icon: <BatteryCharging size={16} />, label: 'Power', sub: '9V battery + LM2596' },
  { icon: <Thermometer size={16} />, label: 'Auxiliary sensing', sub: 'temperature probe' },
  { icon: <Package size={16} />, label: 'Enclosure', sub: '3D-printed case' },
]

export default function Cost() {
  return (
    <SectionShell tone="light">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] items-center">
          <Reveal>
            <SectionTag>14 — cost of build</SectionTag>
            <H2 className="mt-5 text-forest">
              Prototype <span className="sketch-underline">cost</span>
            </H2>
            <div className="mt-8 rounded-3xl border-2 border-dashed border-forest/30 bg-cream/70 p-8 text-center">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-soft">
                typical prototype build
              </div>
              <div className="mt-2 font-display text-7xl font-bold text-forest tabular-nums">₹2,000</div>
              <div className="mt-1 font-mono text-[11px] text-ink-soft">approx. · development unit</div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-3">
              <p className="text-[14px] text-ink-soft leading-relaxed">
                A conceptual allocation across the build — final component prices depend on supplier,
                quantity and region, so figures are not listed at a per-part level.
              </p>
              {parts.map((p, i) => (
                <div
                  key={p.label}
                  className="flex items-center gap-4 rounded-xl border border-forest/15 bg-white/70 px-4 py-3.5 transition hover:border-ember"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-forest text-mint">
                    {p.icon}
                  </span>
                  <div className="flex-1">
                    <div className="font-display font-semibold text-forest">{p.label}</div>
                    <div className="font-mono text-[11px] text-ink-soft">{p.sub}</div>
                  </div>
                  <Banknote size={16} className="text-ember" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  )
}