import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Sliders, Database, TrendingDown, BookOpen, AlertCircle } from 'lucide-react';

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
        color: "text-rose-600 bg-rose-50 border-rose-200"
      };
    } else if (ratio > 0.5) {
      return {
        level: "Niveau 2: Data-Informed (Dashboarding)",
        desc: "Middelmatige onzekerheid. Historische data (Descriptive Analytics) brengt trends in beeld, waardoor grote veronderstellingen worden geëlimineerd.",
        color: "text-amber-600 bg-amber-50 border-amber-200"
      };
    } else if (ratio > 0.2) {
      return {
        level: "Niveau 3: Data-Driven (Predictive)",
        desc: "Lage onzekerheid. Door regressie en AI-modellen voorspellen we de vraag nauwkeurig. We weten vooraf wat de klant wil bestellen (Edstack 2).",
        color: "text-emerald-600 bg-emerald-50 border-emerald-200"
      };
    } else {
      return {
        level: "Niveau 4: Data-Transformed (Prescriptive)",
        desc: "Minimale onzekerheid. Systemen anticiperen automatisch en sturen processen direct bij. De feedbacklus is zo direct dat verrassingen uitblijven.",
        color: "text-indigo-600 bg-indigo-50 border-indigo-200"
      };
    }
  };  const currentMaturity = activeTab === 'binary' 
    ? getMaturityLevel(binaryEntropy, 1) 
    : getMaturityLevel(multiEntropy, 2);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Database className="w-6 h-6 text-brand-blue" />
          <h2 className="text-xl font-bold text-slate-800 font-serif italic">
            Simulatie 1: Entropy (H) &amp; Datagedreven sturen (Edstack 2)
          </h2>
        </div>
        <p className="text-slate-600 text-sm mt-1">
          Shannon definieerde <strong>Entropy (H)</strong> wiskundig als de mate van onzekerheid of verrassing in een systeem. Ontdek hoe dataverzameling de entropy reduceert en jouw datavolwassenheid verhoogt.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab('binary')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'binary'
              ? 'border-brand-blue text-brand-blue'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
          id="entropy-tab-binary"
        >
          Binair Scenario (Succes vs. Faal)
        </button>
        <button
          onClick={() => setActiveTab('multistate')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'multistate'
              ? 'border-brand-blue text-brand-blue'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
          id="entropy-tab-multi"
        >
          Multi-State Scenario (Clothing Store Demand)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sliders and Controls */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-700 text-sm mb-3 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-brand-blue" />
              Systeemparameters Instellen
            </h3>

            {activeTab === 'binary' ? (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1 font-mono">
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
                    className="w-full accent-brand-blue"
                    id="entropy-binary-range"
                  />
                </div>
                <div className="text-xs text-slate-500 italic bg-orange-50 border border-orange-100 p-3 rounded-lg flex gap-2">
                  <AlertCircle className="w-4 h-4 text-brand-accent shrink-0" />
                  <span>
                    Merk op dat de onzekerheid (entropy) minimaal is bij 0% of 100% kans (geen verrassing mogelijk) en maximaal bij exact 50%.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-600">Productgroepen (Kledingwinkel):</span>
                  <button
                    onClick={handleNormalize}
                    className="text-[11px] px-2 py-1 text-brand-blue bg-blue-50 hover:bg-blue-100 rounded font-semibold"
                    id="entropy-normalize-btn"
                  >
                    Reset naar Uniform (Maximale Entropy)
                  </button>
                </div>
                {['T-shirts', 'Winterjassen', 'Schoenen', 'Accessoires'].map((name, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-mono text-slate-500 mb-1">
                      <span>{name} (p_{idx + 1}):</span>
                      <span>{(probs[idx] * 100).toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={probs[idx]}
                      onChange={(e) => handleMultiSliderChange(idx, parseFloat(e.target.value))}
                      className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                      id={`entropy-multi-range-${idx}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Theoretical Connection */}
          <div className="bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-800 shadow-sm">
            <h4 className="font-bold text-sm mb-2 flex items-center gap-1 text-brand-accent font-serif">
              <BookOpen className="w-4 h-4" />
              Link met Edstack 2 (Datagedreven Sturen):
            </h4>
            <p className="text-xs leading-relaxed text-slate-300">
              In de business kan &apos;onzekerheid&apos; leiden tot overschotten of tekorten (bijv. te veel winterjassen inkopen terwijl het warm blijft). 
              Door <strong>Diagnostic Analytics</strong> en predictive AI-modellen verminderen we deze entropy. Hoe beter de predictive analytics, hoe schever (gerichter) de verdeling wordt, en hoe dichter de entropy bij 0 bits ligt.
            </p>
          </div>
        </div>

        {/* Math Calculation & Graph Visuals */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-250 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                  Wiskundige Output
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-200 px-2 py-0.5 rounded uppercase font-bold">
                  Berekend in bits
                </span>
              </div>

              {/* Big metric display */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-brand-blue font-mono tracking-tight" id="entropy-value-display">
                  {(activeTab === 'binary' ? binaryEntropy : multiEntropy).toFixed(4)}
                </span>
                <span className="text-slate-400 text-sm font-semibold">bits per beslissing</span>
              </div>

              {/* Step-by-step formula */}
              <div className="text-xs font-mono text-slate-600 bg-white p-3 rounded-lg border border-slate-200/80 space-y-1.5 overflow-x-auto">
                <div className="text-brand-blue font-bold">Shannon&apos;s Entropy Formule:</div>
                <div className="text-[11px] text-slate-405">H(X) = - ∑ p_i * log₂(p_i)</div>
                <div className="text-brand-blue-hover font-semibold border-t border-slate-100 pt-1.5 mt-1.5">
                  Berekening:
                </div>
                {activeTab === 'binary' ? (
                  <div className="leading-relaxed">
                    H(X) = - [ ({pSuccess.toFixed(2)} * log₂({pSuccess.toFixed(2)})) + ({pFail.toFixed(2)} * log₂({pFail.toFixed(2)})) ]
                    <br />
                    H(X) = - [ ({pSuccess.toFixed(2)} * {log2(pSuccess).toFixed(2)}) + ({pFail.toFixed(2)} * {log2(pFail).toFixed(2)}) ]
                    <br />
                    H(X) = <span className="font-bold text-brand-accent">{binaryEntropy.toFixed(4)} bits</span>
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
                    H(X) = <span className="font-bold text-brand-accent">{multiEntropy.toFixed(4)} bits</span> (Max is {Math.log2(4).toFixed(1)} bits)
                  </div>
                )}
              </div>
            </div>

            {/* Binary Entropy Curve (Visual Canvas) */}
            {activeTab === 'binary' && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="text-xs font-semibold text-slate-500 mb-1 flex justify-between">
                  <span>Visuele Entropy-curve:</span>
                  <span className="font-mono text-[10px] text-brand-blue">Kans (x) vs. Entropy (y)</span>
                </div>
                <div className="h-28 w-full relative pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30">
                    {/* Background curve */}
                    <path
                      d="M 0,30 Q 50,0 100,30"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="2"
                    />
                    {/* Active Point tracker */}
                    <circle
                      cx={pSuccess * 100}
                      cy={30 - (binaryEntropy * 30)}
                      r="4"
                      fill="#f27d26"
                      className="animate-pulse"
                    />
                    {/* Guidelines */}
                    <line
                      x1={pSuccess * 100}
                      y1="30"
                      x2={pSuccess * 100}
                      y2={30 - (binaryEntropy * 30)}
                      stroke="#1e3a8a"
                      strokeWidth="1"
                      strokeDasharray="2"
                    />
                  </svg>
                  <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-mono">
                    <span>p=0 (Zekerheid)</span>
                    <span>p=0.5 (Max Ruis/Uncertainty)</span>
                    <span>p=1 (Zekerheid)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Org Data Maturity representation */}
          <div className={`p-4 rounded-xl border transition-all ${currentMaturity.color}`} id="entropy-maturity-card">
            <div className="flex items-center gap-2 mb-1.5">
              <TrendingDown className="w-4 h-4 shrink-0" />
              <span className="font-bold text-sm uppercase tracking-wide">
                Gekoppeld Organisatieniveau (Edstack 2):
              </span>
            </div>
            <strong className="block text-sm mb-1">{currentMaturity.level}</strong>
            <p className="text-xs leading-relaxed opacity-95">{currentMaturity.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
