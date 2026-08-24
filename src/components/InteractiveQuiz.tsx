import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle, XCircle, Award, Sparkles, RefreshCw } from 'lucide-react';
import { Quiz } from '../types';

interface InteractiveQuizProps {
  quiz: Quiz;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ quiz }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Automatically reset quiz state whenever a new quiz object is provided
  useEffect(() => {
    setSelectedOption(null);
    setIsSubmitted(false);
  }, [quiz]);

  const handleSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);

    if (selectedOption === quiz.answerIndex) {
      // Trigger celebratory confetti
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const isCorrect = selectedOption === quiz.answerIndex;

  return (
    <div id="interactive-quiz" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">💡 수업 확인 퀴즈 (Concept Quiz)</h3>
            <p className="text-[11px] text-slate-500">순서도와 알고리즘의 동작 원리를 이해했는지 확인해 보세요.</p>
          </div>
        </div>
        {isSubmitted && (
          <button
            onClick={handleRetry}
            className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> 다시 풀기
          </button>
        )}
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Question Title */}
        <div className="text-sm font-bold text-slate-800 leading-relaxed flex items-start gap-2">
          <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded font-mono shrink-0 mt-0.5">Q</span>
          <span>{quiz.question}</span>
        </div>

        {/* Options List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {quiz.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300';

            if (isSelected && !isSubmitted) {
              btnStyle = 'bg-indigo-50 border-indigo-500 text-indigo-900 ring-2 ring-indigo-200';
            }

            if (isSubmitted) {
              if (idx === quiz.answerIndex) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-200';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 line-through';
              } else {
                btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                disabled={isSubmitted}
                className={`text-left p-3 rounded-lg border text-xs font-medium transition flex items-start gap-2.5 ${btnStyle}`}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[11px] font-mono shrink-0">
                  {idx + 1}
                </span>
                <span className="flex-1">{option}</span>
                {isSubmitted && idx === quiz.answerIndex && (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {isSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Submit Button */}
        {!isSubmitted ? (
          <div className="flex justify-end pt-1">
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-5 py-2 rounded-lg transition shadow-sm disabled:opacity-40"
            >
              정답 확인하기
            </button>
          </div>
        ) : (
          /* Explanation Result Card */
          <div
            className={`p-4 rounded-lg border text-xs leading-relaxed animate-fadeIn ${
              isCorrect
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                : 'bg-amber-50/80 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1.5 text-sm">
              {isCorrect ? (
                <>
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">정답입니다! 👏</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-800">아쉽네요! 정답 해설을 확인해보세요.</span>
                </>
              )}
            </div>
            <p className="text-slate-700 mt-1">{quiz.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};
