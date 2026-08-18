import { useState } from 'react'
import {
  Cpu,
  Axis3d,
  Thermometer,
  Package,
  BatteryCharging,
  Zap,
  ChevronDown,
  ArrowDown,
  Wifi,
} from 'lucide-react'
import { SectionShell, SectionTag, H2, Reveal } from './ui'

const components = [
  {
    icon: <Cpu size={22} />,
    name: 'ESP32-S3',
    role: 'Embedded controller',
    detail:
      'Acquires raw inertial data from the IMU and runs the on-device processing chain: windowing, signal processing, FFT, feature extraction. A capable edge controller with on-board ML acceleration headroom.',
  },
  {
    icon: <Axis3d size={22} />,
    name: 'MPU6050',
    role: '6-axis IMU',
    detail:
      'Combines a 3-axis accelerometer (ax, ay, az — linear acceleration) and a 3-axis gyroscope (gx, gy, gz — rotation). This single chip is the sensory core of the prototype.',
  },
  {
    icon: <Thermometer size={22} />,
    name: 'Temperature Probe',
    role: 'Auxiliary measurement',
    detail:
      'An auxiliary temperature measurement on the prototype. It is not presented as a validated Parkinson’s biomarker — its role here is supplemental sensing during trials.',
  },
  {
    icon: <Package size={22} />,
    name: '3D Printed Case',
    role: 'Custom enclosure',
    detail:
      'A bespoke enclosure housing the wearable electronics, designed to protect the module and sit comfortably around the ankle during walking trials.',
  },
  {
    icon: <BatteryCharging size={22} />,
    name: '9V Battery',
    role: 'Prototype power source',
    detail:
      'A 9V cell powers the prototype — a simple, portable supply appropriate for the development stage of the device.',
  },
  {
    icon: <Zap size={22} />,
    name: 'LM2596 Converter',
    role: 'Power regulation stage',
    detail:
      'The LM2596 buck converter steps the 9V supply down to the stable voltage rails the ESP32-S3 and MPU6050 require, forming the power regulation/conversion stage.',
  },
]

const pipeline = [
  { icon: <Axis3d size={18} />, label: 'MPU6050' },
  { icon: <Cpu size={18} />, label: 'ESP32-S3' },
  { icon: <Wifi size={18} />, label: 'Signal Processing' },
  { icon: <Zap size={18} />, label: 'Feature Extraction' },
  { icon: <Cpu size={18} />, label: 'Analysis' },
]

function ComponentCard({ c, i }: { c: (typeof components)[number]; i: number }) {
  const [open, setOpen] = useState(false)
  return (
    <Reveal delay={i * 60}>
      <button
        onClick={() => setOpen(!open)}
        className="glass-dark group w-full rounded-2xl p-5 text-left transition hover:-translate-y-1 hover:bg-mint/10"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint/15 text-mint group-hover:bg-mint/30">
              {c.icon}
            </span>
            <div>
              <h4 className="font-display text-lg font-semibold text-mint">{c.name}</h4>
              <p className="font-mono text-[11px] uppercase tracking-wider text-mint-soft/70">{c.role}</p>
            </div>
          </div>
          <ChevronDown
            size={18}
            className={`mt-1 text-mint transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </div>
        <div
          className={`grid transition-all duration-300 ${open ? 'mt-3 grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div className="overflow-hidden">
            <p className="text-[13.5px] leading-relaxed text-mint-soft/90">{c.detail}</p>
          </div>
        </div>
      </button>
    </Reveal>
  )
}

export default function Hardware() {
  return (
    <SectionShell id="hardware" tone="light">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8">
        <Reveal>
          <SectionTag>03 — hardware</SectionTag>
          <H2 className="mt-5 text-forest">
            The <span className="sketch-underline">device</span>
          </H2>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft leading-relaxed">
            A compact, purpose-built sensing platform. Every component is chosen for one job: capturing
            clean movement data at the ankle and turning it into features on-device.
          </p>
        </Reveal>

        {/* pipeline visualization */}
        <Reveal delay={120}>
          <div className="mt-12 rounded-3xl border border-dashed border-forest/30 bg-cream/60 p-6 md:p-8">
            <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-soft mb-5">
              signal pipeline · on-device
            </div>
            <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-center">
              {pipeline.map((s, i) => (
                <div key={s.label} className="flex flex-col items-center gap-3 md:flex-row">
                  <div className="group relative flex w-56 items-center gap-3 rounded-xl border border-forest/15 bg-paper px-4 py-3 shadow-sm transition hover:border-ember hover:-translate-y-0.5">
                    <span className="text-ember">{s.icon}</span>
                    <span className="font-mono text-[12px] tracking-wide text-forest font-medium">
                      {s.label}
                    </span>
                    {(i === 0 || i === 3) && (
                      <span className="absolute -top-2 right-2 rounded-full bg-ember px-1.5 py-0.5 text-[9px] font-mono text-paper">
                        IMU
                      </span>
                    )}
                  </div>
                  {i < pipeline.length - 1 && (
                    <span className="hidden text-forest/50 md:inline">
                      <ArrowDown size={18} className="md:rotate-[-90deg]" />
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 text-center font-mono text-[11px] text-ink-soft">
              → companion interface · caregiver view
            </div>
          </div>
        </Reveal>

        {/* component cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {components.map((c, i) => (
            <ComponentCard key={c.name} c={c} i={i} />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}