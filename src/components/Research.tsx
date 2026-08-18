import { BookMarked, FileQuestion } from 'lucide-react'
import { SectionShell, SectionTag, H2, Reveal } from './ui'

const refs = [
  'Research reference 1 — to be inserted',
  'Research reference 2 — to be inserted',
  'Research reference 3 — to be inserted',
  'Research reference 4 — to be inserted',
]

export default function Research() {
  return (
    <SectionShell id="research" tone="light">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8">
        <Reveal>
          <SectionTag>17 — scientific grounding</SectionTag>
          <H2 className="mt-5 text-forest">
            Research <span className="sketch-underline">basis</span>
          </H2>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft leading-relaxed">
            The engineering choices here — ankle placement, frequency-band reasoning, freeze-index style
            ratios — follow the direction of published movement-analysis research.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal delay={80}>
            <div className="sketch-card bg-paper p-7">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-forest-3">
                <BookMarked size={15} className="text-ember" /> Reference list
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
                Citations are being finalised with the project team. No references have been fabricated —
                verified sources will be added here before print/final submission.
              </p>
              <div className="mt-5 space-y-3">
                {refs.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border border-dashed border-forest/25 px-4 py-3"
                  >
                    <span className="font-mono text-[11px] text-ember-2">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-mono text-[12px] text-ink-soft">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="rounded-3xl border-2 border-dashed border-forest/25 bg-cream/70 p-7 h-full">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-forest-3">
                <FileQuestion size={15} className="text-ember" /> Citation policy
              </div>
              <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-ink-soft">
                <li>No fabricated DOIs, journals or authors.</li>
                <li>No invented accuracy figures or patient counts.</li>
                <li>
                  References marked <em>“to be inserted”</em> are explicit placeholders awaiting verified
                  sources.
                </li>
                <li>Demonstration numbers on this site are illustrative — never clinical measurements.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  )
}