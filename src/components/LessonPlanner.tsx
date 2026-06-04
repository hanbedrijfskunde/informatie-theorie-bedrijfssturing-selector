import React, { useState } from 'react';
import { LESSON_PLAN } from '../data';
import { motion } from 'motion/react';
import { Calendar, BookOpen, Clock, Users, GraduationCap } from 'lucide-react';

export default function LessonPlanner() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 text-xs font-semibold text-brand-blue bg-blue-50 rounded-full">
            Docenten Tooling
          </span>
          <h2 className="text-xl font-bold text-slate-800 mt-2 font-serif italic">
            Lesvoorbereiding: 90 minuten Module-opbouw
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Dit lesplan helpt jou als docent om de abstracte Informatietheorie tastbaar te maken via de interactieve simulaties in deze webapp.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-brand-blue bg-blue-50 p-2.5 rounded-lg border border-blue-100 self-start md:self-auto font-semibold">
          <Clock className="w-4 h-4" />
          <span>Totaal: 90 minuten</span>
        </div>
      </div>

      {/* 90m Timetable Breakdown */}
      <div className="space-y-4 mb-8">
        <h3 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-1">
          <Calendar className="w-4 h-4 text-brand-blue" />
          Interactieve Tijdlijn
        </h3>

        <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-4">
          {LESSON_PLAN.map((slot, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div key={idx} className="relative">
                {/* Marker Bullet */}
                <span className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 bg-white transition-all ${
                  isExpanded ? 'border-brand-blue ring-4 ring-blue-50' : 'border-slate-300'
                }`} />

                <div 
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isExpanded 
                      ? 'bg-slate-50 border-slate-300 shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-slate-50/50'
                  }`}
                  id={`planner-slot-${idx}`}
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded">
                        {slot.time}
                      </span>
                      <h4 className="font-bold text-slate-800 text-sm md:text-base">
                        {slot.title}
                      </h4>
                    </div>
                    <span className="text-[11px] font-semibold text-brand-blue bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100/30">
                      {slot.linkEdstack}
                    </span>
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-slate-200/50 space-y-3 text-xs md:text-sm text-slate-600"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <strong className="text-brand-blue font-bold block mb-1 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-brand-blue" />
                            Activiteit Docent:
                          </strong>
                          <p className="leading-relaxed text-[11px] md:text-xs text-slate-600">{slot.activityDocent}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <strong className="text-slate-800 font-bold block mb-1 flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-slate-700" />
                            Activiteit Student:
                          </strong>
                          <p className="leading-relaxed text-[11px] md:text-xs text-slate-600">{slot.activityStudent}</p>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono flex justify-between">
                        <span>Thema focus: <strong>{slot.shannonFocus}</strong></span>
                        <span>Duur: <strong>{slot.duration} minuten</strong></span>
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
      <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-brand-accent flex items-center gap-1.5 uppercase tracking-wide">
          <GraduationCap className="w-5 h-5 text-brand-accent" />
          Klassikale Debatstellingen: Shannon &amp; Bedrijfskunde
        </h3>
        <p className="text-xs text-slate-350 leading-relaxed">
          Gooi deze uitdagende stellingen tijdens de module in de groep om studenten kritisch te laten nadenken over de wisselwerking tussen wiskundige theorie en bedrijfsvoering.
        </p>

        <div className="space-y-3 pt-2">
          <div className="border-l-2 border-brand-accent pl-4 py-1">
            <strong className="text-xs text-white block">Stelling 1: Platforms zijn slechts wiskundige encoders</strong>
            <p className="text-[11px] text-slate-300 leading-relaxed mt-1">
              &quot;Een digitaal platform zoals Bol.com is geen economisch wonder, maar puur een wiskundig handigheidje om de onnodige en dure communicatie-redundantie (de transactiekosten volgens Williamson) te elimineren.&quot;
            </p>
          </div>

          <div className="border-l-2 border-brand-accent pl-4 py-1">
            <strong className="text-xs text-white block">Stelling 2: Organisatorische chaos is pure warmteruis</strong>
            <p className="text-[11px] text-slate-300 leading-relaxed mt-1">
              &quot;Slechte business-IT alignment is simpelweg de organisatorische vertaling van Shannons fysieke ruistoename. Geen enkele strategische verandering (Edstack 3) kan succesvol zijn zonder eerst de foutcorrectie (PDCA feedbackloops) te activeren.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
