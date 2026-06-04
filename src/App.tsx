/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  HelpCircle, 
  Layers, 
  Database, 
  Network, 
  Award, 
  Clock, 
  Printer, 
  CheckCircle2, 
  Sparkles, 
  Info,
  ExternalLink
} from 'lucide-react';

import ShannonIntro from './components/ShannonIntro';
import EntropySimulator from './components/EntropySimulator';
import CompressionSimulator from './components/CompressionSimulator';
import ChannelSimulator from './components/ChannelSimulator';
import SyntheseQuiz from './components/SyntheseQuiz';
import LessonPlanner from './components/LessonPlanner';
import { EDSTACK_CONNECTIONS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<'intro' | 'entropy' | 'compression' | 'channel' | 'quiz' | 'docent'>('intro');
  const [personalGoal, setPersonalGoal] = useState<string>('');
  const [goalSaved, setGoalSaved] = useState<boolean>(false);

  // Tab configurations
  const tabs = [
    { id: 'intro', label: '1. Shannon & Bedrijfskunde', icon: Info },
    { id: 'entropy', label: '2. Entropy & Data (Edstack 2)', icon: Database },
    { id: 'compression', label: '3. Platforms & Compressie (Edstack 1)', icon: Layers },
    { id: 'channel', label: '4. Ruis, Alignment & PDCA (Edstack 3 & 4)', icon: Network },
    { id: 'quiz', label: '5. Synthese Quiz', icon: Award },
    { id: 'docent', label: '6. Docenten Lesplan (90 min)', icon: BookOpen },
  ] as const;

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (personalGoal.trim()) {
      setGoalSaved(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Visual Top Branding Border */}
      <div className="h-1.5 w-full bg-gradient-to-r from-brand-blue via-brand-blue to-brand-accent" />

      {/* Main Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-accent rounded p-1 flex items-center justify-center text-white font-bold text-xl select-none shrink-0 shadow-sm leading-none">
              E
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest font-mono">
                  MyEdumundo MyBridge-Suite
                </span>
              </div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                P4 - 6: Monitoren en bijsturen
              </h1>
              <p className="text-xs text-slate-550">
                Module Fundament: Informatie Theorie (Claude Shannon)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">Docentenportal</p>
              <p className="text-[10px] text-slate-500">Lesvoorbereiding: 90 min</p>
            </div>
            <button 
              onClick={() => setActiveTab('quiz')}
              className="bg-brand-blue hover:bg-brand-blue-hover text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              Start Synthese Quiz
            </button>
          </div>
        </div>
      </header>

      {/* Hero Overview Jumbotron */}
      <section className="bg-slate-900 text-white py-12 px-6 shadow-xl relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f27d26_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          <div className="lg:col-span-2 space-y-4">
            <span className="bg-brand-blue/30 text-sky-300 font-bold px-3 py-1 rounded-full text-xs border border-brand-blue/50">
              Theorie Synthese
            </span>
            <h2 className="text-2xl md:text-3.5xl font-bold tracking-tight leading-tight font-serif italic">
              Waarom Shannon&apos;s Informatietheorie onmisbaar is voor bedrijfskundigen
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Bedrijfskunde gaat over sturen en beheersen. Maar hoe stuur je als je niet weet wat informatie is? 
              Claude Shannon bewees in 1948 dat <strong>informatie de absolute vijand is van onzekerheid (entropy)</strong>. 
              Of je nu platforms bouwt (Edstack 1), KPI dashboards inricht (Edstack 2), procesveranderingen doorvoert (Edstack 3) of IT-infrastructuren uitlijnt (Edstack 4); je ontwerpt wiskundig gezien altijd communicatiekanalen om de organisesnelheid te optimaliseren.
            </p>
          </div>

          {/* Target Student Goal widget */}
          <div className="bg-slate-800 border border-slate-700/80 p-5 rounded-2xl flex flex-col justify-between shadow-lg">
            <div>
              <h3 className="font-bold text-brand-accent text-sm flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
                Mijn Shannon Leerdoel
              </h3>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Reflectie is de kern van elke Edstack. Formuleer aan het begin jouw eigen leerdoel voor deze module.
              </p>
            </div>

            {!goalSaved ? (
              <form onSubmit={handleSaveGoal} className="mt-4 space-y-2">
                <input
                  type="text"
                  placeholder="Bijv. Begrijpen hoe PDCA fouten wegfiltert..."
                  value={personalGoal}
                  onChange={(e) => setPersonalGoal(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2 rounded-lg text-xs cursor-pointer transition-colors"
                >
                  Doel Vastleggen
                </button>
              </form>
            ) : (
              <div className="mt-4 p-3 bg-slate-950 border border-brand-accent/30 rounded-lg">
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-accent">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                  Mijn Persoonlijk Doel Actief
                </div>
                <p className="text-xs italic text-slate-300 mt-1">&quot;{personalGoal}&quot;</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Grid navigation */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3 font-mono">
              Module Structuur
            </span>
            <div className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left py-3 px-3.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-brand-blue text-white shadow shadow-brand-blue/10'
                        : 'text-slate-500 hover:text-slate-850 hover:bg-slate-50'
                    }`}
                    id={`sidebar-tab-${tab.id}`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Added TIP panel from professional polish design code */}
            <div className="mt-5 p-4 bg-orange-50 rounded-xl border border-orange-200">
              <p className="text-xs font-bold text-orange-800 mb-1">SYNTHESE TIP</p>
              <p className="text-[11px] text-orange-700 leading-relaxed">
                Koppel Shannon&apos;s &apos;Noise&apos; direct aan &apos;Transactiekosten&apos; in Edstack 1. Een platform verlaagt ruis in de markt.
              </p>
            </div>
          </div>

          {/* Quick Edstack Alignment index */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Overbrugging
              </span>
              <h4 className="font-extrabold text-slate-800 text-sm mt-1">
                De 4 Edstacks in MyEdumundo
              </h4>
            </div>

            <div className="space-y-3.5">
              {EDSTACK_CONNECTIONS.map((conn) => (
                <div key={conn.id} className="text-xs">
                  <span className="font-bold text-slate-700 block mb-0.5">{conn.title}</span>
                  <span className="text-brand-blue font-semibold block mb-1">➔ {conn.shannonConcept}</span>
                  <p className="text-[11px] text-slate-500 leading-relaxed border-l-2 border-slate-200 pl-2">
                    {conn.analogy.slice(0, 110)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workspace Display Area */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
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


      {/* Visual Footer */}
      <footer className="bg-white border-t border-slate-150 py-6 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            &copy; 2026 MyEdumundo Bridge Core. Ontwikkeld voor docenten Bedrijfskundige Informatievoorziening.
          </div>
          <div className="flex items-center gap-4 font-medium">
            <span className="text-[10px] bg-slate-100 px-2.5 py-1 rounded">Shannon Limit Config</span>
            <span className="text-brand-blue">UTC: 2026-06-04</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
