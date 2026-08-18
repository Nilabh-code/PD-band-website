export interface WavePoint {
  t: number
  ax: number
  ay: number
  az: number
  gx: number
}

export interface FFTBin {
  f: number
  p: number
}

export interface Scenario {
  id: string
  label: string
  desc: string
  chip: string
  barsBg: string
  accent: string
  cadence: number
  strideCV: number
  freezeIndex: number
  stepRegularity: number
  tremorBand: number
  dominantFreq: number
  wave: WavePoint[]
  fft: FFTBin[]
}

// deterministic seeded PRNG (mulberry32) — identical data on every load
function mulberry32(seed: number) {
  let t = seed
  return function () {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

// damped random-walk noise for organic waveforms
function noiseWalk(rng: () => number, n: number, amp: number) {
  const out: number[] = []
  let v = 0
  for (let i = 0; i < n; i++) {
    v = v * 0.92 + (rng() - 0.5) * 2 * amp
    out.push(v)
  }
  return out
}

// generate a 5-second, 100 Hz waveform from a spectrum definition
function makeWave(seed: number, spec: Array<{ f: number; a: number }>, tremorAmp: number): WavePoint[] {
  const rng = mulberry32(seed)
  const N = 500
  const fs = 100
  const dt = 1 / fs
  const noiseA = noiseWalk(rng, N, 0.22)
  const noiseG = noiseWalk(rng, N, 0.05)
  const tremor = tremorAmp
  const pts: WavePoint[] = []
  for (let i = 0; i < N; i++) {
    const t = i * dt
    let sx = 0
    let sy = 0
    let sz = 0
    let sg = 0
    for (const c of spec) {
      const phase = (() => {
        const r = rng()
        return r * Math.PI * 2
      })()
      sx += c.a * Math.sin(2 * Math.PI * c.f * t + phase)
      sy += c.a * 0.85 * Math.sin(2 * Math.PI * c.f * t + phase + 1.1)
      sz += c.a * 1.05 * Math.sin(2 * Math.PI * c.f * t + phase + 2.4)
      sg += c.a * (c.f / 2.6) * Math.sin(2 * Math.PI * c.f * t + phase + 0.4)
    }
    // tremor oscillation for tremor-dominant state
    const tr = tremor * Math.sin(2 * Math.PI * 5.1 * t + i * 0.13)
    pts.push({
      t: +(t / (N * dt) * 5).toFixed(3),
      ax: +(sx + noiseA[i] + (seed === 30 ? tr * 0.6 : tr * 0.12)).toFixed(3),
      ay: +(sy + noiseA[(i + 137) % N] * 0.8 + (seed === 30 ? tr * 0.5 : 0)).toFixed(3),
      az: +(sz + noiseA[(i + 341) % N] * 0.8).toFixed(3),
      gx: +(sg + noiseG[i] + (seed === 30 ? tr * 0.2 : 0)).toFixed(3),
    })
  }
  return pts
}

// build an FFT-style spectrum (analytic, deterministic)
function makeFFT(seed: number, peaks: Array<[number, number, number]>, bg: number): FFTBin[] {
  const rng = mulberry32(seed)
  const bins: FFTBin[] = []
  for (let f = 0.25; f <= 12.0; f += 0.125) {
    let p = bg
    for (const [cf, ca, width] of peaks) {
      const g = ca * Math.exp(-Math.pow((f - cf) / width, 2))
      p += g
    }
    p += (rng() - 0.5) * bg * 0.5
    // stop energy falling to exact zero around edges
    p = Math.max(p, bg * 0.25)
    bins.push({ f: +f.toFixed(2), p: +p.toFixed(3) })
  }
  return bins
}

const fs = 100
const N = 500

function mapTime(p: WavePoint) {
  return { ...p, t: +(p.t / (N / fs)).toFixed(2) }
}

export const accelWave = makeWave(11, [
  { f: 1.84, a: 1.0 },
  { f: 3.68, a: 0.3 },
  { f: 0.5, a: 0.12 },
], 0.05).map(mapTime)

export const gyroWave = makeWave(21, [
  { f: 1.84, a: 1.3 },
  { f: 3.68, a: 0.25 },
], 0.04).map(mapTime)

export const fftSpectrum: FFTBin[] = makeFFT(5, [
  [1.84, 1.0, 0.09],
  [3.68, 0.32, 0.14],
  [5.0, 0.09, 0.18],
], 0.05)

export interface GaitStep {
  t: number
  val: number
  marked: boolean
}

// step markers around a mean stride time
export function gaitTiming(meanInterval: number, seed = 7): GaitStep[] {
  const rng = mulberry32(seed)
  const out: GaitStep[] = []
  let t = 0
  let i = 0
  while (t < 5) {
    const a = 1.6 + rng() * 0.7
    out.push({ t: +t.toFixed(2), val: 0, marked: true })
    // a soft pulse around each step
    for (let k = 1; k <= 8; k++) {
      const dt = (k / 8) * meanInterval
      const v = a * Math.exp(-Math.pow((k - 8) / 2.2, 2))
      if (t + dt < 5) out.push({ t: +(t + dt).toFixed(2), val: +v.toFixed(3), marked: false })
    }
    t += meanInterval * (1 + (rng() - 0.5) * 0.09)
    i++
  }
  return out.filter((s) => s.t <= 5).sort((a, b) => a.t - b.t)
}

export const gaitSteps = gaitTiming(0.98)

export function strideSeries(mean: number, cv: number, n = 9, seed = 3): Array<{ i: number; s: number }> {
  const rng = mulberry32(seed)
  const sd = (cv / 100) * mean
  return Array.from({ length: n }, (_, i) => ({
    i: i + 1,
    s: +Math.max(0.35, mean + (rng() - 0.5) * 2 * sd + Math.sin(i / 2) * sd * 0.3).toFixed(3),
  }))
}

export const strideVals = strideSeries(0.98, 4.6)

const tempSeries = (() => {
  const rng = mulberry32(9)
  const out: Array<{ t: string; v: number }> = []
  let v = 33.55
  for (let h = 0; h <= 12; h++) {
    v += (h % 2 === 0 ? 0.05 : -0.04) + (rng() - 0.5) * 0.02
    out.push({
      t: `${String(h).padStart(2, '0')}:00`,
      v: +clamp(v, 33.1, 34.1).toFixed(2),
    })
  }
  return out
})()

export const temperatureSeries = tempSeries

export interface DashboardMetric {
  label: string
  value: string
  unit: string
  sub: string
  hint: string
}

export const dashboardMetrics: DashboardMetric[] = [
  { label: 'Movement Intensity', value: '37.12', unit: 'g·s', sub: '0–100 windowed scale', hint: 'Demonstration value' },
  { label: 'Dominant Frequency', value: '1.84', unit: 'Hz', sub: 'Stride fundamental', hint: 'Demonstration value' },
  { label: 'Tremor Band Power', value: '7.8', unit: '%', sub: '4–6 Hz share', hint: 'Demonstration value' },
  { label: 'Freeze Index', value: '0.214', unit: 'ratio', sub: '3–8 / 0.5–3 Hz', hint: 'Demonstration value' },
  { label: 'Mean Stride Time', value: '0.98', unit: 's', sub: 'Gait cycle interval', hint: 'Demonstration value' },
  { label: 'Stride CV', value: '4.6', unit: '%', sub: 'Timing variability', hint: 'Demonstration value' },
  { label: 'Cadence', value: '61', unit: 'steps/min', sub: 'Stepping rate', hint: 'Demonstration value' },
  { label: 'Step Regularity', value: '0.87', unit: 'score', sub: 'Autocorrelation', hint: 'Demonstration value' },
  { label: 'Temperature', value: '33.7', unit: '°C', sub: 'Auxiliary probe', hint: 'Demo — not a validated biomarker' },
]

export const scenarios = {
  normal: {
    ...accelScenarioMeta('normal'),
    id: 'normal',
    label: 'NORMAL WALKING',
    desc: 'Rhythmic, consistent gait — steady cadence, low stride variability, concentrated spectrum.',
    chip: 'bg-mint text-forest',
    barsBg: 'bg-mint',
    accent: '#9cd9bc',
    cadence: 61,
    strideCV: 4.6,
    freezeIndex: 0.214,
    stepRegularity: 0.87,
    tremorBand: 7.8,
    dominantFreq: 1.84,
    wave: makeWave(11, [
      { f: 1.84, a: 1.0 },
      { f: 3.68, a: 0.3 },
      { f: 0.5, a: 0.12 },
    ], 0.05).map(mapTime),
    fft: makeFFT(5, [
      [1.84, 1.0, 0.09],
      [3.68, 0.32, 0.14],
      [5.0, 0.09, 0.18],
    ], 0.05),
  },
  irregular: {
    ...accelScenarioMeta('irregular'),
    id: 'irregular',
    label: 'IRREGULAR GAIT',
    desc: 'Variable step timing — cadence drops, stride CV rises, spectrum broadens.',
    chip: 'bg-gold/20 text-ink',
    barsBg: 'bg-gold',
    accent: '#d9b45a',
    cadence: 54,
    strideCV: 14.2,
    freezeIndex: 0.35,
    stepRegularity: 0.61,
    tremorBand: 9.1,
    dominantFreq: 1.62,
    wave: makeWave(22, [
      { f: 1.62, a: 0.85 },
      { f: 3.2, a: 0.4 },
      { f: 2.35, a: 0.5 },
      { f: 0.45, a: 0.18 },
    ], 0.08).map(mapTime),
    fft: makeFFT(6, [
      [1.62, 0.85, 0.22],
      [2.35, 0.5, 0.26],
      [3.2, 0.4, 0.2],
      [5.0, 0.12, 0.2],
    ], 0.09),
  },
  tremor: {
    ...accelScenarioMeta('tremor'),
    id: 'tremor',
    label: 'TREMOR-DOMINANT',
    desc: 'Strong 5 Hz oscillation dominates — tremor band power climbs sharply.',
    chip: 'bg-ember/20 text-ink',
    barsBg: 'bg-ember',
    accent: '#e0704f',
    cadence: 58,
    strideCV: 8.4,
    freezeIndex: 0.48,
    stepRegularity: 0.72,
    tremorBand: 31.5,
    dominantFreq: 5.12,
    wave: makeWave(30, [
      { f: 1.4, a: 0.5 },
      { f: 2.8, a: 0.2 },
      { f: 5.12, a: 0.2 },
    ], 1.15).map(mapTime),
    fft: makeFFT(7, [
      [1.4, 0.5, 0.16],
      [2.8, 0.2, 0.2],
      [5.12, 1.0, 0.12],
      [7.0, 0.18, 0.18],
    ], 0.06),
  },
  freezing: {
    ...accelScenarioMeta('freezing'),
    id: 'freezing',
    label: 'POSSIBLE FREEZING PATTERN',
    desc: 'Hesitant, irregular stepping with band-power shift toward the higher-frequency band.',
    chip: 'bg-forest text-mint',
    barsBg: 'bg-forest-3',
    accent: '#28594a',
    cadence: 38,
    strideCV: 22.6,
    freezeIndex: 1.42,
    stepRegularity: 0.44,
    tremorBand: 24.8,
    dominantFreq: 1.25,
    wave: makeWave(40, [
      { f: 1.25, a: 0.55 },
      { f: 2.5, a: 0.9 },
      { f: 1.9, a: 0.45 },
      { f: 6.2, a: 0.6 },
    ], 0.3).map(mapTime),
    fft: makeFFT(8, [
      [1.25, 0.55, 0.2],
      [1.9, 0.45, 0.2],
      [2.5, 0.9, 0.24],
      [4.6, 0.5, 0.16],
      [6.2, 0.6, 0.2],
      [8.1, 0.3, 0.2],
    ], 0.12),
  },
} as Record<string, Scenario>

function accelScenarioMeta(_id: string) {
  return { _id }
}

export const scenarioIds = ['normal', 'irregular', 'tremor', 'freezing'] as const

// companion interface card values
export interface CompanionCard {
  label: string
  value: string
  sub: string
}

export const companionCards: CompanionCard[] = [
  { label: 'Best Gait', value: '98%', sub: 'Step regularity score' },
  { label: 'Stride CV', value: '4.6%', sub: 'Timing variability' },
  { label: 'Tremor Band', value: '7.8%', sub: '4–6 Hz share' },
  { label: 'Freeze Index', value: '0.214', sub: 'Band-power ratio' },
  { label: 'Temperature', value: '33.7 °C', sub: 'Auxiliary probe' },
  { label: 'Movement Spectrum', value: 'Balanced', sub: 'Energy distribution' },
  { label: 'Gait Regularity', value: '0.87', sub: 'Autocorrelation' },
]

export interface ChatEntry {
  q: string
  a: string
}

export const chatPreset: ChatEntry[] = [
  {
    q: 'Why is Parkin Pulse worn on the ankle?',
    a: 'The ankle sits directly in the movement chain of gait — it sees walking rhythm, step timing, stride variability and lower-limb movement intensity every time you take a step. That proximity lets the IMU capture gait dynamics that wrist or chest placements would blur.',
  },
  {
    q: 'What does the MPU6050 measure?',
    a: 'It is a 6-axis IMU: a 3-axis accelerometer (linear acceleration along X, Y, Z) plus a 3-axis gyroscope (rotation around X, Y, Z). From those raw signals, the device reconstructs movement magnitude, orientation changes and oscillation patterns.',
  },
  {
    q: 'What is the Freeze Index?',
    a: 'A frequency-domain ratio from freezing-of-gait research: the power in the ~3–8 Hz band divided by the power in the ~0.5–3 Hz band. A rising ratio suggests a shift toward higher-frequency components — but it does NOT, on its own, detect clinical freezing.',
  },
  {
    q: 'Why use FFT?',
    a: 'Movement lives in frequencies as well as amplitudes. A Fourier Transform lets the device ask “how much motion is happening at 1.8 Hz (walking) vs 5 Hz (tremor)?” — turning noisy raw signals into clean, interpretable spectral features.',
  },
  {
    q: 'What are the 16 features?',
    a: 'Eight time-domain descriptors (magnitude, variability, RMS, peak-to-peak, SMA, zero-crossings, skew, kurtosis), four frequency-domain descriptors (dominant frequency, tremor-band ratio, freeze index, spectral entropy), and four gait descriptors (stride time, stride CV%, cadence, step regularity).',
  },
  {
    q: 'Can Parkin Pulse diagnose Parkinson’s?',
    a: 'No. Parkin Pulse is a movement-monitoring and analysis prototype, not a clinically validated diagnostic device.',
  },
  {
    q: 'How does raw sensor data become useful?',
    a: 'Raw IMU → 5-second windows → signal processing → FFT + gait analysis → 16 features → movement interpretation. Every feature is derived from the same sensor stream; the system reasons about the combination, not any single number.',
  },
  {
    q: 'Is the temperature a biomarker?',
    a: 'No. The temperature probe is an auxiliary measurement on the prototype. It is not presented as a validated Parkinson’s biomarker.',
  },
]