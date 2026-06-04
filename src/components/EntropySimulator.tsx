import React, { useState } from 'react';
import { Sliders, Database, TrendingDown, BookOpen, AlertCircle } from 'lucide-react';

export default function EntropySimulator() {
  // Scenario 1: Binary state (Success vs Failure of a product, e.g. Bol Recept+ or CampusBite launch)
  const [pSuccess, setPSuccess] = useState<number>(0.5);

  // Scenario 2: 4-State Category demand for clothing store (Edstack 2)
  const [probs, setProbs] = useState<number[]>([0.25, 0.25, 0.25, 0.25]);

  const [activeTab, setActiveTab] = useState<'binary' | 'multistate'>('binary');

  // Math helper for log2
  const log2 = (val: number) => (val === 0 ? 0 : Math.log2(val));

  // Compute binary entropy
  const pFail = 1 - pSuccess;
  const binaryEntropy = -(pSuccess * log2(pSuccess) + pFail * log2(pFail));

  // Compute multistate entropy
  const multiEntropy = -probs.reduce((sum, p) => sum + p * log2(p), 0);

  // Handle a slider change in 4-state and normalize other values
  const handleMultiSliderChange = (index: number, value: number) => {
    const updatedProbs = [...probs];
    const oldValue = updatedProbs[index];
    updatedProbs[index] = value;

    const remainingSum = 1 - value;
    const oldOthersSum = probs.reduce((sum, val, idx) => (idx === index ? sum : sum + val), 0);

    if (oldOthersSum === 0) {
      // Re-distribute evenly if old sum of others was 0
      const evenVal = remainingSum / (probs.length - 1);
      for (let i = 0; i < probs.length; i++) {
        if (i !== index) updatedProbs[i] = evenVal;
      }
    } else {
      // Scale others proportionally to keep their ratio
      for (let i = 0; i < probs.length; i++) {
        if (i !== index) {
          updatedProbs[i] = (probs[i] / oldOthersSum) * remainingSum;
        }
      }
    }

    setProbs(updatedProbs.map(p => Math.max(0, p)));
  };

  const handleNormalize = () => {
    setProbs([0.25, 0.25, 0.25, 0.25]);
  };

  // Determine Data Maturity level based on multiState entropy
  // High entropy (near 2.0 bits) means high uncertainty
  // Low entropy (near 0.0 bits) means high predictability
  const getMaturityLevel = (entropyValue: number, maxEntropy: number) => {
    const ratio = entropyValue / maxEntropy;
    if (ratio > 0.8) {
      return {
        level: "Niveau 1: Data-Exploring (Intuïtie)",
        desc: "Zeer hoge onzekerheid. Er is geen betrouwbare data. Beslissingen worden hoofdzakelijk op basis van onderbuikgevoel genomen. Risico op fouten is maximaal.",
        color: "text-ink bg-pink"
      };
    } else if (ratio > 0.5) {
      return {
        level: "Niveau 2: Data-Informed (Dashboarding)",
        desc: "Middelmatige onzekerheid. Historische data (Descriptive Analytics) brengt trends in beeld, waardoor grote veronderstellingen worden geëlimineerd.",
        color: "text-ink bg-violet/30"
      };
    } else if (ratio > 0.2) {
      return {
        level: "Niveau 3: Data-Driven (Predictive)",
        desc: "Lage onzekerheid. Door regressie en AI-modellen voorspellen we de vraag nauwkeurig. We weten vooraf wat de klant wil bestellen (Edstack 2).",
        color: "text-ink bg-blue/20"
      };
    } else {
      return {
        level: "Niveau 4: Data-Transformed (Prescriptive)",
        desc: "Minimale onzekerheid. Systemen anticiperen automatisch en sturen processen direct bij. De feedbacklus is zo direct dat verrassingen uitblijven.",
        color: "text-ink bg-lime"
      };
    }
  };  const currentMaturity = activeTab === 'binary' 
    ? getMaturityLevel(binaryEntropy, 1) 
    : getMaturityLevel(multiEntropy, 2);

  return (
    <div className="nb-card p-6">
      <div className="mb-6">
        <span className="nb-pill nb-pill-pink">⬗ Quest 2 · Tame the Entropy Beast</span>
        <div className="flex items-center gap-2 mt-2.5">
          <Database className="w-6 h-6 text-blue" />
          <h2 className="text-2xl">
            Simulatie 1: Entropy (H) &amp; Datagedreven sturen (Edstack 2)
          </h2>
        </div>
        <p className="text-muted text-sm mt-1.5 font-medium">
          Shannon definieerde <strong>Entropy (H)</strong> wiskundig als de mate van onzekerheid of verrassing in een systeem. Ontdek hoe dataverzameling de entropy reduceert en jouw datavolwassenheid verhoogt.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab('binary')}
          className={`nb-btn px-4 py-2 text-sm ${
            activeTab === 'binary' ? 'nb-btn-pink' : 'nb-btn-ghost'
          }`}
          id="entropy-tab-binary"
        >
          Binair Scenario (Succes vs. Faal)
        </button>
        <button
          onClick={() => setActiveTab('multistate')}
          className={`nb-btn px-4 py-2 text-sm ${
            activeTab === 'multistate' ? 'nb-btn-pink' : 'nb-btn-ghost'
          }`}
          id="entropy-tab-multi"
        >
          Multi-State Scenario (Clothing Store Demand)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sliders and Controls */}
        <div className="space-y-6">
          <div className="bg-cream nb-box p-4">
            <h3 className="text-sm mb-3 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-blue" />
              Systeemparameters Instellen
            </h3>

            {activeTab === 'binary' ? (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-muted mb-1.5 font-mono font-bold">
                    <span>Kans op Succes (p₁): {(pSuccess * 100).toFixed(0)}%</span>
                    <span>Kans op Mislukking (p₂): {(pFail * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={pSuccess}
                    onChange={(e) => setPSuccess(parseFloat(e.target.value))}
                    className="nb-slider"
                    id="entropy-binary-range"
                  />
                </div>
                <div className="text-xs font-medium bg-blue/10 nb-box p-3 flex gap-2">
                  <AlertCircle className="w-4 h-4 text-pink shrink-0" />
                  <span>
                    Merk op dat de onzekerheid (entropy) minimaal is bij 0% of 100% kans (geen verrassing mogelijk) en maximaal bij exact 50%.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2 gap-2">
                  <span className="nb-eyebrow">Productgroepen (Kledingwinkel):</span>
                  <button
                    onClick={handleNormalize}
                    className="nb-btn nb-btn-blue text-[11px] px-2 py-1"
                    id="entropy-normalize-btn"
                  >
                    Reset naar Uniform (Maximale Entropy)
                  </button>
                </div>
                {['T-shirts', 'Winterjassen', 'Schoenen', 'Accessoires'].map((name, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-mono font-bold text-muted mb-1.5">
                      <span>{name} (p_{idx + 1}):</span>
                      <span className="nb-score">{(probs[idx] * 100).toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={probs[idx]}
                      onChange={(e) => handleMultiSliderChange(idx, parseFloat(e.target.value))}
                      className="nb-slider"
                      id={`entropy-multi-range-${idx}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Theoretical Connection */}
          <div className="nb-panel-dark p-5">
            <h4 className="text-sm mb-2 flex items-center gap-1.5 text-pink">
              <BookOpen className="w-4 h-4" />
              Link met Edstack 2 (Datagedreven Sturen):
            </h4>
            <p className="text-xs leading-relaxed text-cream/80 font-medium">
              In de business kan &apos;onzekerheid&apos; leiden tot overschotten of tekorten (bijv. te veel winterjassen inkopen terwijl het warm blijft).
              Door <strong>Diagnostic Analytics</strong> en predictive AI-modellen verminderen we deze entropy. Hoe beter de predictive analytics, hoe schever (gerichter) de verdeling wordt, en hoe dichter de entropy bij 0 bits ligt.
            </p>
          </div>
        </div>

        {/* Math Calculation & Graph Visuals */}
        <div className="space-y-6">
          <div className="nb-panel-dark p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 gap-2">
                <span className="nb-eyebrow !text-cream">
                  Wiskundige Output
                </span>
                <span className="nb-pill nb-pill-lime !text-[0.6rem]">
                  Berekend in bits
                </span>
              </div>

              {/* CHAOS METER readout */}
              <div className="nb-eyebrow !text-pink mb-1">⬗ Chaos Meter · H(X)</div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="nb-score text-5xl text-lime" id="entropy-value-display">
                  {(activeTab === 'binary' ? binaryEntropy : multiEntropy).toFixed(4)}
                </span>
                <span className="text-cream/70 text-sm font-bold">bits per beslissing</span>
              </div>

              {/* Step-by-step formula */}
              <div className="text-xs font-mono bg-cream text-ink nb-box p-3 space-y-1.5 overflow-x-auto">
                <div className="text-blue font-bold">Shannon&apos;s Entropy Formule:</div>
                <div className="text-[11px] text-muted">H(X) = - ∑ p_i * log₂(p_i)</div>
                <div className="text-blue font-bold border-t-[3px] border-ink pt-1.5 mt-1.5">
                  Berekening:
                </div>
                {activeTab === 'binary' ? (
                  <div className="leading-relaxed">
                    H(X) = - [ ({pSuccess.toFixed(2)} * log₂({pSuccess.toFixed(2)})) + ({pFail.toFixed(2)} * log₂({pFail.toFixed(2)})) ]
                    <br />
                    H(X) = - [ ({pSuccess.toFixed(2)} * {log2(pSuccess).toFixed(2)}) + ({pFail.toFixed(2)} * {log2(pFail).toFixed(2)}) ]
                    <br />
                    H(X) = <span className="font-bold text-pink">{binaryEntropy.toFixed(4)} bits</span>
                  </div>
                ) : (
                  <div className="leading-relaxed text-[11px] max-h-32 overflow-y-auto font-mono">
                    H(X) = - [
                    {probs.map((p, idx) => (
                      <span key={idx}>
                        ({p.toFixed(2)} * log₂({p.toFixed(2)}))
                        {idx < probs.length - 1 ? ' + ' : ''}
                      </span>
                    ))}
                    ]
                    <br />
                    H(X) = - [
                    {probs.map((p, idx) => (
                      <span key={idx}>
                        ({p.toFixed(2)} * {log2(p).toFixed(2)})
                        {idx < probs.length - 1 ? ' + ' : ''}
                      </span>
                    ))}
                    ]
                    <br />
                    H(X) = <span className="font-bold text-pink">{multiEntropy.toFixed(4)} bits</span> (Max is {Math.log2(4).toFixed(1)} bits)
                  </div>
                )}
              </div>
            </div>

            {/* Binary Entropy Curve (Visual Canvas) */}
            {activeTab === 'binary' && (
              <div className="mt-4 pt-4 border-t-[3px] border-cream/30">
                <div className="text-xs font-bold text-cream mb-1 flex justify-between gap-2">
                  <span>Visuele Entropy-curve:</span>
                  <span className="font-mono text-[10px] text-lime">Kans (x) vs. Entropy (y)</span>
                </div>
                <div className="h-28 w-full relative pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30">
                    {/* Background curve */}
                    <path
                      d="M 0,30 Q 50,0 100,30"
                      fill="none"
                      stroke="#C9F227"
                      strokeWidth="2"
                    />
                    {/* Active Point tracker */}
                    <circle
                      cx={pSuccess * 100}
                      cy={30 - (binaryEntropy * 30)}
                      r="4"
                      fill="#FF4FA3"
                      className="animate-pulse"
                    />
                    {/* Guidelines */}
                    <line
                      x1={pSuccess * 100}
                      y1="30"
                      x2={pSuccess * 100}
                      y2={30 - (binaryEntropy * 30)}
                      stroke="#FFFCF2"
                      strokeWidth="1"
                      strokeDasharray="2"
                    />
                  </svg>
                  <div className="flex justify-between text-[9px] text-cream/60 mt-1 font-mono">
                    <span>p=0 (Zekerheid)</span>
                    <span>p=0.5 (Max Ruis/Uncertainty)</span>
                    <span>p=1 (Zekerheid)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Org Data Maturity representation */}
          <div className={`p-4 nb-box transition-all ${currentMaturity.color}`} id="entropy-maturity-card">
            <div className="flex items-center gap-2 mb-1.5">
              <TrendingDown className="w-4 h-4 shrink-0" />
              <span className="font-bold text-sm uppercase tracking-wide">
                Gekoppeld Organisatieniveau (Edstack 2):
              </span>
            </div>
            <strong className="block text-sm mb-1">{currentMaturity.level}</strong>
            <p className="text-xs leading-relaxed font-medium opacity-95">{currentMaturity.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
