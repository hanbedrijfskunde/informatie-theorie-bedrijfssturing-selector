import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Info, Sparkles, Database, FileText, Network, AlertTriangle } from 'lucide-react';

export default function ShannonIntro() {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  const getExplanation = (element: string) => {
    switch (element) {
      case 'bron':
        return {
          title: "Informatiebron (Zender)",
          theory: "Het beginpunt van elk bericht. Shannon stelt dat de bron kiest uit een pool van mogelijke berichten. Hoe groter deze pool en hoe onvoorspelbaarder de keuze, hoe hoger de initiële entropy.",
          business: "Strategisch Management & Bedrijfsdoelen (bijv. 'We willen een nieuwe maaltijdbezorgdienst lanceren'). Duidelijke besluitvorming begint hier."
        };
      case 'encoder':
        return {
          title: "Zender / Encoder",
          theory: "Zet het bericht om in signalen die verzonden kunnen worden over het kanaal (bijv. geluidsgolven omzetten in elektrische pulsen, of tekst in binaire codes).",
          business: "Informatiemanagement & Codering (Edstack 1). Vertalen van bedrijfsprocessen naar data-architectuur en platform-protocollen (standaarden stellen)."
        };
      case 'kanaal':
        return {
          title: "Communicatiekanaal met Ruis",
          theory: "Het medium waardoor signalen reizen. Ruis (storing) vervormt het signaal tijdens de reis, waardoor fouten kunnen ontstaan bij de ontvangst.",
          business: "De Organisatie & IT-Infrastructuur (Edstack 4). Ruis representeert hier: miscommunicatie, slechte systemen, silo's en data-inconsistenties."
        };
      case 'decoder':
        return {
          title: "Ontvanger / Decoder",
          theory: "Zet het ontvangen signaal weer om naar het oorspronkelijke bericht. Dit vereist dat de decoder dezelfde standaarden/codes gebruikt als de encoder.",
          business: "Operationele teams & Systemen (Edstack 4). Hoe goed begrijpt IT de business-vraag (Business-IT alignment) om data correct te vertalen naar acties?"
        };
      case 'bestemming':
        return {
          title: "Bestemming",
          theory: "De eindontvanger voor wie het bericht bedoeld was.",
          business: "De Eindgebruiker, Klant of Dashboard (Edstack 2 & 3). Komt de geplande verandering of de juiste sturingsinformatie onbeschadigd en bruikbaar aan?"
        };
      default:
        return null;
    }
  };

  const exp = getExplanation(hoveredElement || 'bron');

  // Each station in the Shannon chain, with its quest colour.
  const blocks = [
    { id: 'bron', n: 1, title: 'Informatiebron', sub: 'Kiest bericht uit pool van opties', tag: 'Business Doelen', icon: FileText, fill: 'bg-lime' },
    { id: 'encoder', n: 2, title: 'Encoder (Sender)', sub: 'Zet bericht om in meetbaar signaal', tag: 'E-Commerce / Standaard', icon: Network, fill: 'bg-pink' },
    { id: 'kanaal', n: 3, title: 'Ruis & Kanaal', sub: 'Transmissiemedium vol met storing', tag: 'De Organisatie & Ruis', icon: AlertTriangle, fill: 'bg-[#FF5252]' },
    { id: 'decoder', n: 4, title: 'Decoder', sub: 'Vertaalt signalen terug naar betekenis', tag: 'Business-IT Alignment', icon: Database, fill: 'bg-blue' },
    { id: 'bestemming', n: 5, title: 'Bestemming', sub: 'Eindontvanger verwerkt de boodschap', tag: 'KPI Dashboard / Klant', icon: Sparkles, fill: 'bg-violet' },
  ] as const;

  return (
    <div className="nb-card p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="nb-pill nb-pill-lime">⬗ Quest 1 · Historisch Fundament</span>
          <h2 className="text-2xl mt-2.5">Claude Shannon: de vader van de informatietijd</h2>
          <p className="text-muted text-sm mt-1.5 font-medium max-w-2xl">
            In 1948 mathematiseerde Shannon &apos;informatie&apos;. Zijn model bleek niet alleen toepasbaar op
            kabels, maar ook op hoe organisaties sturen en controleren.
          </p>
        </div>
        <div className="nb-pill nb-pill-pink self-start md:self-auto !text-[0.65rem] py-2">
          <Sparkles className="w-4 h-4" /> Hover de stations →
        </div>
      </div>

      {/* Interactive Shannon chain */}
      <div className="nb-panel-dark p-6 mb-6 overflow-x-auto">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-5 gap-3 relative z-10">
            {blocks.map((b) => {
              const Icon = b.icon;
              const active = hoveredElement === b.id;
              return (
                <div
                  key={b.id}
                  id={`shannon-block-${b.id}`}
                  onMouseEnter={() => setHoveredElement(b.id)}
                  className={`p-3 nb-box transition-all cursor-pointer text-center flex flex-col justify-between h-44 ${
                    active
                      ? `${b.fill} text-ink -translate-y-1 nb-shadow-md`
                      : 'bg-cream text-ink hover:-translate-y-0.5 hover:nb-shadow'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="nb-score text-xs">0{b.n}</span>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-sm leading-tight">{b.title}</div>
                    <div className="text-[0.62rem] text-muted font-medium mt-1 leading-snug">{b.sub}</div>
                  </div>
                  <div className={`text-[0.6rem] font-mono font-bold uppercase tracking-wide nb-box px-1.5 py-1 ${active ? 'bg-ink text-cream' : 'bg-white'}`}>
                    {b.tag}
                  </div>
                </div>
              );
            })}
          </div>

          {/* flow arrows */}
          <div className="grid grid-cols-5 gap-3 mt-2.5 px-2">
            {blocks.map((b, i) => (
              <div key={b.id} className="flex justify-center nb-score text-lime/70 text-lg">
                {i < blocks.length - 1 ? '→' : '✦'}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail card on hover */}
      {exp && (
        <motion.div
          key={hoveredElement}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-cream nb-box p-5"
        >
          <div className="md:border-r-[3px] md:border-ink md:pr-4">
            <div className="flex items-center gap-2 text-blue font-bold text-base mb-2">
              <Info className="w-5 h-5" />
              {exp.title} <span className="nb-eyebrow">· Wiskundige theorie</span>
            </div>
            <p className="text-ink/80 text-sm leading-relaxed font-medium">{exp.theory}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 font-bold text-base mb-2">
              <Sparkles className="w-5 h-5 text-pink" /> De bedrijfskundige lens
            </div>
            <p className="text-sm font-medium leading-relaxed bg-pink/15 nb-box p-3">
              {exp.business}
            </p>
          </div>
        </motion.div>
      )}

      {/* Cross-thematic summary */}
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t-[3px] border-ink">
        <div className="p-4 bg-blue/10 nb-box">
          <h3 className="text-sm mb-1.5 flex items-center gap-2">
            <span className="w-3 h-3 bg-blue nb-box" /> Wat is informatie volgens Shannon?
          </h3>
          <p className="text-xs text-ink/80 font-medium leading-relaxed">
            Informatie is <strong>reductie van onzekerheid</strong>. Hoe onvoorspelbaarder een situatie,
            hoe meer &apos;informatie&apos; nodig is om deze te verhelderen. Een KPI (Edstack 2) verlaagt de
            entropy van je resultaten naar een controleerbaar niveau.
          </p>
        </div>
        <div className="p-4 bg-pink/12 nb-box">
          <h3 className="text-sm mb-1.5 flex items-center gap-2">
            <span className="w-3 h-3 bg-pink nb-box" /> Wat is ruis in een organisatie?
          </h3>
          <p className="text-xs text-ink/80 font-medium leading-relaxed">
            Ruis is alles wat de strategische intentie corrumpeert: slechte informatiesystemen, foute
            interpretaties en systemen die elkaar tegenwerken (Edstack 4: CampusBite). Regie op IT houdt
            de signaalkwaliteit hoog.
          </p>
        </div>
      </div>
    </div>
  );
}
