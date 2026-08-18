import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { chartAxis } from './ui'
import type { VizKind } from '../data/features'

const wave = Array.from({ length: 60 }, (_, i) => ({
  i,
  v: Math.sin(i * 0.42) * 0.8 + Math.sin(i * 0.11) * 0.4 + Math.sin(i * 0.9) * 0.15,
}))

const bars = [
  { k: 'Q1', v: 62 },
  { k: 'Q2', v: 55 },
  { k: 'Q3', v: 64 },
  { k: 'Q4', v: 48 },
  { k: 'Q5', v: 59 },
]

const fft = Array.from({ length: 46 }, (_, i) => ({
  f: i * 0.3,
  p: 0.08 + 0.9 * Math.exp(-Math.pow((i * 0.3 - 1.9) / 0.35, 2)) + 0.12 * Math.exp(-Math.pow((i * 0.3 - 5) / 0.6, 2)),
}))

const conc = Array.from({ length: 40 }, (_, i) => ({
  f: i * 0.35,
  a: 1.0 * Math.exp(-Math.pow((i * 0.35 - 4) / 0.4, 2)),
  b: 0.14 + 0.05 * Math.sin(i * 0.8),
}))

const auto = Array.from({ length: 50 }, (_, i) => ({
  i,
  v: Math.exp(-Math.pow((i - 12.5) / 6, 2)) * 0.95 + (i === 0 ? 0 : Math.exp(-Math.pow((i - 37) / 6, 2)) * 0.8),
}))

const pulses = Array.from({ length: 40 }, (_, i) => ({
  i,
  v: Math.abs(Math.sin(i * 0.55)) * (1 + (i % 6 === 0 ? 0.6 : 0)),
}))

export default function MiniViz({ kind, dark = false }: { kind: VizKind; dark?: boolean }) {
  const grid = dark ? 'rgba(191,233,212,0.12)' : 'rgba(11,20,16,0.08)'
  const line = dark ? '#bfe9d4' : '#28594a'
  const gridAxis = { stroke: grid, fontSize: 9, fontFamily: 'JetBrains Mono' }

  return (
    <ResponsiveContainer width="100%" height={120}>
      {(kind === 'entropy' && (
        <LineChart data={conc} margin={{ top: 6, right: 6, left: 6, bottom: 2 }}>
          <CartesianGrid stroke={grid} vertical={false} />
          <XAxis dataKey="f" hide />
          <YAxis hide />
          <Line type="monotone" dataKey="a" stroke={dark ? '#e0704f' : '#e0704f'} strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="b" stroke={dark ? '#9cd9bc' : '#16382c'} strokeWidth={1.4} dot={false} strokeDasharray="3 3" />
        </LineChart>
      )) ||
        (kind === 'fft' && (
          <AreaChart data={fft} margin={{ top: 6, right: 6, left: 6, bottom: 2 }}>
            <defs>
              <linearGradient id={`fft${dark ? 'd' : ''}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={dark ? '#bfe9d4' : '#28594a'} stopOpacity={0.85} />
                <stop offset="100%" stopColor={dark ? '#bfe9d4' : '#28594a'} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={grid} vertical={false} />
            <XAxis dataKey="f" hide />
            <YAxis hide />
            <Area type="monotone" dataKey="p" stroke={dark ? '#bfe9d4' : '#28594a'} strokeWidth={2} fill={`url(#fft${dark ? 'd' : ''})`} />
          </AreaChart>
        )) ||
        (kind === 'autocorr' && (
          <LineChart data={auto} margin={{ top: 6, right: 6, left: 6, bottom: 2 }}>
            <CartesianGrid stroke={grid} vertical={false} />
            <XAxis dataKey="i" hide />
            <YAxis hide />
            <Line type="monotone" dataKey="v" stroke={line} strokeWidth={2} dot={false} />
          </LineChart>
        )) ||
        (kind === 'pulse' && (
          <BarChart data={pulses} margin={{ top: 6, right: 6, left: 6, bottom: 2 }}>
            <CartesianGrid stroke={grid} vertical={false} horizontal={false} />
            <XAxis dataKey="i" hide />
            <YAxis hide />
            <Bar dataKey="v" fill={dark ? '#9cd9bc' : '#1e4a3a'} radius={[2, 2, 0, 0]} />
          </BarChart>
        )) ||
        (kind === 'bars' && (
          <BarChart data={bars} margin={{ top: 6, right: 6, left: 6, bottom: 2 }}>
            <CartesianGrid stroke={grid} vertical={false} />
            <XAxis dataKey="k" tick={gridAxis} tickLine={false} axisLine={false} fontSize={8} />
            <YAxis hide />
            <Bar dataKey="v" fill={dark ? '#9cd9bc' : '#1e4a3a'} radius={[3, 3, 0, 0]} />
          </BarChart>
        )) || (
          <AreaChart data={wave} margin={{ top: 6, right: 6, left: 6, bottom: 2 }}>
            <defs>
              <linearGradient id={`wv${dark ? 'd' : ''}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e0704f" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#e0704f" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={grid} vertical={false} />
            <XAxis dataKey="i" hide />
            <YAxis hide />
            <Area type="monotone" dataKey="v" stroke="#e0704f" strokeWidth={2} fill={`url(#wv${dark ? 'd' : ''})`} />
          </AreaChart>
        )}
    </ResponsiveContainer>
  )
}

// fallback light axes if needed
export const _ = chartAxis