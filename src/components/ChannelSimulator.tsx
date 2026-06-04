import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Network, Power, Sparkles, CheckCircle } from 'lucide-react';

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
    <div className="nb-card p-6">
      <div className="mb-6">
        <span className="nb-pill nb-pill-violet">⬗ Quest 4 · Beat the Noise</span>
        <div className="flex items-center gap-2 mt-2.5">
          <Network className="w-6 h-6 text-violet" />
          <h2 className="text-xl">
            Simulatie 3: Kanaalcapaciteit &amp; Feedback Ruiscorrectie (Edstacks 3 &amp; 4)
          </h2>
        </div>
        <p className="text-muted text-sm mt-1.5 font-medium">
          Volgens de <strong>Shannon-Hartley Theorem</strong> hangt de betrouwbare datasnelheid af van bandbreedte en ruis. Ontdek hoe organisatorische <strong>Business-IT alignment</strong> de ruis minimaliseert, en hoe de <strong>PDCA-cyclus</strong> als wiskundige foutcorrectie fungeert om foutloze executie te borgen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls Column */}
        <div className="space-y-6">
          <div className="bg-violet/12 nb-box p-4 space-y-5">
            <h3 className="text-sm flex items-center gap-1.5">
              <Power className="w-4 h-4 text-violet animate-pulse" />
              1. Business-IT Alignment (Negenvlaksmodel Rik Maes)
            </h3>

            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setAlignment(lvl)}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide nb-box transition-all cursor-pointer ${
                    alignment === lvl
                      ? 'bg-violet text-cream nb-shadow'
                      : 'bg-white text-muted hover:-translate-y-0.5'
                  }`}
                  id={`channel-alignment-${lvl}`}
                >
                  {lvl === 'low' ? 'Zwakke' : lvl === 'medium' ? 'Matige' : 'Sterke'} Alignment
                </button>
              ))}
            </div>

            {/* Alignments specs list */}
            <div className="text-[11px] text-ink/80 bg-white nb-box p-3 space-y-1.5 font-mono font-medium">
              <div>• Systeembandbreedte (B): <strong className="nb-score text-ink">{B} MHz</strong></div>
              <div>• Signaalkracht (S): <strong className="nb-score text-ink">{S} mW</strong></div>
              <div>• Ruis (Misfits &amp; Datafouten) (N): <strong className="nb-score text-[#FF5252]">{N} mW</strong></div>
              <div>• Signaal-Ruisverhouding (SNR): <strong className="nb-score text-ink">{snr.toFixed(2)}</strong> ({db.toFixed(1)} dB)</div>
            </div>
          </div>

          {/* Toggle Error Correction (PDCA Loop) */}
          <div className={`nb-box p-4 transition-all ${
            pdcaActive
              ? 'bg-lime'
              : 'bg-cream'
          }`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h4 className="text-sm flex items-center gap-1.5 text-ink">
                  <CheckCircle className={`w-4 h-4 ${pdcaActive ? 'text-ink' : 'text-muted'}`} />
                  2. Activeer PDCA-cyclus (Foutencontrole &amp; Feedback)
                </h4>
                <p className="text-[11px] text-ink/70 font-medium mt-1 max-w-sm">
                  Met PDCA (Plan, Do, Check, Act) worden tussentijdse fouten gedetecteerd (Check) en gecorrigeerd (Act) net zoals redundantie-bits doen in Shannons communicatiesystemen.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={pdcaActive}
                  onChange={(e) => setPdcaActive(e.target.checked)}
                  className="sr-only peer"
                  id="channel-pdca-checkbox"
                />
                <div className="w-12 h-7 bg-white border-[3px] border-ink peer-focus:outline-none peer peer-checked:after:translate-x-[20px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-ink after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-violet peer-checked:after:bg-cream"></div>
              </label>
            </div>
          </div>

          <button
            onClick={handleTransmit}
            disabled={isTransmitting}
            className="nb-btn nb-btn-violet w-full py-3.5 px-4 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            id="channel-transmit-btn"
          >
            {isTransmitting ? 'Bits reizen door het kanaal...' : 'Zend Strategisch Signaal Uit (24 bits)'}
          </button>
        </div>

        {/* Math Output and Streaming visualization */}
        <div className="space-y-6">
          <div className="nb-panel-dark p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="nb-eyebrow !text-cream/60">
                  Theoretische Maximumcapaciteit (Wiskunde)
                </span>
                <span className="nb-pill nb-pill-violet !text-[0.6rem]">
                  Shannon-Hartley
                </span>
              </div>

              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="nb-score text-4xl text-lime" id="channel-capacity-value">
                  {capacity.toFixed(2)}
                </span>
                <span className="text-xs text-violet font-bold uppercase tracking-wider">Mbit/s</span>
              </div>

              {/* Exact calculation details */}
              <div className="text-[11px] font-mono leading-relaxed bg-cream/10 nb-box border-cream/30 p-3 text-cream/80 mb-4">
                <div className="text-violet font-bold mb-1">Formule: C = B * log₂(1 + S/N)</div>
                C = {B} * log₂(1 + {S} / {N}) <br />
                C = {B} * log₂({(1 + snr).toFixed(2)}) <br />
                C = {B} * {Math.log2(1 + snr).toFixed(3)} = <span className="text-lime font-bold">{capacity.toFixed(2)} Mbit/s</span>
              </div>
            </div>

            {/* Binary transmission visual grid */}
            <div>
              <span className="nb-eyebrow !text-cream/60 block mb-2">
                Real-Time Bit Transmissie (Zender ➔ Ontvanger)
              </span>

              {stream.length === 0 ? (
                <div className="h-20 flex items-center justify-center bg-cream/10 nb-box border-cream/30 text-cream/50 font-mono text-xs">
                  Klik op de knop om transmissie te starten
                </div>
              ) : (
                <div className="bg-cream/10 nb-box border-cream/30 p-3">
                  <div className="grid grid-cols-8 gap-1.5">
                    {stream.map((cell, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.02 }}
                        className={`p-1.5 nb-box text-center text-xs font-mono font-bold flex flex-col justify-center ${
                          cell.status === 'ok'
                            ? 'bg-lime text-ink'
                            : cell.status === 'corrected'
                            ? 'bg-violet text-cream'
                            : 'bg-[#FF5252] text-ink'
                        }`}
                        title={`Origineel: ${cell.original}, Transmitted: ${cell.transmitted}, Corr: ${cell.corrected}`}
                        id={`channel-bit-${idx}`}
                      >
                        <span className="text-[9px] opacity-70">#{idx+1}</span>
                        <div className="nb-score text-base">{cell.corrected}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Operational stats */}
                  <div className="flex justify-between items-center text-[10px] text-cream/70 font-mono mt-3 pt-2 border-t border-cream/30">
                    <span>Datastroom: <span className="nb-score text-cream">{stats.sent}</span> bits</span>
                    <span className="text-[#FF5252] font-bold">Totaal Ruis (Flipped): <span className="nb-score">{stats.corrupted}</span></span>
                    <span className="text-violet font-bold">PDCA Gecorrigeerd: <span className="nb-score">{stats.fixed}</span></span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-pink/12 nb-box p-4 text-xs text-ink/80 font-medium space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-ink mb-1">
              <Sparkles className="w-4 h-4 text-pink" />
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
