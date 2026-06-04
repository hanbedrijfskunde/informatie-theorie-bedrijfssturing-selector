import React, { useState } from 'react';
import { LESSON_PLAN } from '../data';
import { motion } from 'motion/react';
import { Calendar, BookOpen, Clock, Users, GraduationCap } from 'lucide-react';

export default function LessonPlanner() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Arcade timeline accents — cycle per phase for that BIT QUEST feel.
  const accents = ['bg-lime', 'bg-pink', 'bg-blue', 'bg-violet'] as const;
  const pills = ['nb-pill-lime', 'nb-pill-pink', 'nb-pill-blue', 'nb-pill-violet'] as const;

  return (
    <div className="nb-card p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="nb-pill nb-pill-blue">⬗ Game Master · 90 min</span>
          <h2 className="text-2xl mt-2.5">
            Lesvoorbereiding: 90 minuten Module-opbouw
          </h2>
          <p className="text-muted text-sm mt-1.5 font-medium max-w-2xl">
            Dit lesplan helpt jou als docent om de abstracte Informatietheorie tastbaar te maken via de interactieve simulaties in deze webapp.
          </p>
        </div>
        <div className="nb-pill nb-pill-ink self-start md:self-auto !text-[0.65rem] py-2">
          <Clock className="w-4 h-4" />
          <span>Totaal: 90 minuten</span>
        </div>
      </div>

      {/* 90m Timetable Breakdown */}
      <div className="space-y-4 mb-8">
        <h3 className="text-sm mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue" />
          Interactieve Tijdlijn
        </h3>

        <div className="space-y-4">
          {LESSON_PLAN.map((slot, idx) => {
            const isExpanded = expandedIndex === idx;
            const accent = accents[idx % accents.length];
            const pill = pills[idx % pills.length];
            return (
              <div key={idx} className="relative">
                <div
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className={`p-4 nb-box transition-all cursor-pointer ${
                    isExpanded
                      ? `${accent} text-ink -translate-y-0.5 nb-shadow-md`
                      : 'bg-cream text-ink hover:-translate-y-0.5 hover:nb-shadow'
                  }`}
                  id={`planner-slot-${idx}`}
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`nb-pill ${pill}`}>
                        <span className="nb-score">{slot.time}</span>
                      </span>
                      <h4 className="font-bold text-sm md:text-base">
                        {slot.title}
                      </h4>
                    </div>
                    <span className="nb-pill nb-pill-ink">
                      {slot.linkEdstack}
                    </span>
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t-[3px] border-ink space-y-3 text-xs md:text-sm"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white nb-box p-3">
                          <strong className="text-blue font-bold mb-1 flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-blue" />
                            Activiteit Docent:
                          </strong>
                          <p className="leading-relaxed text-[11px] md:text-xs text-muted font-medium">{slot.activityDocent}</p>
                        </div>
                        <div className="bg-white nb-box p-3">
                          <strong className="text-ink font-bold mb-1 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-ink" />
                            Activiteit Student:
                          </strong>
                          <p className="leading-relaxed text-[11px] md:text-xs text-muted font-medium">{slot.activityStudent}</p>
                        </div>
                      </div>
                      <div className="nb-eyebrow flex justify-between">
                        <span>Thema focus: <strong className="text-ink">{slot.shannonFocus}</strong></span>
                        <span>Duur: <strong className="text-ink nb-score">{slot.duration}</strong> minuten</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Teacher debattering stellingen */}
      <div className="nb-panel-dark p-5 space-y-4">
        <h3 className="text-sm text-lime flex items-center gap-2 uppercase tracking-wide">
          <GraduationCap className="w-5 h-5 text-lime" />
          Klassikale Debatstellingen: Shannon &amp; Bedrijfskunde
        </h3>
        <p className="text-xs text-cream/80 leading-relaxed font-medium">
          Gooi deze uitdagende stellingen tijdens de module in de groep om studenten kritisch te laten nadenken over de wisselwerking tussen wiskundige theorie en bedrijfsvoering.
        </p>

        <div className="space-y-3 pt-2">
          <div className="bg-cream nb-box p-3">
            <strong className="text-xs text-ink block">Stelling 1: Platforms zijn slechts wiskundige encoders</strong>
            <p className="text-[11px] text-muted leading-relaxed mt-1 font-medium">
              &quot;Een digitaal platform zoals Bol.com is geen economisch wonder, maar puur een wiskundig handigheidje om de onnodige en dure communicatie-redundantie (de transactiekosten volgens Williamson) te elimineren.&quot;
            </p>
          </div>

          <div className="bg-cream nb-box p-3">
            <strong className="text-xs text-ink block">Stelling 2: Organisatorische chaos is pure warmteruis</strong>
            <p className="text-[11px] text-muted leading-relaxed mt-1 font-medium">
              &quot;Slechte business-IT alignment is simpelweg de organisatorische vertaling van Shannons fysieke ruistoename. Geen enkele strategische verandering (Edstack 3) kan succesvol zijn zonder eerst de foutcorrectie (PDCA feedbackloops) te activeren.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
