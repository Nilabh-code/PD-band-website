import { useState } from 'react'
import { Send, Languages, Bot, ChevronDown, Radio } from 'lucide-react'
import { SectionShell, SectionTag, H2, Reveal } from './ui'
import { chatPreset } from '../data/demo'

export default function ChatAssist() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <SectionShell tone="light">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SectionTag>12 — conversational layer</SectionTag>
            <H2 className="mt-5 text-forest">
              PARKIN PULSE <span className="sketch-underline">ASSIST</span>
            </H2>
            <p className="mt-5 text-lg text-ink-soft leading-relaxed">
              A static mockup of the intended in-app assistant — plain-language answers about how the
              prototype works, covering the same ground a judge might ask.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-forest/15 bg-white/70 p-4">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-forest text-mint">
                  <Languages size={17} />
                </span>
                <div>
                  <div className="font-display font-semibold text-forest">13-language conversational interface</div>
                  <div className="font-mono text-[11px] text-ink-soft">
                    Planned — conversational layer accompanying the monitoring prototype
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-forest/15 bg-white/70 p-4">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-ember text-paper">
                  <Bot size={17} />
                </span>
                <div>
                  <div className="font-display font-semibold text-forest">Preloaded demonstration Q&A</div>
                  <div className="font-mono text-[11px] text-ink-soft">
                    Static mockup — no live conversational engine
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="rounded-[32px] border border-forest/15 bg-ink shadow-2xl overflow-hidden">
              {/* chat header */}
              <div className="flex items-center justify-between bg-forest px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="relative grid h-10 w-10 place-items-center rounded-full bg-mint text-forest">
                    <Bot size={20} />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-forest bg-ember animate-pulse-dot" />
                  </span>
                  <div>
                    <div className="font-display font-semibold text-mint leading-tight">Parkin Pulse Assist</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-mint-soft/70">
                      demonstration assistant · offline
                    </div>
                  </div>
                </div>
                <Languages size={17} className="text-mint" />
              </div>

              {/* chat body */}
              <div className="max-h-[520px] overflow-y-auto px-5 py-5 space-y-3">
                <div className="rounded-2xl rounded-tl-sm bg-mint/15 px-4 py-2.5 max-w-[85%]">
                  <p className="text-[13px] text-mint-soft leading-relaxed">
                    Hi — I can explain how the Parkin Pulse movement-monitoring prototype works. Ask me
                    anything, or pick one of the questions below.
                  </p>
                </div>

                {chatPreset.map((c, i) => (
                  <div key={c.q} className="space-y-1.5">
                    <div className="ml-auto w-fit rounded-2xl rounded-tr-sm bg-forest px-4 py-2.5 max-w-[85%]">
                      <p className="text-[13px] text-mint font-medium">{c.q}</p>
                    </div>
                    <div className="w-fit rounded-2xl rounded-tl-sm bg-ink/60 border border-mint/15 px-4 py-2.5 max-w-[90%]">
                      <p className="text-[12.5px] text-mint-soft/90 leading-relaxed">{c.a}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* input mock */}
              <div className="border-t border-mint/15 bg-ink/80 px-5 py-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-mint-soft/50">
                    Planned 13-language conversational interface · prototype mockup
                  </p>
                  <span className="inline-flex items-center gap-2 rounded-full bg-mint/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-mint">
                    <Radio size={11} className="animate-pulse-dot" /> not connected
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-2xl border border-mint/20 bg-ink px-4 py-3">
                  <span className="flex-1 font-mono text-[12px] text-mint-soft/60">
                    Ask about the prototype…
                  </span>
                  <Send size={15} className="text-ember" />
                </div>
              </div>
            </div>

            {/* quick question chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {chatPreset.slice(0, 6).map((c, i) => (
                <button
                  key={c.q}
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-paper px-3 py-1.5 font-mono text-[10.5px] text-ink-soft transition hover:border-ember hover:text-ember"
                >
                  <ChevronDown size={11} className={openIdx === i ? 'rotate-180' : ''} />
                  {c.q.length > 40 ? c.q.slice(0, 38) + '…' : c.q}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  )
}