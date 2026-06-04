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
    <div className="nb-card p-6">
      <div className="mb-6">
        <span className="nb-pill nb-pill-blue">⬗ Quest 3 · Compress the Platform</span>
        <div className="flex items-center gap-2 mt-2.5">
          <Layers className="w-6 h-6 text-blue" />
          <h2 className="text-2xl">
            Simulatie 2: Transactiekosten &amp; Platform-Compressie (Edstack 1)
          </h2>
        </div>
        <p className="text-muted text-sm mt-1.5 font-medium">
          Platforms zoals <strong>Bol.com</strong> comprimeren de complexiteit van transacties. Ervaar hoe efficiënte binaire codering (Shannon&apos;s Source Coding) parallel loopt aan het verlagen van fysieke transactiekosten (Williamson).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Interactivity */}
        <div className="space-y-6">
          <div className="nb-card nb-card-cream p-4">
            <h3 className="nb-eyebrow mb-4 block">
              Transactie-omgeving Simuleren
            </h3>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button
                onClick={() => setActiveMode('traditional')}
                className={`flex-1 py-3 px-4 nb-box font-bold text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  activeMode === 'traditional'
                    ? 'bg-violet text-cream -translate-y-0.5 nb-shadow'
                    : 'bg-white text-ink hover:-translate-y-0.5 hover:nb-shadow'
                }`}
                id="compress-mode-traditional"
              >
                <Landmark className="w-4 h-4" />
                No Platform (Directe Markt)
                <span className="text-[10px] font-mono font-medium">Hoge Complexiteit &amp; Transactiekosten</span>
              </button>
              <button
                onClick={() => setActiveMode('platform')}
                className={`flex-1 py-3 px-4 nb-box font-bold text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  activeMode === 'platform'
                    ? 'bg-blue text-cream -translate-y-0.5 nb-shadow'
                    : 'bg-white text-ink hover:-translate-y-0.5 hover:nb-shadow'
                }`}
                id="compress-mode-platform"
              >
                <Zap className="w-4 h-4 text-pink" />
                Met Platform (Bol.com)
                <span className="text-[10px] font-mono font-medium">Optimale Codering &amp; Goedkoop</span>
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleGenerateTx}
                disabled={animationActive}
                className="flex-1 nb-btn nb-btn-blue disabled:opacity-50 py-3 px-4 text-xs"
                id="compress-trigger-tx"
              >
                <RefreshCw className={`w-4 h-4 ${animationActive ? 'animate-spin' : ''}`} />
                Simuleer Zakelijke Transactiviteit
              </button>
              <button
                onClick={handleClear}
                className="nb-btn nb-btn-ghost px-3.5 text-xs"
                id="compress-clear-btn"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Visual Simulation Pipeline */}
          <div className="nb-panel-dark p-5 relative overflow-hidden h-48 flex flex-col justify-between">
            <span className="absolute top-3 left-3 nb-eyebrow !text-lime/70">
              Data Transmissie-stroom
            </span>

            {/* Simulated particles flying inside pipeline */}
            <div className="flex items-center justify-between h-20 relative px-4">
              <div className="text-center">
                <div className="text-xs text-pink font-bold">Klant</div>
                <div className="w-8 h-8 nb-box bg-pink/20 border-cream flex items-center justify-center text-xs text-cream font-bold select-none">
                  Tx
                </div>
              </div>

              {/* The Pipeline bar */}
              <div className="flex-1 h-3 bg-cream/10 nb-box border-cream mx-4 overflow-hidden relative">
                {animationActive && (
                  <motion.div
                    initial={{ left: '-50%' }}
                    animate={{ left: '110%' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className={`absolute top-0 bottom-0 w-24 ${
                      activeMode === 'traditional'
                        ? 'bg-violet'
                        : 'bg-lime'
                    }`}
                  />
                )}
              </div>

              <div className="text-center">
                <div className="text-xs text-blue font-bold">Aanbieder</div>
                <div className="w-8 h-8 nb-box bg-blue/20 border-cream flex items-center justify-center text-xs text-cream font-bold select-none">
                  Srv
                </div>
              </div>
            </div>

            {/* Informational specs below pipeline */}
            <div className="flex justify-between items-center text-xs text-cream/70 border-t-[3px] border-cream/30 pt-3 font-mono font-medium">
              <span>
                Codering: {activeMode === 'traditional' ? 'Raw UTF-8 8/16-bits' : 'Shorthand Indexing'}
              </span>
              <span className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 nb-box border-cream ${activeMode === 'traditional' ? 'bg-violet' : 'bg-lime'}`} />
                {activeMode === 'traditional' ? 'Informatieruis & Duur' : 'Gecomprimeerd & Efficiënt'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Analytical scoreboard & linkage */}
        <div className="space-y-6">
          <div className="nb-card nb-card-cream p-5 flex flex-col justify-between">
            <h4 className="nb-eyebrow mb-4 block">
              Dashboard: Gegevensgrootte &amp; Systeemkosten
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue/10 nb-box p-3 text-center">
                <div className="nb-eyebrow mb-1 block">
                  Verstuurde Lading
                </div>
                <div className="nb-score text-xl text-blue" id="compress-bits-output">
                  {activeMode === 'traditional' ? `${totalBitsDirect} bits` : `${totalBitsPlatform} bits`}
                </div>
                <div className="text-[10px] text-muted font-medium mt-1">
                  (Besparing: <span className="nb-score text-pink">{compressionRatio}%</span>)
                </div>
              </div>

              <div className="bg-lime nb-box p-3 text-center">
                <div className="nb-eyebrow mb-1 block">
                  Transactiekosten (Est.)
                </div>
                <div className="nb-score text-xl text-ink text-center" id="compress-costs-output">
                  €{activeMode === 'traditional' ? totalCostDirect.toFixed(2) : totalCostPlatform.toFixed(2)}
                </div>
                <div className="text-[10px] text-ink/70 font-medium mt-1">
                  (Minder overhead door platform)
                </div>
              </div>
            </div>

            {/* Sorteer overzicht van Huffman Shorthands */}
            <div className="border-t-[3px] border-ink pt-4">
              <span className="nb-eyebrow mb-2 block">
                Shannons Coderingstabel vs. Williamsonian Transactiekosten:
              </span>
              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {txTypes.map((t, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-1.5 px-2 bg-white nb-box">
                    <span className="font-bold text-ink">{t.label}</span>
                    <div className="flex items-center gap-3 nb-score">
                      <span className="text-muted">{t.uncompressed.length}b vs. <strong className="text-pink">{t.compressed.length}b</strong></span>
                      <span className="text-muted">€{t.costDirect} vs. <strong className="text-blue">€{t.costPlatform}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue/10 nb-box p-4">
            <h4 className="nb-eyebrow mb-1.5 flex items-center gap-1.5 !text-ink">
              <HelpCircle className="w-4 h-4 text-pink" />
              Hoe sluit dit aan op Edstack 1?
            </h4>
            <p className="text-xs leading-relaxed text-ink/80 font-medium">
              Bij platformeconomie (Bol.com) draait waardecreatie niet om bezit, maar om <strong>coördinatie en toegang</strong>.
              In plaats van dat elke klant urenlang winkels afzoekt (traditionele zware codering, hoge transactiekosten), ordent het platform dit in één centrale gecomprimeerde informatiestructuur. Dit is Shannons <em>Source Coding</em> in de praktijk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
