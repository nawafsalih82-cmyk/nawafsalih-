/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { StartScreen } from './components/StartScreen';
import { QuizCard } from './components/QuizCard';
import { ResultScreen } from './components/ResultScreen';
import { VerbsTableModal } from './components/VerbsTableModal';
import { AndroidCodeModal } from './components/AndroidCodeModal';
import { QUESTIONS_DATA } from './data/questions';
import { QuizStatus, AnswerRecord } from './types';

export default function App() {
  const [status, setStatus] = useState<QuizStatus>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [studentName, setStudentName] = useState('');
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Modals state
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [isAndroidCodeOpen, setIsAndroidCodeOpen] = useState(false);

  const handleStart = (name: string) => {
    setStudentName(name);
    setScore(0);
    setCurrentIndex(0);
    setRecords([]);
    setStatus('playing');
  };

  const handleAnswerSelected = (selectedIndex: number | null, isCorrect: boolean) => {
    // Record the result
    const newRecord: AnswerRecord = {
      questionIndex: currentIndex,
      selectedOptionIndex: selectedIndex,
      isCorrect,
      timeSpent: 0,
    };

    const nextScore = isCorrect ? score + 1 : score;
    setScore(nextScore);
    setRecords((prev) => [...prev, newRecord]);

    // Check if next question exists
    if (currentIndex + 1 < QUESTIONS_DATA.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setStatus('result');
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setRecords([]);
    setStatus('playing');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#081A35] flex flex-col font-['Cairo',sans-serif] selection:bg-blue-200">
      {/* Top Header */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenTable={() => setIsTableOpen(true)}
        onOpenAndroidCode={() => setIsAndroidCodeOpen(true)}
      />

      {/* Main Interactive Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4">
        {status === 'start' && (
          <StartScreen
            onStart={handleStart}
            onOpenTable={() => setIsTableOpen(true)}
            onOpenAndroidCode={() => setIsAndroidCodeOpen(true)}
          />
        )}

        {status === 'playing' && (
          <QuizCard
            question={QUESTIONS_DATA[currentIndex]}
            currentIndex={currentIndex}
            totalQuestions={QUESTIONS_DATA.length}
            score={score}
            soundEnabled={soundEnabled}
            onAnswerSelected={handleAnswerSelected}
          />
        )}

        {status === 'result' && (
          <ResultScreen
            score={score}
            total={QUESTIONS_DATA.length}
            studentName={studentName}
            records={records}
            questions={QUESTIONS_DATA}
            soundEnabled={soundEnabled}
            onRestart={handleRestart}
            onOpenTable={() => setIsTableOpen(true)}
          />
        )}
      </main>

      {/* Study Table Modal */}
      <VerbsTableModal
        isOpen={isTableOpen}
        onClose={() => setIsTableOpen(false)}
      />

      {/* Android Studio Code Export Modal */}
      <AndroidCodeModal
        isOpen={isAndroidCodeOpen}
        onClose={() => setIsAndroidCodeOpen(false)}
      />
    </div>
  );
}
