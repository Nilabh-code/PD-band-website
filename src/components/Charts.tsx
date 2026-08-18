import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { TooltipShell } from './ui'
import type { WavePoint, FFTBin, GaitStep } from '../data/demo'

const gridDark = 'rgba(191,233,212,0.10)'
const gridLight = 'rgba(11,20,16,0.08)'

function axisProps(dark: boolean) {
  return {
    stroke: dark ? 'rgba(191,233,212,0.3)' : 'rgba(11,20,16,0.25)',
    fontSize: 11,
    fontFamily: 'JetBrains Mono',
    tickLine: false as const,
    axisLine: false as const,
  }
}

const tip = (p: any) => {
  const { active, payload, label } = p
  if (!active || !payload?.length) return null
  return (
    <TooltipShell
      label={label != null ? String(label) : undefined}
      value={payload[0].value}
    />
  )
}

export function AccelChart({
  data,
  dark = true,
  height = 220,
}: {
  data: WavePoint[]
  dark?: boolean
  height?: number
}) {
  const a = axisProps(dark)
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid stroke={dark ? gridDark : gridLight} vertical={false} />
        <XAxis dataKey="t" tick={a} domain={[0, 5]} />
        <YAxis tick={a} />
        <Tooltip content={tip} />
        <Line type="monotone" dataKey="ax" name="ax" stroke="#e0704f" strokeWidth={1.8} dot={false} />
        <Line type="monotone" dataKey="ay" name="ay" stroke="#9cd9bc" strokeWidth={1.8} dot={false} />
        <Line type="monotone" dataKey="az" name="az" stroke="#d9b45a" strokeWidth={1.8} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function GyroChart({
  data,
  dark = true,
  height = 200,
}: {
  data: WavePoint[]
  dark?: boolean
  height?: number
}) {
  const a = axisProps(dark)
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid stroke={dark ? gridDark : gridLight} vertical={false} />
        <XAxis dataKey="t" tick={a} />
        <YAxis tick={a} />
        <Tooltip content={tip} />
        <Line type="monotone" dataKey="gx" name="rot X" stroke="#e0704f" strokeWidth={1.8} dot={false} />
        <Line
          type="monotone"
          dataKey="gy"
          name="rot Y"
          stroke="#9cd9bc"
          strokeWidth={1.6}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="gz"
          name="rot Z"
          stroke="#d9b45a"
          strokeWidth={1.6}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function FFTChart({
  data,
  dark = true,
  height = 230,
  highlightPeak = 1.84,
  hint,
}: {
  data: FFTBin[]
  dark?: boolean
  height?: number
  highlightPeak?: number
  hint?: string
}) {
  const a = axisProps(dark)
  const fillId = `fft-fill-${dark ? 'd' : 'l'}`
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={dark ? '#9cd9bc' : '#28594a'} stopOpacity={0.9} />
            <stop offset="100%" stopColor={dark ? '#9cd9bc' : '#28594a'} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={dark ? gridDark : gridLight} vertical={false} />
        <XAxis dataKey="f" tick={a} label={{
          value: 'frequency (Hz)',
          position: 'insideBottom',
          offset: -2,
          fill: dark ? 'rgba(191,233,212,0.5)' : 'rgba(11,20,16,0.4)',
          fontSize: 10,
          fontFamily: 'JetBrains Mono',
        }} />
        <YAxis tick={a} />
        <Tooltip content={tip} />
        <ReferenceArea x1={0.5} x2={3} fill={dark ? '#9cd9bc' : '#28594a'} fillOpacity={0.08} />
        <ReferenceArea x1={4} x2={6} fill="#e0704f" fillOpacity={0.16} />
        <ReferenceArea x1={3} x2={4} fill="#d9b45a" fillOpacity={0.05} />
        <Area
          type="monotone"
          dataKey="p"
          stroke={dark ? '#bfe9d4' : '#28594a'}
          strokeWidth={2}
          fill={`url(#${fillId})`}
          dot={false}
        />
        {hint && (
          <text x={dark ? 26 : 26} y={20} fill={dark ? 'rgba(191,233,212,0.7)' : 'rgba(11,20,16,0.6)'} fontSize={10} fontFamily="JetBrains Mono">
            {hint}
          </text>
        )}
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function gaitChartData(steps: GaitStep[], baseline: number): GaitStep[] {
  return steps.map((s) => ({ ...s, baseline }))
}

export function GaitChart({
  data,
  dark = true,
  height = 180,
  baseline = 0,
}: {
  data: GaitStep[]
  dark?: boolean
  height?: number
  baseline?: number
}) {
  const a = axisProps(dark)
  const row = gaitChartData(data, baseline)
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={row} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid stroke={dark ? gridDark : gridLight} vertical={false} />
        <XAxis dataKey="t" tick={a} />
        <YAxis tick={a} domain={[0, 2.6]} />
        <Tooltip content={tip} cursor={{ stroke: dark ? '#e0704f' : '#e0704f', strokeDasharray: '3 3' }} />
        <Line type="monotone" dataKey="val" stroke={dark ? '#e0704f' : '#e0704f'} strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="baseline" stroke={dark ? '#9cd9bc' : '#28594a'} strokeWidth={1} dot={false} strokeDasharray="4 5" opacity={dark ? 0.8 : 0.6} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function StrideChart({
  data,
  dark = true,
  height = 180,
  color = '#e0704f',
}: {
  data: Array<{ i: number; s: number }>
  dark?: boolean
  height?: number
  color?: string
}) {
  const a = axisProps(dark)
  const mean = data.reduce((m, d) => m + d.s, 0) / data.length
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid stroke={dark ? gridDark : gridLight} vertical={false} />
        <XAxis dataKey="i" tick={a} />
        <YAxis tick={a} unit=" s" />
        <Tooltip content={tip} cursor={{ fill: dark ? 'rgba(156,217,188,0.06)' : 'rgba(11,20,16,0.04)' }} />
        <Bar dataKey="s" name="stride" radius={[4, 4, 0, 0]}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.s > mean * 1.05 || d.s < mean * 0.95 ? color : dark ? '#9cd9bc' : '#28594a'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function TempChart({
  data,
  dark = true,
  height = 180,
}: {
  data: Array<{ t: string; v: number }>
  dark?: boolean
  height?: number
}) {
  const a = axisProps(dark)
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="tmpg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0704f" stopOpacity={0.55} />
            <stop offset="100%" stopColor="#e0704f" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={dark ? gridDark : gridLight} vertical={false} />
        <XAxis dataKey="t" tick={a} />
        <YAxis tick={a} domain={['dataMin - 0.1', 'dataMax + 0.1']} unit="°C" />
        <Tooltip content={tip} />
        <Area type="monotone" dataKey="v" stroke="#e0704f" strokeWidth={2} fill="url(#tmpg)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function SpectrumCombo({ data, dark = true }: { data: FFTBin[]; dark?: boolean }) {
  const a = axisProps(dark)
  const fillId = `spc-${dark ? 'd' : 'l'}`
  return (
    <ResponsiveContainer width="100%" height={160}>
      <ComposedChart data={data} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={dark ? '#9cd9bc' : '#28594a'} stopOpacity={0.85} />
            <stop offset="100%" stopColor={dark ? '#9cd9bc' : '#28594a'} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={dark ? gridDark : gridLight} vertical={false} />
        <XAxis dataKey="f" tick={a} />
        <YAxis tick={a} hide />
        <Tooltip content={tip} />
        <Area type="monotone" dataKey="p" fill={`url(#${fillId})`} stroke={dark ? '#bfe9d4' : '#28594a'} strokeWidth={1.6} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}