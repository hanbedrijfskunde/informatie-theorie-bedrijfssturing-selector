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

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="px-3 py-1 text-xs font-semibold text-brand-blue bg-blue-50 rounded-full">
            Historisch Fundament
          </span>
          <h2 className="text-2xl font-bold text-slate-800 mt-2 font-serif italic">
            Claude Shannon: De Vader van de Informatietijd
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            In 1948 mathematiseerde Shannon &apos;informatie&apos;. Zijn model bleek niet alleen toepasbaar op kabels, maar ook op hoe organisaties sturen en controleren.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-700 bg-slate-100/80 p-2.5 rounded-lg border border-slate-300 self-start md:self-auto font-medium shadow-sm">
          <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
          <span>Beweeg over de componenten om de link te ontdekken!</span>
        </div>
      </div>

      {/* Interactive Shannon Block Diagram */}
      <div className="bg-slate-900 rounded-xl p-6 mb-6 overflow-x-auto">
        <div className="min-w-[700px] relative py-4">
          <div className="grid grid-cols-5 gap-4 relative z-10">
            {/* Source */}
            <div
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer text-center flex flex-col justify-between h-40 ${
                hoveredElement === 'bron'
                  ? 'bg-brand-blue/30 border-brand-blue shadow-lg shadow-brand-blue/20'
                  : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300'
              }`}
              onMouseEnter={() => setHoveredElement('bron')}
              id="shannon-block-source"
            >
              <div className="flex justify-center"><FileText className="w-8 h-8 text-brand-blue" /></div>
              <div className="font-semibold text-sm text-white">1. Informatiebron</div>
              <div className="text-[10px] text-slate-400 italic">Kiest bericht uit pool van opties</div>
              <div className="mt-1 text-[11px] font-bold text-brand-blue bg-blue-50/10 px-2 py-0.5 rounded">
                Business Doelen
              </div>
            </div>

            {/* Encoder */}
            <div
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer text-center flex flex-col justify-between h-40 ${
                hoveredElement === 'encoder'
                  ? 'bg-brand-accent/20 border-brand-accent shadow-lg shadow-brand-accent/20'
                  : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300'
              }`}
              onMouseEnter={() => setHoveredElement('encoder')}
              id="shannon-block-encoder"
            >
              <div className="flex justify-center"><Network className="w-8 h-8 text-brand-accent" /></div>
              <div className="font-semibold text-sm text-white">2. Encoder (Sender)</div>
              <div className="text-[10px] text-slate-400 italic">Zet bericht om in meetbaar signaal</div>
              <div className="mt-1 text-[11px] font-bold text-brand-accent bg-orange-500/10 px-2 py-0.5 rounded">
                E-Commerce / Standaard
              </div>
            </div>

            {/* Channel (Middle) */}
            <div
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer text-center flex flex-col justify-between h-40 relative ${
                hoveredElement === 'kanaal'
                  ? 'bg-slate-950 border-brand-accent/50 shadow-lg'
                  : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300'
              }`}
              onMouseEnter={() => setHoveredElement('kanaal')}
              id="shannon-block-channel"
            >
              <div className="flex justify-center"><AlertTriangle className="w-8 h-8 text-rose-400" /></div>
              <div className="font-semibold text-sm text-white">3. Ruis & Kanaal</div>
              <div className="text-[10px] text-slate-400 italic">Transmissiemedium vol met storing</div>
              <div className="mt-1 text-[11px] font-bold text-rose-350 bg-rose-500/10 px-2 py-0.5 rounded">
                De Organisatie & Ruis
              </div>
            </div>

            {/* Decoder */}
            <div
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer text-center flex flex-col justify-between h-40 ${
                hoveredElement === 'decoder'
                  ? 'bg-emerald-950/80 border-emerald-500 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300'
              }`}
              onMouseEnter={() => setHoveredElement('decoder')}
              id="shannon-block-decoder"
            >
              <div className="flex justify-center"><Database className="w-8 h-8 text-emerald-400" /></div>
              <div className="font-semibold text-sm text-white">4. Decoder</div>
              <div className="text-[10px] text-slate-400 italic">Vertaalt signalen terug naar betekenis</div>
              <div className="mt-1 text-[11px] font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded">
                Business-IT Alignment
              </div>
            </div>

            {/* Destination */}
            <div
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer text-center flex flex-col justify-between h-40 ${
                hoveredElement === 'bestemming'
                  ? 'bg-sky-950/80 border-sky-500 shadow-lg shadow-sky-500/20'
                  : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300'
              }`}
              onMouseEnter={() => setHoveredElement('bestemming')}
              id="shannon-block-destination"
            >
              <div className="flex justify-center flex-row gap-0.5">
                <span className="w-3 h-3 bg-sky-400 rounded-full inline-block animate-ping" />
                <span className="w-2 h-2 bg-sky-500 rounded-full inline-block" />
              </div>
              <div className="font-semibold text-sm text-white">5. Bestemming</div>
              <div className="text-[10px] text-slate-400 italic">Eindontvanger verwerkt de boodschap</div>
              <div className="mt-1 text-[11px] font-bold text-sky-300 bg-sky-950 px-2 py-0.5 rounded">
                KPI Dashboard / Klant
              </div>
            </div>
          </div>

          {/* SVG Connector lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minWidth: '700px' }}>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
              </marker>
              <marker id="arrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e3a8a" />
              </marker>
            </defs>
            {/* Draw connectors */}
            <line x1="20%" y1="50%" x2="22%" y2="50%" stroke="#475569" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow)" />
            <line x1="40%" y1="50%" x2="42%" y2="50%" stroke="#475569" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow)" />
            <line x1="60%" y1="50%" x2="62%" y2="50%" stroke="#475569" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow)" />
            <line x1="80%" y1="50%" x2="82%" y2="50%" stroke="#475569" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow)" />
          </svg>
        </div>
      </div>

      {/* Detail card on hover */}
      {exp && (
        <motion.div
          key={hoveredElement}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 p-5 rounded-xl"
        >
          <div className="border-r border-slate-200/60 pr-4">
            <div className="flex items-center gap-2 text-brand-blue font-bold text-base mb-2">
              <Info className="w-5 h-5 text-brand-blue" />
              {exp.title} – <span className="text-slate-500 font-medium text-sm">Wiskundige Theorie</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{exp.theory}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-slate-800 font-bold text-base mb-2">
              <Sparkles className="w-5 h-5 text-brand-accent" />
              De Bedrijfskundige Lens
            </div>
            <p className="text-slate-700 text-sm font-medium leading-relaxed bg-brand-accent/5 p-3 rounded-lg border border-brand-accent/20">
              {exp.business}
            </p>
          </div>
        </motion.div>
      )}

      {/* Cross-thematic summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t border-slate-150">
        <div className="p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-100">
          <h3 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-blue" />
            Wat is informatie volgens Shannon?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Informatie is <strong>reductie van onzekerheid</strong>. Hoe onvoorspelbaarder een situatie is, hoe meer &apos;informatie&apos; er nodig is om deze te verhelderen. Als we een KPI formuleren (Edstack 2), proberen we de onzekerheid (entropy) van onze resultaten te verlagen naar een controleerbaar niveau.
          </p>
        </div>
        <div className="p-4 bg-gradient-to-r from-orange-50/50 to-red-50/50 rounded-xl border border-orange-100">
          <h3 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-accent" />
            Wat is ruis in een organisatie?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ruis is alles wat de oorspronkelijke strategische intentie corrumpeert. Slecht ontworpen informatiesystemen, onjuiste interpretaties en systemen die elkaar tegenwerken (Edstack 4: CampusBite) introduceren ruis. Regie op IT helpt om de signaalkwaliteit hoog te houden.
          </p>
        </div>
      </div>
    </div>
  );
}
