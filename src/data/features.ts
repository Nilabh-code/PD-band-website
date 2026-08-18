export type FeatureDomain = 'time' | 'frequency' | 'gait'

export type VizKind =
  | 'wave'
  | 'bars'
  | 'fft'
  | 'entropy'
  | 'autocorr'
  | 'pulse'

export interface ParkinFeature {
  num: string
  title: string
  domain: FeatureDomain
  short: string
  definition: string
  formula?: string
  measures: string
  why: string
  viz: VizKind
  domainLabel: string
}

export const featureDomains = {
  time: { label: 'TIME DOMAIN', color: 'text-ember', bar: 'bg-ember' },
  frequency: { label: 'FREQUENCY DOMAIN', color: 'text-forest-3', bar: 'bg-forest-3' },
  gait: { label: 'GAIT FEATURES', color: 'text-ember-2', bar: 'bg-ember-2' },
} as const

export const features: ParkinFeature[] = [
  {
    num: '01',
    title: 'Mean Acceleration Magnitude',
    domain: 'time',
    short: 'Resultant acceleration describing average movement magnitude.',
    definition:
      'The resultant acceleration at each instant — the vector length of the three accelerometer axes taken together.',
    formula: '|a| = √(ax² + ay² + az²)',
    measures: 'How much overall bodily acceleration is happening, regardless of direction.',
    why: 'A compact single-channel descriptor of overall movement intensity from the three raw axes.',
    viz: 'wave',
    domainLabel: 'TIME DOMAIN',
  },
  {
    num: '02',
    title: 'Acceleration Standard Deviation',
    domain: 'time',
    short: 'How much acceleration varies across the window.',
    definition: 'The standard deviation of the acceleration signal about its own mean.',
    formula: 'σ = √( Σ(aₙ − ā)² / N )',
    measures: 'Amplitude spread / variability of movement across the window.',
    why: 'Quiet movement produces low spread; larger, more changeable motion produces higher spread.',
    viz: 'bars',
    domainLabel: 'TIME DOMAIN',
  },
  {
    num: '03',
    title: 'Root Mean Square (RMS)',
    domain: 'time',
    short: 'Signal energy / magnitude descriptor.',
    definition:
      'The RMS value is a classic descriptor of signal magnitude that weights larger deviations.',
    formula: 'RMS = √( (a₁² + a₂² + … + aₙ²) / N )',
    measures: 'Effective signal magnitude / energy-like content of the window.',
    why: 'Robust, widely used amplitude descriptor resistant to single-sample outliers.',
    viz: 'wave',
    domainLabel: 'TIME DOMAIN',
  },
  {
    num: '04',
    title: 'Peak-to-Peak Amplitude',
    domain: 'time',
    short: 'Maximum value minus minimum value.',
    definition: 'Full swing of the signal within the window.',
    formula: 'P2P = max(a) − min(a)',
    measures: 'Dynamic range of the movement within the analysed window.',
    why: 'Sensitive to large transient swings and overall dynamic extent of motion.',
    viz: 'bars',
    domainLabel: 'TIME DOMAIN',
  },
  {
    num: '05',
    title: 'Signal Magnitude Area (SMA)',
    domain: 'time',
    short: 'Aggregated absolute acceleration across all axes.',
    definition:
      'The summed absolute values of the three axes, integrated over time — a standard activity metric.',
    formula: 'SMA = Σ( |ax| + |ay| + |az| )',
    measures: 'Total accumulated motion over the window.',
    why: 'Obeys the triangle-inequality / Cal-oric style active-energy descriptor used in activity recognition.',
    viz: 'bars',
    domainLabel: 'TIME DOMAIN',
  },
  {
    num: '06',
    title: 'Zero-Crossing Rate',
    domain: 'time',
    short: 'How often the signal crosses its reference/mean level.',
    definition: 'Number of times the signal passes through its mean/reference level per unit time.',
    formula: 'ZCR = crossings per second',
    measures: 'Dominant oscillation frequency in the time domain, in a light-weight way.',
    why: 'A cheap time-domain proxy for spectral content used to differentiate brisk vs. slow movement cadences.',
    viz: 'pulse',
    domainLabel: 'TIME DOMAIN',
  },
  {
    num: '07',
    title: 'Skewness',
    domain: 'time',
    short: 'Statistical measure of distribution asymmetry.',
    definition:
      'Third standardized moment — tells whether acceleration magnitudes lean left or right of the mean.',
    formula: 'Skew = m₃ / σ³',
    measures: 'Asymmetry of the movement-magnitude distribution.',
    why: 'Captures movement patterns with distinct asymmetry (e.g. impulsive vs. sustained loading).',
    viz: 'bars',
    domainLabel: 'TIME DOMAIN',
  },
  {
    num: '08',
    title: 'Kurtosis',
    domain: 'time',
    short: 'Peakedness / heavy tails of the distribution.',
    definition:
      'Fourth standardized moment describing how peaked or heavy-tailed the signal distribution is.',
    formula: 'Kurt = m₄ / σ⁴',
    measures: 'Whether the signal is dominated by regular activity or punctuated by occasional spikes.',
    why: 'Heavy-tailed distributions suggest intermittent, bursty movement events.',
    viz: 'bars',
    domainLabel: 'TIME DOMAIN',
  },
  {
    num: '09',
    title: 'Dominant Frequency',
    domain: 'frequency',
    short: 'Strongest frequency component in the spectrum.',
    definition:
      'The bin with the highest spectral power after FFT — often reflects the stride/cadence fundamental.',
    formula: 'f_peak = argmax |FFT(a)|',
    measures: 'The repetition rate of the dominant movement rhythm.',
    why: 'Lets the system reason about cyclic motion (gait cycles, oscillations) rather than raw amplitude.',
    viz: 'fft',
    domainLabel: 'FREQUENCY DOMAIN',
  },
  {
    num: '10',
    title: 'Tremor Band Power Ratio',
    domain: 'frequency',
    short: 'Spectral power within ~4–6 Hz relative to total power.',
    definition:
      'Fraction of total spectral power contained in the 4–6 Hz band — a band commonly associated with tremors in research.',
    formula: 'P_tremor / P_total   (4–6 Hz ÷ total)',
    measures: 'Relative concentration of spectral energy in the tremor-associated band.',
    why: 'A frequency-ratio descriptor used in tremor-related movement research — not a diagnostic marker on its own.',
    viz: 'fft',
    domainLabel: 'FREQUENCY DOMAIN',
  },
  {
    num: '11',
    title: 'Freeze Index',
    domain: 'frequency',
    short: '3–8 Hz power ÷ 0.5–3 Hz power.',
    definition:
      'A frequency-domain ratio used in freezing-of-gait research: high-frequency locomotor band power relative to the low-frequency band.',
    formula: 'F.I. = P(3–8 Hz) / P(0.5–3 Hz)',
    measures: 'Relative power shift between higher- and lower-frequency movement bands.',
    why: 'A widely referenced exploratory ratio in FOG literature — it does NOT independently detect clinical freezing.',
    viz: 'fft',
    domainLabel: 'FREQUENCY DOMAIN',
  },
  {
    num: '12',
    title: 'Spectral Entropy',
    domain: 'frequency',
    short: 'How concentrated or diffuse spectral power is.',
    definition:
      'Shannon entropy over the normalized power spectrum — low when power concentrates in few bands, high when it spreads out.',
    formula: 'H = −Σ pᵢ · log(pᵢ)',
    measures: 'Order vs. disorder of rhythmic content.',
    why: 'Regular rhythmic gait produces a concentrated spectrum (low entropy); irregular motion spreads energy out.',
    viz: 'entropy',
    domainLabel: 'FREQUENCY DOMAIN',
  },
  {
    num: '13',
    title: 'Mean Stride Time',
    domain: 'gait',
    short: 'Average time between detected gait cycles/steps.',
    definition:
      'Mean time interval between successive detected gait events extracted from the ankle signal using peak/trough detection.',
    formula: 'T_stride = mean(peaks_i − peaks_{i−1})',
    measures: 'Tempo of the stepping rhythm.',
    why: 'A core, easily interpretable Gait descriptor and the basis for cadence estimation.',
    viz: 'pulse',
    domainLabel: 'GAIT FEATURES',
  },
  {
    num: '14',
    title: 'Stride-Time CV%',
    domain: 'gait',
    short: 'Gait timing variability.',
    definition:
      'Coefficient of variation of inter-stride intervals — how consistent step timing is, gait-cycle to gait-cycle.',
    formula: 'CV% = σ / mean × 100',
    measures: 'Variability of gait timing.',
    why: 'Higher stride variability is a widely studied indicator of gait instability in movement research.',
    viz: 'bars',
    domainLabel: 'GAIT FEATURES',
  },
  {
    num: '15',
    title: 'Cadence',
    domain: 'gait',
    short: 'Steps per minute.',
    definition: 'Estimated stepping rate derived from stride time.',
    formula: 'Cadence = 60 / T_stride  (steps/min)',
    measures: 'Walking speed in rhythmic terms.',
    why: 'An instantly interpretable outcome judges and clinicians can relate to walking performance.',
    viz: 'pulse',
    domainLabel: 'GAIT FEATURES',
  },
  {
    num: '16',
    title: 'Step Regularity',
    domain: 'gait',
    short: 'How repetitive / consistent gait cycles are.',
    definition:
      'Autocorrelation-based similarity of successive stride cycles — how closely each new step resembles the last.',
    formula: 'max normalized autocorr over stride lag',
    measures: 'Repetitiveness of the stride pattern.',
    why: 'A strength-of-pattern metric that degrades with irregular, hesitating, or shuffling gait.',
    viz: 'autocorr',
    domainLabel: 'GAIT FEATURES',
  },
]

export const featureDomainCounts = {
  time: features.filter((f) => f.domain === 'time').length,
  frequency: features.filter((f) => f.domain === 'frequency').length,
  gait: features.filter((f) => f.domain === 'gait').length,
}