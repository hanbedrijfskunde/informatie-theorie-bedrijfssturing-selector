import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Landmark } from 'lucide-react';

interface TransactionEvent {
  id: number;
  type: 'zoek' | 'vergelijk' | 'onderhandel' | 'betaal' | 'controle';
  label: string;
  uncompressedBits: string; // e.g. "0100110010101111" (16 bits)
  compressedBits: string;   // e.g. "01" (2 bits)
  costDirect: number; // in Euros
  costPlatform: number; // in Euros
}

export default function CompressionSimulator() {
  const [animationActive, setAnimationActive] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<'traditional' | 'platform'>('traditional');
  const [txHistory, setTxHistory] = useState<TransactionEvent[]>([]);

  const txTypes = [
    { type: 'zoek', label: 'Zoeken (Informatie verzamelen)', uncompressed: '01001100_10101111_01101001', compressed: '0', costDirect: 12.50, costPlatform: 0.20 },
    { type: 'vergelijk', label: 'Vergelijken (Aanbiedingen)', uncompressed: '01110110_01100101_01110010_01100111', compressed: '10', costDirect: 8.00, costPlatform: 0.10 },
    { type: 'onderhandel', label: 'Onderhandelen & Contracteren', uncompressed: '01101111_01101110_01100100_01100101', compressed: '110', costDirect: 25.00, costPlatform: 0.50 },
    { type: 'betaal', label: 'Betalen & Afwikkelen', uncompressed: '01100010_01100101_01110100_01100001', compressed: '1110', costDirect: 4.50, costPlatform: 0.05 },
    { type: 'controle', label: 'Monitoren & Controleren', uncompressed: '01100011_01101111_01101110_01110100', compressed: '1111', costDirect: 15.00, costPlatform: 0.15 }
  ];

  const handleGenerateTx = () => {
    setAnimationActive(true);
    
    // Choose a random transaction type
    const randType = txTypes[Math.floor(Math.random() * txTypes.length)];
    const newTx: TransactionEvent = {
      id: Date.now(),
      type: randType.type as any,
      label: randType.label,
      uncompressedBits: randType.uncompressed,
      compressedBits: randType.compressed,
      costDirect: randType.costDirect,
      costPlatform: randType.costPlatform
    };

    setTxHistory(prev => [newTx, ...prev].slice(0, 5));

    setTimeout(() => {
      setAnimationActive(false);
    }, 1200);
  };

  const handleClear = () => {
    setTxHistory([]);
  };

  const totalBitsDirect = txHistory.reduce((sum, tx) => sum + tx.uncompressedBits.replace(/_/g, '').length, 0);
  const totalBitsPlatform = txHistory.reduce((sum, tx) => sum + tx.compressedBits.length, 0);

  const totalCostDirect = txHistory.reduce((sum, tx) => sum + tx.costDirect, 0);
  const totalCostPlatform = txHistory.reduce((sum, tx) => sum + tx.costPlatform, 0);

  const compressionRatio = totalBitsDirect > 0 ? (100 - (totalBitsPlatform / totalBitsDirect) * 100).toFixed(1) : '0';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Layers className="w-6 h-6 text-brand-blue" />
          <h2 className="text-xl font-bold text-slate-800 font-serif italic">
            Simulatie 2: Transactiekosten &amp; Platform-Compressie (Edstack 1)
          </h2>
        </div>
        <p className="text-slate-600 text-sm mt-1">
          Platforms zoals <strong>Bol.com</strong> comprimeren de complexiteit van transacties. Ervaar hoe efficiënte binaire codering (Shannon&apos;s Source Coding) parallel loopt aan het verlagen van fysieke transactiekosten (Williamson).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Interactivity */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-700 text-sm mb-4">
              Transactie-omgeving Simuleren
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button
                onClick={() => setActiveMode('traditional')}
                className={`flex-1 py-3 px-4 rounded-xl border font-bold text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  activeMode === 'traditional'
                    ? 'bg-slate-200 border-slate-350 text-slate-850 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
                id="compress-mode-traditional"
              >
                <Landmark className="w-4 h-4 text-slate-600" />
                No Platform (Directe Markt)
                <span className="text-[10px] text-slate-500 font-normal">Hoge Complexiteit &amp; Transactiekosten</span>
              </button>
              <button
                onClick={() => setActiveMode('platform')}
                className={`flex-1 py-3 px-4 rounded-xl border font-bold text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  activeMode === 'platform'
                    ? 'bg-brand-blue border-brand-blue text-white shadow shadow-brand-blue/10'
                    : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                }`}
                id="compress-mode-platform"
              >
                <Zap className="w-4 h-4 text-brand-accent" />
                Met Platform (Bol.com)
                <span className="text-[10px] opacity-90 font-normal">Optimale Codering &amp; Goedkoop</span>
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleGenerateTx}
                disabled={animationActive}
                className="flex-1 bg-brand-blue hover:bg-brand-blue-hover disabled:bg-slate-300 text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-xs"
                id="compress-trigger-tx"
              >
                <RefreshCw className={`w-4 h-4 ${animationActive ? 'animate-spin' : ''}`} />
                Simuleer Zakelijke Transactiviteit
              </button>
              <button
                onClick={handleClear}
                className="px-3.5 border border-slate-250 text-slate-550 hover:text-slate-800 font-semibold text-xs rounded-xl hover:bg-slate-150 transition-all cursor-pointer"
                id="compress-clear-btn"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Visual Simulation Pipeline */}
          <div className="bg-slate-900 rounded-xl p-5 relative overflow-hidden h-48 flex flex-col justify-between shadow">
            <span className="absolute top-3 left-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              Data Transmissie-stroom
            </span>

            {/* Simulated particles flying inside pipeline */}
            <div className="flex items-center justify-between h-20 relative px-4">
              <div className="text-center">
                <div className="text-xs text-brand-accent font-bold">Klant</div>
                <div className="w-8 h-8 rounded-full bg-brand-accent/20 border border-brand-accent flex items-center justify-center text-xs text-white font-bold select-none">
                  Tx
                </div>
              </div>

              {/* The Pipeline bar */}
              <div className="flex-1 h-3 bg-slate-800 rounded-full mx-4 overflow-hidden relative">
                {animationActive && (
                  <motion.div
                    initial={{ left: '-50%' }}
                    animate={{ left: '110%' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className={`absolute top-0 bottom-0 w-24 rounded-full blur-[1px] ${
                      activeMode === 'traditional'
                        ? 'bg-gradient-to-r from-orange-400 to-amber-300'
                        : 'bg-gradient-to-r from-brand-accent to-emerald-450'
                    }`}
                  />
                )}
              </div>

              <div className="text-center">
                <div className="text-xs text-brand-blue font-bold">Aanbieder</div>
                <div className="w-8 h-8 rounded-full bg-slate-850 border border-slate-700 flex items-center justify-center text-xs text-slate-350">
                  Srv
                </div>
              </div>
            </div>

            {/* Informational specs below pipeline */}
            <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-800 pt-3">
              <span className="font-mono">
                Codering: {activeMode === 'traditional' ? 'Raw UTF-8 8/16-bits' : 'Shorthand Indexing'}
              </span>
              <span className="flex items-center gap-1">
                <span className={`w-2.5 h-2.5 rounded-full ${activeMode === 'traditional' ? 'bg-orange-500' : 'bg-brand-accent'}`} />
                {activeMode === 'traditional' ? 'Informatieruis & Duur' : 'Gecomprimeerd & Efficiënt'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Analytical scoreboard & linkage */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-205 flex flex-col justify-between">
            <h4 className="font-bold text-slate-800 text-sm mb-4 uppercase tracking-wider font-mono">
              Dashboard: Gegevensgrootte &amp; Systeemkosten
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Verstuurde Lading
                </div>
                <div className="text-xl font-bold text-brand-blue font-mono" id="compress-bits-output">
                  {activeMode === 'traditional' ? `${totalBitsDirect} bits` : `${totalBitsPlatform} bits`}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  (Besparing: <span className="text-brand-accent font-bold">{compressionRatio}%</span>)
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Transactiekosten (Est.)
                </div>
                <div className="text-xl font-bold text-slate-800 font-mono text-center animate-pulse" id="compress-costs-output">
                  €{activeMode === 'traditional' ? totalCostDirect.toFixed(2) : totalCostPlatform.toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  (Minder overhead door platform)
                </div>
              </div>
            </div>

            {/* Sorteer overzicht van Huffman Shorthands */}
            <div className="border-t border-slate-200 pt-4">
              <span className="text-xs font-semibold text-slate-600 mb-2 block">
                Shannons Coderingstabel vs. Williamsonian Transactiekosten:
              </span>
              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {txTypes.map((t, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-1 px-2 hover:bg-slate-100 rounded border border-transparent hover:border-slate-200/50">
                    <span className="font-medium text-slate-700">{t.label}</span>
                    <div className="flex items-center gap-3 font-mono">
                      <span className="text-slate-400">{t.uncompressed.length}b vs. <strong className="text-brand-accent">{t.compressed.length}b</strong></span>
                      <span className="text-slate-400 font-bold">€{t.costDirect} vs. <strong className="text-brand-blue">€{t.costPlatform}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-100 text-orange-950 p-4 rounded-xl">
            <h4 className="font-bold text-xs uppercase tracking-wider text-orange-850 mb-1.5 flex items-center gap-1">
              <HelpCircle className="w-4 h-4 text-brand-accent" />
              Hoe sluit dit aan op Edstack 1?
            </h4>
            <p className="text-xs leading-relaxed text-orange-900">
              Bij platformeconomie (Bol.com) draait waardecreatie niet om bezit, maar om <strong>coördinatie en toegang</strong>. 
              In plaats van dat elke klant urenlang winkels afzoekt (traditionele zware codering, hoge transactiekosten), ordent het platform dit in één centrale gecomprimeerde informatiestructuur. Dit is Shannons <em>Source Coding</em> in de praktijk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
