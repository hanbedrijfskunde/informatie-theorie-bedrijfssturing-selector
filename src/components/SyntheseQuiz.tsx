import React, { useState } from 'react';
import { SYNTHESE_QUIZ } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ArrowRight, Award, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';

export default function SyntheseQuiz() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answersLog, setAnswersLog] = useState<{ questionId: number; chosenIdx: number; isCorrect: boolean }[]>([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQuestion = SYNTHESE_QUIZ[currentQuestionIdx];

  const handleOptionSelect = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedOptionIdx(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIdx === null || hasSubmitted) return;

    const isCorrect = selectedOptionIdx === currentQuestion.correctAnswerIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setHasSubmitted(true);
    setAnswersLog(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        chosenIdx: selectedOptionIdx,
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < SYNTHESE_QUIZ.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setHasSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setHasSubmitted(false);
    setScore(0);
    setAnswersLog([]);
    setQuizFinished(false);
  };

  const percentage = (score / SYNTHESE_QUIZ.length) * 100;
  const hasPassed = percentage >= 70;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      {!quizFinished ? (
        <div>
          {/* Header Progress */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-xs font-bold text-brand-blue bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Synthese Quiz (MyEdumundo Koppelingen)
              </span>
              <h3 className="text-lg font-bold text-slate-800 mt-2 font-serif italic">
                Test je Shannon-Inzicht
              </h3>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Vraag <span className="text-brand-blue font-bold">{currentQuestionIdx + 1}</span> van {SYNTHESE_QUIZ.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
            <div
              className="bg-brand-blue h-full transition-all duration-300"
              style={{ width: `${((currentQuestionIdx) / SYNTHESE_QUIZ.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="mb-6 bg-slate-50 p-5 rounded-xl border border-slate-200 font-medium text-slate-800 leading-relaxed text-sm md:text-base">
            {currentQuestion.question}
          </div>

          {/* Options Grid */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, idx) => {
              let btnStyle = "border-slate-200 bg-white hover:border-slate-350 hover:bg-slate-50/50 text-slate-700";
              let iconElement = null;

              if (selectedOptionIdx === idx) {
                btnStyle = "border-brand-blue bg-blue-50/20 text-brand-blue ring-1 ring-brand-blue";
              }

              if (hasSubmitted) {
                if (idx === currentQuestion.correctAnswerIndex) {
                  btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500";
                  iconElement = <Check className="w-4 h-4 text-emerald-600 shrink-0" />;
                } else if (selectedOptionIdx === idx) {
                  btnStyle = "border-rose-500 bg-rose-50 text-rose-950 ring-1 ring-rose-500";
                  iconElement = <X className="w-4 h-4 text-rose-600 shrink-0" />;
                } else {
                  btnStyle = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={hasSubmitted}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center text-xs md:text-sm font-medium cursor-pointer ${btnStyle}`}
                  id={`quiz-option-${idx}`}
                >
                  <span className="leading-relaxed">{option}</span>
                  {iconElement}
                </button>
              );
            })}
          </div>

          {/* Action Button & Explanations */}
          <div className="space-y-4">
            <AnimatePresence>
              {hasSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs space-y-1 border border-slate-800"
                >
                  <strong className="text-brand-accent font-bold flex items-center gap-1">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    Uitleg &amp; Synthese:
                  </strong>
                  <p className="leading-relaxed text-slate-300">
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-end pt-2">
              {!hasSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOptionIdx === null}
                  className="bg-slate-800 hover:bg-slate-900 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3 px-6 rounded-xl text-xs cursor-pointer inline-flex items-center gap-1.5 transition-colors"
                  id="quiz-submit-btn"
                >
                  Controleer Antwoord
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 px-6 rounded-xl text-xs cursor-pointer inline-flex items-center gap-1.5 transition-colors shadow shadow-brand-blue/10"
                  id="quiz-next-btn"
                >
                  {currentQuestionIdx < SYNTHESE_QUIZ.length - 1 ? 'Volgende Vraag' : 'Bekijk Resultaat'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Quiz Finished Screen */
        <div className="text-center py-6">
          <div className="inline-flex p-4 rounded-full mb-4 bg-slate-50 border border-slate-200">
            <Award className={`w-12 h-12 ${hasPassed ? 'text-brand-blue' : 'text-slate-400'}`} />
          </div>

          <h3 className="text-2xl font-bold text-slate-800 font-serif italic">
            Synthese afgerond!
          </h3>
          <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
            Je hebt de 10 Shannon-MyEdumundo overbruggingsvragen voltooid.
          </p>

          <div className="my-6 max-w-sm mx-auto bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div className="text-4xl font-extrabold text-brand-blue font-mono mb-1" id="quiz-score-display">
              {score} / {SYNTHESE_QUIZ.length}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 font-mono">
              Behaalde Score (minimale eis: 70%)
            </div>

            {hasPassed ? (
              <div className="text-emerald-700 bg-emerald-50 border border-emerald-100 py-3 px-4 rounded-xl text-xs font-bold leading-relaxed">
                Slopend geslaagd! 🎉 Je begrijpt hoe de wiskundige wetten van Shannon de fundering vormen voor digitale platformen, sturings-KPI&apos;s en veranderprocessen.
              </div>
            ) : (
              <div className="text-rose-700 bg-rose-50 border border-rose-100 py-3 px-4 rounded-xl text-xs font-bold leading-relaxed flex flex-col gap-2">
                <span className="flex items-center justify-center gap-1"><AlertCircle className="w-4 h-4 text-rose-500" /> Score is onder de 70% drempel.</span>
                <span className="text-rose-600 font-normal">Herzie de theorie van entropy, transactiekosten, en de alignruis van Rik Maes en probeer het nog een keer!</span>
              </div>
            )}
          </div>

          <button
            onClick={handleResetQuiz}
            className="border border-slate-250 hover:border-slate-350 text-slate-650 hover:text-slate-850 font-bold py-3 px-6 rounded-xl text-xs cursor-pointer inline-flex items-center gap-1.5 transition-colors"
            id="quiz-retry-btn"
          >
            <RotateCcw className="w-4 h-4" />
            Opnieuw Proberen
          </button>
        </div>
      )}
    </div>
  );
}
