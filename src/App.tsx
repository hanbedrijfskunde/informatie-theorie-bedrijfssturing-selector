/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Database,
  Layers,
  Network,
  Award,
  Info,
  Sparkles,
  CheckCircle2,
  Flame,
  Star,
  Zap,
  Target,
  ChevronRight,
} from 'lucide-react';

import ShannonIntro from './components/ShannonIntro';
import EntropySimulator from './components/EntropySimulator';
import CompressionSimulator from './components/CompressionSimulator';
import ChannelSimulator from './components/ChannelSimulator';
import SyntheseQuiz from './components/SyntheseQuiz';
import LessonPlanner from './components/LessonPlanner';
import { EDSTACK_CONNECTIONS } from './data';

type TabId = 'intro' | 'entropy' | 'compression' | 'channel' | 'quiz' | 'docent';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('intro');
  const [visited, setVisited] = useState<Set<TabId>>(new Set(['intro']));
  const [personalGoal, setPersonalGoal] = useState<string>('');
  const [goalSaved, setGoalSaved] = useState<boolean>(false);

  const tabs = [
    { id: 'intro', n: 1, label: 'Wat is informatie?', sub: 'Shannon & Bedrijfskunde', icon: Info, color: 'lime' },
    { id: 'entropy', n: 2, label: 'Tame the Entropy Beast', sub: 'Entropy & Data · Edstack 2', icon: Database, color: 'pink' },
    { id: 'compression', n: 3, label: 'Compress the Platform', sub: 'Platforms · Edstack 1', icon: Layers, color: 'blue' },
    { id: 'channel', n: 4, label: 'Beat the Noise', sub: 'Ruis & PDCA · Edstack 3 & 4', icon: Network, color: 'violet' },
    { id: 'quiz', n: 5, label: 'Boss Fight: Synthese', sub: 'Synthese Quiz', icon: Award, color: 'pink' },
    { id: 'docent', n: 6, label: 'Game Master Guide', sub: 'Docenten Lesplan · 90 min', icon: BookOpen, color: 'blue' },
  ] as const;

  const selectTab = (id: TabId) => {
    setActiveTab(id);
    setVisited((prev) => new Set(prev).add(id));
  };

  const cleared = visited.size;
  const xp = cleared * 40 + (goalSaved ? 40 : 0);

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (personalGoal.trim()) setGoalSaved(true);
  };

  return (
    <div className="min-h-screen text-ink flex flex-col font-sans">
      {/* Top colour band */}
      <div className="h-2 w-full flex">
        <div className="flex-1 bg-lime" />
        <div className="flex-1 bg-pink" />
        <div className="flex-1 bg-blue" />
        <div className="flex-1 bg-violet" />
      </div>

      {/* ── Header / HUD ─────────────────────────────── */}
      <header className="bg-cream border-b-[3px] border-ink py-3.5 px-5 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-lime nb-box nb-shadow flex items-center justify-center font-mono font-extrabold text-2xl select-none shrink-0">
              B
            </div>
            <div>
              <div className="nb-eyebrow flex items-center gap-2">
                <span className="w-2 h-2 bg-pink inline-block" />
                BITQUEST // shannon saga
              </div>
              <h1 className="text-xl mt-0.5">P4-6: Monitoren &amp; Bijsturen</h1>
              <p className="text-xs text-muted font-medium mt-0.5">
                Fundament: Informatietheorie (Claude Shannon)
              </p>
            </div>
          </div>

          {/* HUD stats */}
          <div className="flex items-center gap-2.5">
            <div className="nb-pill nb-pill-lime">
              <Flame className="w-3.5 h-3.5" /> 7
            </div>
            <div className="nb-pill nb-pill-pink">
              <Star className="w-3.5 h-3.5" /> {xp} XP
            </div>
            <div className="nb-pill nb-pill-ink">
              LVL {Math.max(1, Math.floor(xp / 80) + 1)}
            </div>
            <button
              onClick={() => selectTab('quiz')}
              className="nb-btn nb-btn-pink px-4 py-2.5 text-xs hidden sm:inline-flex"
            >
              <Zap className="w-4 h-4" /> Boss Fight
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-ink text-cream py-12 px-5 border-b-[3px] border-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(#C9F227_1.5px,transparent_1.5px)] [background-size:22px_22px]" />
        {/* floating decorative bits */}
        <span className="hidden lg:block absolute top-8 right-[42%] nb-score text-lime/40 text-sm rotate-6 select-none">0100_1011</span>
        <span className="hidden lg:block absolute bottom-6 right-[30%] nb-score text-pink/40 text-xs -rotate-3 select-none">H(X)=0.96</span>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-7 relative z-10">
          <div className="lg:col-span-2 space-y-4">
            <span className="nb-pill nb-pill-lime">⚡ Theorie Synthese · Quest</span>
            <h2 className="text-3xl md:text-[2.6rem] leading-[1.02] max-w-2xl">
              Tame the entropy beast.
              <span className="text-lime"> Earn the bits.</span>
            </h2>
            <p className="text-cream/75 text-sm leading-relaxed max-w-2xl font-medium">
              Bedrijfskunde gaat over sturen en beheersen. Maar hoe stuur je als je niet weet wat
              informatie is? Shannon bewees in 1948 dat{' '}
              <strong className="text-cream">informatie de vijand is van onzekerheid (entropy)</strong>.
              Of je nu platforms bouwt (Edstack 1), KPI-dashboards inricht (Edstack 2), processen
              verandert (Edstack 3) of IT uitlijnt (Edstack 4) — je ontwerpt altijd communicatiekanalen
              om de organisatie sneller te laten sturen.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="nb-pill nb-pill-blue">Quest Progress · {cleared}/6</span>
              <span className="nb-pill nb-pill-violet">Next Reward · Compression Badge</span>
            </div>
          </div>

          {/* Personal goal quest card */}
          <div className="nb-card nb-card-cream nb-shadow-lg text-ink p-5 flex flex-col justify-between">
            <div>
              <h3 className="nb-eyebrow flex items-center gap-1.5 !text-ink">
                <Target className="w-4 h-4 text-pink" /> Mijn Shannon-leerdoel
              </h3>
              <p className="text-muted text-xs mt-1.5 leading-relaxed font-medium">
                Reflectie is de kern van elke Edstack. Formuleer je eigen leerdoel om de eerste
                <strong className="text-ink"> +40 XP</strong> te claimen.
              </p>
            </div>

            {!goalSaved ? (
              <form onSubmit={handleSaveGoal} className="mt-4 space-y-2.5">
                <input
                  type="text"
                  placeholder="Bijv. Begrijpen hoe PDCA fouten wegfiltert…"
                  value={personalGoal}
                  onChange={(e) => setPersonalGoal(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-cream nb-box font-medium placeholder-muted focus:outline-none focus:bg-white"
                  required
                />
                <button type="submit" className="nb-btn w-full py-2.5 text-xs">
                  <Star className="w-4 h-4" /> Claim +40 XP
                </button>
              </form>
            ) : (
              <div className="mt-4 p-3 bg-lime nb-box">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4" /> Leerdoel actief · +40 XP
                </div>
                <p className="text-xs font-medium mt-1.5">&ldquo;{personalGoal}&rdquo;</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Main ─────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-5 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-4 gap-7">
        {/* Quest map sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="nb-card p-4">
            <span className="nb-eyebrow block mb-3">⬗ Quest Map</span>
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                const done = visited.has(tab.id) && !isSelected;
                return (
                  <button
                    key={tab.id}
                    onClick={() => selectTab(tab.id)}
                    id={`sidebar-tab-${tab.id}`}
                    className={`w-full text-left p-2.5 nb-box flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-ink text-cream nb-shadow -translate-y-0.5'
                        : 'bg-white hover:-translate-y-0.5 hover:nb-shadow'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 shrink-0 nb-box flex items-center justify-center font-mono font-extrabold text-sm ${
                        isSelected ? 'bg-lime text-ink' : done ? 'bg-lime text-ink' : 'bg-cream text-ink'
                      }`}
                    >
                      {done ? '✓' : tab.n}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bold text-[0.8rem] leading-tight truncate">{tab.label}</span>
                      <span className={`block text-[0.65rem] font-mono uppercase tracking-wide truncate ${isSelected ? 'text-cream/60' : 'text-muted'}`}>
                        {tab.sub}
                      </span>
                    </span>
                    <Icon className={`w-4 h-4 ml-auto shrink-0 ${isSelected ? 'text-lime' : 'text-muted'}`} />
                  </button>
                );
              })}
            </div>

            <div className="mt-4 p-3 bg-lime nb-box">
              <p className="nb-eyebrow !text-ink mb-1">★ Synthese Tip</p>
              <p className="text-[0.7rem] font-medium leading-relaxed">
                Koppel Shannon&apos;s &apos;noise&apos; direct aan &apos;transactiekosten&apos; in Edstack 1.
                Een platform verlaagt de ruis in de markt.
              </p>
            </div>
          </div>

          {/* Edstack bridge */}
          <div className="nb-card p-5 space-y-4">
            <div>
              <span className="nb-eyebrow block">⇄ Overbrugging</span>
              <h4 className="text-base mt-1">De 4 Edstacks → Shannon</h4>
            </div>
            <div className="space-y-3">
              {EDSTACK_CONNECTIONS.map((conn) => (
                <div key={conn.id} className="text-xs border-l-[3px] border-ink pl-2.5">
                  <span className="font-bold block">{conn.title}</span>
                  <span className="text-blue font-bold block mb-1 flex items-center gap-1">
                    <ChevronRight className="w-3 h-3" /> {conn.shannonConcept}
                  </span>
                  <p className="text-[0.7rem] text-muted font-medium leading-relaxed">
                    {conn.analogy.slice(0, 100)}…
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workspace */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'intro' && <ShannonIntro />}
              {activeTab === 'entropy' && <EntropySimulator />}
              {activeTab === 'compression' && <CompressionSimulator />}
              {activeTab === 'channel' && <ChannelSimulator />}
              {activeTab === 'quiz' && <SyntheseQuiz />}
              {activeTab === 'docent' && <LessonPlanner />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="bg-ink text-cream border-t-[3px] border-ink py-6 px-5 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="font-medium text-cream/70">
            &copy; 2026 MyEdumundo Bridge Core · Built for students who grew up on game UIs.
          </div>
          <div className="flex items-center gap-2 font-mono">
            <span className="nb-pill nb-pill-lime">Shannon Limit Config</span>
            <span className="text-lime">UTC 2026-06-04<span className="nb-caret">_</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
