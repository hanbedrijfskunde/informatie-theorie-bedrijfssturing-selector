import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Network, Power, Zap, AlertCircle, Sparkles, CheckCircle } from 'lucide-react';

interface BitCell {
  original: number;
  transmitted: number;
  isNonoise: boolean;
  corrected: number; 
  status: 'ok' | 'error' | 'corrected';
}

export default function ChannelSimulator() {
  const [alignment, setAlignment] = useState<'low' | 'medium' | 'high'>('low');
  const [pdcaActive, setPdcaActive] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [stream, setStream] = useState<BitCell[]>([]);
  const [stats, setStats] = useState({ sent: 0, corrupted: 0, fixed: 0 });

  // Shannon Hartley Math parameters
  // B = Bandwidth, S = Signal Power, N = Noise Power
  let B = 5; // Mhz
  let S = 10; // mW
  let N = 8;  // mW

  if (alignment === 'low') {
    B = 5;
    S = 8;
    N = 10;
  } else if (alignment === 'medium') {
    B = 15;
    S = 20;
    N = 5;
  } else {
    B = 30;
    S = 40;
    N = 1.2;
  }

  const snr = S / N;
  const db = 10 * Math.log10(snr);
  const capacity = B * Math.log2(1 + snr); // C = B log2(1 + S/N)

  const handleTransmit = () => {
    setIsTransmitting(true);
    setStream([]);
    setStats({ sent: 0, corrupted: 0, fixed: 0 });

    const numBits = 24;
    const newStream: BitCell[] = [];
    let corruptCount = 0;
    let fixedCount = 0;

    // Noise probability based on misalignment
    const errorProb = alignment === 'low' ? 0.35 : alignment === 'medium' ? 0.15 : 0.02;

    for (let i = 0; i < numBits; i++) {
      const orig = Math.random() > 0.5 ? 1 : 0;
      let trans = orig;
      let isCorrupt = false;

      // Inject ad-hoc noise flips
      if (Math.random() < errorProb) {
        trans = orig === 1 ? 0 : 1;
        isCorrupt = true;
        corruptCount++;
      }

      let correctedValue = trans;
      let finalStatus: 'ok' | 'error' | 'corrected' = isCorrupt ? 'error' : 'ok';

      // PDCA Error correction loop filters and corrects bits
      if (pdcaActive && isCorrupt) {
        correctedValue = orig; // perfect feedback loop recovery
        finalStatus = 'corrected';
        fixedCount++;
      }

      newStream.push({
        original: orig,
        transmitted: trans,
        isNonoise: !isCorrupt,
        corrected: correctedValue,
        status: finalStatus
      });
    }

    setStream(newStream);
    setStats({
      sent: numBits,
      corrupted: corruptCount,
      fixed: fixedCount
    });

    // Timeout to simulate processing flow
    setTimeout(() => {
      setIsTransmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Network className="w-6 h-6 text-brand-blue" />
          <h2 className="text-xl font-bold text-slate-800 font-serif italic">
            Simulatie 3: Kanaalcapaciteit &amp; Feedback Ruiscorrectie (Edstacks 3 &amp; 4)
          </h2>
        </div>
        <p className="text-slate-600 text-sm mt-1">
          Volgens de <strong>Shannon-Hartley Theorem</strong> hangt de betrouwbare datasnelheid af van bandbreedte en ruis. Ontdek hoe organisatorische <strong>Business-IT alignment</strong> de ruis minimaliseert, en hoe de <strong>PDCA-cyclus</strong> als wiskundige foutcorrectie fungeert om foutloze executie te borgen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls Column */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-5">
            <h3 className="font-semibold text-slate-750 text-sm flex items-center gap-1">
              <Power className="w-4 h-4 text-brand-accent animate-pulse" />
              1. Business-IT Alignment (Negenvlaksmodel Rik Maes)
            </h3>
            
            <div className="flex rounded-lg bg-white p-1 border border-slate-200">
              {(['low', 'medium', 'high'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setAlignment(lvl)}
                  className={`flex-1 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    alignment === lvl
                      ? 'bg-brand-blue text-white shadow shadow-brand-blue/10'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                  id={`channel-alignment-${lvl}`}
                >
                  {lvl === 'low' ? 'Zwakke' : lvl === 'medium' ? 'Matige' : 'Sterke'} Alignment
                </button>
              ))}
            </div>

            {/* Alignments specs list */}
            <div className="text-[11px] text-slate-600 bg-white border border-slate-200 rounded-lg p-3 space-y-1 font-mono">
              <div>• Systeembandbreedte (B): <strong className="text-slate-800">{B} MHz</strong></div>
              <div>• Signaalkracht (S): <strong className="text-slate-800">{S} mW</strong></div>
              <div>• Ruis (Misfits &amp; Datafouten) (N): <strong className="text-rose-600 font-bold">{N} mW</strong></div>
              <div>• Signaal-Ruisverhouding (SNR): <strong className="text-slate-850">{snr.toFixed(2)}</strong> ({db.toFixed(1)} dB)</div>
            </div>
          </div>

          {/* Toggle Error Correction (PDCA Loop) */}
          <div className={`p-4 rounded-xl border transition-all ${
            pdcaActive 
              ? 'bg-blue-50/55 border-brand-blue/30 text-brand-blue' 
              : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm flex items-center gap-1.5 text-slate-800">
                  <CheckCircle className={`w-4 h-4 ${pdcaActive ? 'text-brand-accent' : 'text-slate-450'}`} />
                  2. Activeer PDCA-cyclus (Foutencontrole &amp; Feedback)
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-sm">
                  Met PDCA (Plan, Do, Check, Act) worden tussentijdse fouten gedetecteerd (Check) en gecorrigeerd (Act) net zoals redundantie-bits doen in Shannons communicatiesystemen.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pdcaActive}
                  onChange={(e) => setPdcaActive(e.target.checked)}
                  className="sr-only peer"
                  id="channel-pdca-checkbox"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
              </label>
            </div>
          </div>

          <button
            onClick={handleTransmit}
            disabled={isTransmitting}
            className="w-full bg-brand-blue hover:bg-brand-blue-hover disabled:bg-slate-300 text-white font-bold py-3.5 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            id="channel-transmit-btn"
          >
            {isTransmitting ? 'Bits reizen door het kanaal...' : 'Zend Strategisch Signaal Uit (24 bits)'}
          </button>
        </div>

        {/* Math Output and Streaming visualization */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-slate-150 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Theoretische Maximumcapaciteit (Wiskunde)
                </span>
                <span className="text-[10px] text-brand-accent font-bold bg-orange-950 px-2 py-0.5 rounded font-mono uppercase">
                  Shannon-Hartley
                </span>
              </div>
              
              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="text-3xl font-extrabold text-white font-mono tracking-tight" id="channel-capacity-value">
                  {capacity.toFixed(2)}
                </span>
                <span className="text-xs text-brand-accent font-bold uppercase tracking-wider">Mbit/s</span>
              </div>

              {/* Exact calculation details */}
              <div className="text-[11px] font-mono leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-400 mb-4">
                <div className="text-brand-accent font-semibold mb-1">Formule: C = B * log₂(1 + S/N)</div>
                C = {B} * log₂(1 + {S} / {N}) <br />
                C = {B} * log₂({(1 + snr).toFixed(2)}) <br />
                C = {B} * {Math.log2(1 + snr).toFixed(3)} = <span className="text-white font-bold">{capacity.toFixed(2)} Mbit/s</span>
              </div>
            </div>

            {/* Binary transmission visual grid */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-2">
                Real-Time Bit Transmissie (Zender ➔ Ontvanger)
              </span>

              {stream.length === 0 ? (
                <div className="h-20 flex items-center justify-center bg-slate-950 border border-slate-850 rounded-lg text-slate-500 font-mono text-xs italic">
                  Klik op de knop om transmissie te starten
                </div>
              ) : (
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-850">
                  <div className="grid grid-cols-8 gap-1.5">
                    {stream.map((cell, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.02 }}
                        className={`p-1.5 rounded text-center text-xs font-mono font-bold flex flex-col justify-center transition-all ${
                          cell.status === 'ok'
                            ? 'bg-emerald-950/70 border border-emerald-500 text-emerald-400'
                            : cell.status === 'corrected'
                            ? 'bg-orange-950/70 border border-brand-accent text-brand-accent'
                            : 'bg-rose-950/70 border border-rose-500 text-rose-400'
                        }`}
                        title={`Origineel: ${cell.original}, Transmitted: ${cell.transmitted}, Corr: ${cell.corrected}`}
                        id={`channel-bit-${idx}`}
                      >
                        <span className="text-[9px] text-slate-500">#{idx+1}</span>
                        <div className="text-base font-extrabold">{cell.corrected}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Operational stats */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-3 pt-2 border-t border-slate-800">
                    <span>Datastroom: {stats.sent} bits</span>
                    <span className="text-rose-400 font-semibold">Totaal Ruis (Flipped): {stats.corrupted}</span>
                    <span className="text-brand-accent font-bold">PDCA Gecorrigeerd: {stats.fixed}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl border border-orange-200 p-4 text-xs text-slate-700 space-y-1">
            <span className="font-bold flex items-center gap-1 text-orange-800 mb-1">
              <Sparkles className="w-4 h-4 text-brand-accent" />
              Systeem-Inzicht van de Professor:
            </span>
            <p className="leading-relaxed">
              Zonder <strong>Business-IT alignment</strong> (de negen vakken van Rik Maes die niet synchroon draaien), is er sprake van &apos;zwakke alignment&apos;. Dit veroorzaakt data-inconsistentie (ruis) waardoor de strategische overdrachtsnelheid daalt naar <strong>{(B * Math.log2(1 + S/N)).toFixed(1)} Mbit/s</strong>. 
              Door alignment te versterken en de <strong>PDCA-cyclus</strong> (kwaliteitscontrole) strak in te richten, wordt de foutloze signaaloverdracht hersteld!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
