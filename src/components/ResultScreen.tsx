import React from 'react';
import { RotateCcw, Trophy, Award, CheckCircle2, XCircle, Clock, BookOpen, Share2, Sparkles, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, AnswerRecord } from '../types';
import { playQuizCompleteSound } from '../utils/audio';

interface ResultScreenProps {
  score: number;
  total: number;
  studentName: string;
  records: AnswerRecord[];
  questions: Question[];
  soundEnabled: boolean;
  onRestart: () => void;
  onOpenTable: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  total,
  studentName,
  records,
  questions,
  soundEnabled,
  onRestart,
  onOpenTable,
}) => {
  const percentage = Math.round((score / total) * 100);
  const isPassed = score >= 7;

  React.useEffect(() => {
    if (isPassed) {
      playQuizCompleteSound(soundEnabled);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch {
        // safe ignore
      }
    }
  }, [isPassed, soundEnabled]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* 1. Score Summary Banner */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden text-center">
        <div className="bg-gradient-to-br from-[#081A35] via-[#173B70] to-[#1E4C8F] text-white p-7 sm:p-9 relative">
          <div className="w-20 h-20 rounded-3xl bg-amber-400 text-slate-900 mx-auto flex items-center justify-center shadow-lg mb-4">
            {isPassed ? (
              <Trophy className="w-10 h-10 fill-current" />
            ) : (
              <Award className="w-10 h-10" />
            )}
          </div>

          <h2 className="text-3xl sm:text-4xl font-black">
            {isPassed ? 'ممتاز! 🎉' : 'حاول مرة أخرى 💪'}
          </h2>

          <p className="mt-2 text-base font-semibold text-blue-100">
            {studentName ? `الطالب/ـة: ${studentName}` : 'نتيجتك في الاختبار'}
          </p>

          {/* Big Score Display */}
          <div className="mt-5 inline-block bg-white/10 backdrop-blur-md px-8 py-3 rounded-2xl border border-white/20 shadow-inner">
            <div className="text-4xl sm:text-5xl font-black text-amber-300 font-mono">
              {score} <span className="text-xl font-normal text-white">من</span> {total}
            </div>
            <div className="text-xs font-bold text-blue-200 mt-1">
              النسبة المئوية: {percentage}%
            </div>
          </div>

          <div className="mt-4 text-xs text-blue-200 font-medium">
            تصميم الأستاذ نواف المتيوتي • نواف صالح
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onRestart}
            className="flex-1 min-w-[160px] py-3.5 px-5 rounded-2xl bg-[#173B70] hover:bg-[#122e58] active:scale-95 text-white font-bold text-sm sm:text-base transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>إعادة الاختبار</span>
          </button>

          <button
            onClick={onOpenTable}
            className="py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 active:scale-95 text-[#173B70] border border-slate-200 font-bold text-sm transition shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>مراجعة جدول الأفعال</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-3.5 rounded-2xl bg-white hover:bg-slate-100 active:scale-95 text-slate-700 border border-slate-200 text-sm transition shadow-xs cursor-pointer"
            title="طباعة بطاقة الدرجة"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Detailed Question-by-Question Review */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-100 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base sm:text-lg font-black text-[#081A35] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            مراجعة تفصيلية لجميع الإجابات (10 أسئلة)
          </h3>
          <span className="text-xs font-bold text-slate-500">
            {records.filter(r => r.isCorrect).length} صحيحة / {records.filter(r => !r.isCorrect).length} خاطئة
          </span>
        </div>

        <div className="space-y-3">
          {questions.map((q, idx) => {
            const record = records.find(r => r.questionIndex === idx);
            const isCorrect = record?.isCorrect ?? false;
            const isTimedOut = record?.selectedOptionIndex === null;
            const selectedText = record && record.selectedOptionIndex !== null
              ? q.options[record.selectedOptionIndex]
              : null;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  isCorrect
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : isTimedOut
                    ? 'bg-amber-50/50 border-amber-200'
                    : 'bg-red-50/50 border-red-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black bg-white px-2 py-0.5 rounded-lg border border-slate-200 text-[#173B70]">
                        سؤال #{idx + 1}
                      </span>
                      <span className="text-lg font-black font-sans uppercase text-[#081A35]">
                        {q.verb}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        ({q.verbArabic})
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-semibold space-y-0.5 pt-1">
                      <div className="text-emerald-800">
                        ✅ الإجابة الصحيحة في الماضي: <strong className="font-sans text-base">{q.pastForm}</strong>
                      </div>
                      {!isCorrect && (
                        <div className="text-red-700">
                          {isTimedOut ? (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 inline" /> لم يتم الجواب في الوقت المحدد (نفد الوقت)
                            </span>
                          ) : (
                            <span>❌ إجابتك المختارة كانت: <span className="font-sans font-bold">{selectedText}</span></span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-600 bg-white/70 p-2 rounded-xl mt-2 border border-slate-200/50">
                      💡 {q.explanation}
                    </div>
                  </div>

                  <div className="shrink-0 pt-1">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-xl shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" /> صحيح
                      </span>
                    ) : isTimedOut ? (
                      <span className="inline-flex items-center gap-1 bg-amber-600 text-white text-xs font-bold px-2.5 py-1 rounded-xl shadow-xs">
                        <Clock className="w-3.5 h-3.5" /> وقت
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-xl shadow-xs">
                        <XCircle className="w-3.5 h-3.5" /> خطأ
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="text-center py-2 space-y-1">
        <p className="text-xs font-bold text-slate-500">
          تصميم الأستاذ نواف المتيوتي • نواف صالح
        </p>
      </div>
    </div>
  );
};
