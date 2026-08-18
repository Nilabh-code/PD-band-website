import { useState } from 'react'
import { Crosshair } from 'lucide-react'
import { SectionShell, SectionTag, H2, Reveal } from './ui'
import WearableSVG from './WearableSVG'

interface Hotspot {
  id: string
  label: string
  x: number
  y: number
  title: string
  body: string
}

const hotspots: Hotspot[] = [
  {
    id: 'pod',
    label: 'Wearable',
    x: 50,
    y: 62,
    title: 'The Wearable',
    body: 'The assembled ankle module — a 3D-printed enclosure holding the IMU, controller, power stage and temperature probe.',
  },
  {
    id: 'imu',
    label: 'MPU6050',
    x: 38,
    y: 82,
    title: 'MPU6050 · 6-axis IMU',
    body: '3-axis accelerometer (ax, ay, az) + 3-axis gyroscope (gx, gy, gz). This is where every movement sample originates.',
  },
  {
    id: 'esp',
    label: 'ESP32-S3',
    x: 26,
    y: 58,
    title: 'ESP32-S3',
    body: 'Embedded controller that acquires the IMU stream and runs windowing, FFT, gait analysis and the 16-feature extraction on-device.',
  },
  {
    id: 'batt',
    label: 'Battery',
    x: 76,
    y: 40,
    title: '9V Battery',
    body: 'Prototype power source providing energy to the module for standalone wearing during trials.',
  },
  {
    id: 'conv',
    label: 'Power Converter',
    x: 18,
    y: 30,
    title: 'LM2596 Converter',
    body: 'Buck converter regulating the 9V supply down to the stable rails the ESP32-S3 and MPU6050 need.',
  },
  {
    id: 'temp',
    label: 'Temperature Probe',
    x: 78,
    y: 82,
    title: 'Temperature Probe',
    body: 'Auxiliary temperature measurement on the prototype — supplemental data, not a validated Parkinson’s biomarker.',
  },
]

function ExplodedView({ onSelect, activeId }: { onSelect: (h: Hotspot) => void; activeId: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="absolute inset-0 rounded-full border border-dashed border-forest/20" />
      <div className="rounded-[48px] border border-forest/15 bg-cream/70 p-6">
        <WearableSVG seed="show" className="w-full" />
      </div>

      {hotspots.map((h) => (
        <button
          key={h.id}
          onClick={() => onSelect(h)}
          className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none ${
            activeId === h.id ? 'z-20' : 'z-10'
          }`}
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
          aria-label={h.label}
        >
          <span
            className={`grid h-9 w-9 place-items-center rounded-full border-2 backdrop-blur transition group-hover:scale-125 ${
              activeId === h.id
                ? 'border-ember bg-ember text-paper'
                : 'border-forest bg-paper/70 text-forest'
            }`}
          >
            <Crosshair size={15} />
          </span>
          <span
            className={`pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider transition ${
              activeId === h.id ? 'bg-ember text-paper' : 'bg-forest text-mint group-hover:bg-forest-2'
            }`}
          >
            {h.label}
          </span>
          <span className="absolute inset-0 -z-10 animate-ring" aria-hidden>
            <span className="absolute inset-0 rounded-full border border-ember/50" />
          </span>
        </button>
      ))}
    </div>
  )
}

export default function HardwareShowcase() {
  const [active, setActive] = useState<Hotspot | null>(null)

  return (
    <SectionShell tone="light">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8">
        <Reveal>
          <SectionTag>09 — the prototype on the poster</SectionTag>
          <H2 className="mt-5 text-forest">
            Explore the <span className="sketch-underline">wearable</span>
          </H2>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft leading-relaxed">
            Click any <Crosshair size={13} className="inline text-ember" /> hotspot on the prototype to
            open that component.
          </p>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_380px]">
          <Reveal delay={100}>
            <ExplodedView
              activeId={active?.id ?? ''}
              onSelect={(h) => setActive(active?.id === h.id ? null : h)}
            />
          </Reveal>

          <Reveal delay={160}>
            <div className="space-y-3">
              {hotspots.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActive(active?.id === h.id ? null : h)}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                    active?.id === h.id
                      ? 'border-ember bg-ember/10'
                      : 'border-forest/20 bg-paper hover:border-forest/50 hover:bg-mint-soft'
                  }`}
                >
                  <span className="flex items-center gap-2 font-mono text-[12px] font-medium tracking-wider text-forest uppercase">
                    <Crosshair size={13} className={active?.id === h.id ? 'text-ember' : 'text-forest-3'} />
                    {h.label}
                  </span>
                  {active?.id === h.id && (
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{h.body}</p>
                  )}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  )
}