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
    <div className="nb-card p-6">
      {!quizFinished ? (
        <div>
          {/* Header Progress — HUD */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <span className="nb-pill nb-pill-pink">⚔ Boss Fight · Synthese</span>
              <h3 className="text-2xl mt-2.5">
                Test je Shannon-Inzicht
              </h3>
              <p className="nb-eyebrow mt-1.5">
                Synthese Quiz (MyEdumundo Koppelingen)
              </p>
            </div>
            <div className="flex items-center gap-2 self-start">
              <span className="nb-pill nb-pill-ink">
                <span className="nb-score">{currentQuestionIdx + 1}</span>
                / {SYNTHESE_QUIZ.length} Vraag
              </span>
              <span className="nb-pill nb-pill-lime">
                <span className="nb-score">{score}</span> XP
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-4 bg-cream nb-box mb-6 overflow-hidden">
            <div
              className="bg-pink h-full transition-all duration-300 border-r-[3px] border-ink"
              style={{ width: `${((currentQuestionIdx) / SYNTHESE_QUIZ.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="mb-6 bg-cream nb-box p-5 font-medium text-ink leading-relaxed text-sm md:text-base">
            {currentQuestion.question}
          </div>

          {/* Options Grid */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, idx) => {
              let btnStyle = "bg-white text-ink hover:-translate-y-0.5 hover:nb-shadow";
              let iconElement = null;

              if (selectedOptionIdx === idx) {
                btnStyle = "bg-blue text-cream nb-shadow";
              }

              if (hasSubmitted) {
                if (idx === currentQuestion.correctAnswerIndex) {
                  btnStyle = "bg-lime text-ink nb-shadow";
                  iconElement = <Check className="w-5 h-5 text-ink shrink-0" />;
                } else if (selectedOptionIdx === idx) {
                  btnStyle = "bg-[#FF5252] text-ink nb-shadow";
                  iconElement = <X className="w-5 h-5 text-ink shrink-0" />;
                } else {
                  btnStyle = "bg-white text-muted opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={hasSubmitted}
                  className={`w-full text-left p-4 nb-box transition-all flex justify-between items-center gap-3 text-xs md:text-sm font-bold cursor-pointer ${btnStyle}`}
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
                  className="nb-panel-dark p-4 text-xs space-y-1.5"
                >
                  <strong className="text-pink font-bold flex items-center gap-1.5 uppercase tracking-wide">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    Uitleg &amp; Synthese:
                  </strong>
                  <p className="leading-relaxed text-cream/90 font-medium">
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
                  className="nb-btn nb-btn-ink py-3 px-6 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                  id="quiz-submit-btn"
                >
                  Controleer Antwoord
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="nb-btn nb-btn-pink py-3 px-6 text-xs"
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
          <div className={`inline-flex p-4 mb-4 nb-box nb-shadow-md ${hasPassed ? 'bg-lime' : 'bg-[#FF5252]'}`}>
            <Award className="w-12 h-12 text-ink" />
          </div>

          <h3 className="text-3xl">
            Synthese afgerond!
          </h3>
          <p className="text-muted text-sm mt-2 font-medium max-w-md mx-auto">
            Je hebt de 10 Shannon-MyEdumundo overbruggingsvragen voltooid.
          </p>

          <div className="my-6 max-w-sm mx-auto bg-cream nb-box nb-shadow-md p-6">
            <div className="nb-score text-5xl text-ink mb-1" id="quiz-score-display">
              {score} / {SYNTHESE_QUIZ.length}
            </div>
            <div className="nb-eyebrow mb-4">
              Behaalde Score (minimale eis: 70%)
            </div>

            {hasPassed ? (
              <div className="bg-lime text-ink nb-box py-3 px-4 text-xs font-bold leading-relaxed">
                Slopend geslaagd! 🎉 Je begrijpt hoe de wiskundige wetten van Shannon de fundering vormen voor digitale platformen, sturings-KPI&apos;s en veranderprocessen.
              </div>
            ) : (
              <div className="bg-[#FF5252]/20 text-ink nb-box py-3 px-4 text-xs font-bold leading-relaxed flex flex-col gap-2">
                <span className="flex items-center justify-center gap-1.5 uppercase tracking-wide"><AlertCircle className="w-4 h-4 text-ink shrink-0" /> Score is onder de 70% drempel.</span>
                <span className="font-medium normal-case">Herzie de theorie van entropy, transactiekosten, en de alignruis van Rik Maes en probeer het nog een keer!</span>
              </div>
            )}
          </div>

          <button
            onClick={handleResetQuiz}
            className="nb-btn py-3 px-6 text-xs"
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
