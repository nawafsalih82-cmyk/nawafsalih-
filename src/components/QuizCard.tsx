import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Question } from '../types';
import { playApplauseSound, playWrongSound, playTickSound, speakWord } from '../utils/audio';

interface QuizCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  soundEnabled: boolean;
  onAnswerSelected: (selectedIndex: number | null, isCorrect: boolean) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  score,
  soundEnabled,
  onAnswerSelected,
}) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState<'correct' | 'wrong' | 'timeout' | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const nextTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset state on new question
  useEffect(() => {
    setTimeLeft(30);
    setSelectedOption(null);
    setIsAnswered(false);
    setFeedbackText('');
    setFeedbackType(null);

    // Start 30 seconds timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        if (prev <= 6 && soundEnabled) {
          playTickSound(soundEnabled);
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (nextTimeoutRef.current) clearTimeout(nextTimeoutRef.current);
    };
  }, [currentIndex, soundEnabled]);

  // Handle timeout when timeLeft hits 0
  useEffect(() => {
    if (timeLeft === 0 && !isAnswered) {
      handleTimeout();
    }
  }, [timeLeft, isAnswered]);

  const handleTimeout = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    if (timerRef.current) clearInterval(timerRef.current);

    setFeedbackText('انتهى الوقت! انتهت الـ 30 ثانية');
    setFeedbackType('timeout');
    playWrongSound(soundEnabled);

    // Call onAnswerSelected with null (timeout)
    nextTimeoutRef.current = setTimeout(() => {
      onAnswerSelected(null, false);
    }, 2200);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered || timeLeft === 0) return;
    setIsAnswered(true);
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOption(index);
    const isCorrect = index === question.correctIndex;

    if (isCorrect) {
      setFeedbackText('أحسنت! إجابة صحيحة 👏');
      setFeedbackType('correct');
      playApplauseSound(soundEnabled);

      // Confetti burst
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#238B45', '#173B70', '#FCD34D', '#10B981']
        });
      } catch {
        // Safe ignore
      }
    } else {
      setFeedbackText('للأسف، إجابة غير صحيحة');
      setFeedbackType('wrong');
      playWrongSound(soundEnabled);
    }

    nextTimeoutRef.current = setTimeout(() => {
      onAnswerSelected(index, isCorrect);
    }, 2200);
  };

  const getOptionButtonClass = (index: number) => {
    // If not answered yet: default Android button styling
    if (!isAnswered) {
      return 'bg-white hover:bg-slate-50 text-[#081A35] border-2 border-[#173B70]/30 shadow-md hover:shadow-lg hover:border-[#173B70] active:scale-[0.99] cursor-pointer';
    }

    // Question is answered or timed out:
    // 1. Is this the correct answer? Always highlight in green
    if (index === question.correctIndex) {
      return 'bg-[#238B45] text-white border-2 border-[#1B6E37] shadow-lg scale-[1.02] font-black animate-pulse';
    }

    // 2. Was this option chosen by student and is wrong? Highlight in red
    if (selectedOption === index && index !== question.correctIndex) {
      return 'bg-[#C62828] text-white border-2 border-[#9E1F1F] shadow-md line-through opacity-90';
    }

    // 3. Other unchosen options
    return 'bg-slate-100 text-slate-400 border border-slate-200 opacity-50 cursor-not-allowed';
  };

  // Option letters: A, B, C
  const optionLetters = ['A', 'B', 'C'];

  // Timer percentage for 30s
  const timerPercentage = Math.max(0, Math.min(100, (timeLeft / 30) * 100));
  const isUrgent = timeLeft <= 5;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 space-y-4 animate-fade-in">
      {/* 1. Timer and Status Card (Material Card Area) */}
      <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-[#173B70] bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
              السؤال: {currentIndex + 1} / {totalQuestions}
            </span>
          </div>

          {/* 30-Second Countdown Counter */}
          <div className="flex items-center gap-2">
            <Clock className={`w-5 h-5 ${isUrgent ? 'text-[#C62828] animate-bounce' : 'text-[#173B70]'}`} />
            <div
              className={`text-2xl font-black font-mono px-3 py-0.5 rounded-xl transition-colors ${
                isUrgent
                  ? 'text-white bg-[#C62828] animate-pulse shadow-md'
                  : 'text-[#173B70] bg-slate-100'
              }`}
            >
              {timeLeft}
              <span className="text-xs font-normal mr-1">ثانية</span>
            </div>
          </div>

          <div className="text-sm font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
            النتيجة: {score}
          </div>
        </div>

        {/* Linear Progress Bar for 30s Timer */}
        <div className="mt-3 w-full bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner">
          <div
            className={`h-full transition-all duration-1000 ease-linear rounded-full ${
              isUrgent ? 'bg-[#C62828]' : 'bg-[#173B70]'
            }`}
            style={{ width: `${timerPercentage}%` }}
          />
        </div>
      </div>

      {/* 2. Main Question Card (Android Material Card equivalent) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-100 text-center relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

        <p className="text-sm sm:text-base font-bold text-slate-500 mb-2">
          ما هو تصريف الفعل في Past Simple؟
        </p>

        {/* English Verb Display */}
        <div className="my-4 inline-flex items-center justify-center gap-3 bg-gradient-to-br from-slate-50 to-blue-50/50 px-8 py-5 rounded-3xl border-2 border-blue-100 shadow-inner">
          <span className="text-4xl sm:text-5xl md:text-6xl font-black tracking-wider text-[#173B70] uppercase font-sans">
            {question.verb}
          </span>
          <button
            onClick={() => speakWord(question.verb)}
            className="p-2 rounded-2xl bg-white hover:bg-blue-100 text-[#173B70] border border-blue-200 shadow-sm active:scale-90 transition cursor-pointer"
            title="استمع للنطق بالإنجليزية"
            aria-label="نطق الفعل"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Arabic Translation hint */}
        <div className="text-xs sm:text-sm font-semibold text-slate-600 bg-slate-100/70 inline-block px-4 py-1 rounded-full border border-slate-200">
          المعنى بالعربية: <span className="text-[#173B70] font-bold">({question.verbArabic})</span>
        </div>
      </div>

      {/* 3. The 3 Options Buttons (Android 60dp height styled) */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const letter = optionLetters[idx];
          const isSelected = selectedOption === idx;
          const isCorrect = idx === question.correctIndex;

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered || timeLeft === 0}
              className={`w-full min-h-[64px] sm:h-[70px] px-5 py-3 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-200 flex items-center justify-between select-none ${getOptionButtonClass(
                idx
              )}`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black shrink-0 ${
                    isAnswered && isCorrect
                      ? 'bg-white text-[#238B45]'
                      : isAnswered && isSelected
                      ? 'bg-white text-[#C62828]'
                      : 'bg-slate-100 text-[#173B70]'
                  }`}
                >
                  {letter}
                </span>
                <span className="font-sans text-xl sm:text-2xl tracking-wide lowercase">
                  {option}
                </span>
              </div>

              {/* Status Indicator Icon */}
              <div className="shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakWord(option);
                  }}
                  className={`p-1.5 rounded-lg transition ${
                    isAnswered && (isCorrect || isSelected)
                      ? 'text-white/80 hover:text-white'
                      : 'text-slate-400 hover:text-[#173B70]'
                  }`}
                  title={`نطق ${option}`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                {isAnswered && isCorrect && (
                  <CheckCircle className="w-6 h-6 text-white shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <AlertCircle className="w-6 h-6 text-white shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. Feedback Message Banner */}
      {feedbackText && (
        <div
          className={`p-4 rounded-2xl text-center font-black text-base sm:text-lg animate-bounce shadow-md flex items-center justify-center gap-2 ${
            feedbackType === 'correct'
              ? 'bg-emerald-50 text-[#238B45] border-2 border-emerald-300'
              : 'bg-red-50 text-[#C62828] border-2 border-red-300'
          }`}
        >
          {feedbackType === 'correct' ? (
            <CheckCircle className="w-5 h-5 text-[#238B45]" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[#C62828]" />
          )}
          <span>{feedbackText}</span>
        </div>
      )}

      {/* Explanation helper if answered */}
      {isAnswered && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 text-xs sm:text-sm text-blue-900 font-medium text-center">
          💡 <span className="font-bold">ملاحظة تعليمية:</span> {question.explanation}
        </div>
      )}

      {/* 5. Bottom Score Footer */}
      <div className="pt-2 text-center">
        <span className="text-xs sm:text-sm font-bold text-slate-500 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-xs">
          مجموع الإجابات الصحيحة حتى الآن: <strong className="text-[#173B70]">{score}</strong>
        </span>
      </div>
    </div>
  );
};
