import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Activity, CheckCircle2, ArrowRight } from 'lucide-react';
import { TraceStep, VariableInfo } from '../types';

interface TraceSimulatorProps {
  steps: TraceStep[];
  variables: VariableInfo[];
  finalOutput: string;
}

export const TraceSimulator: React.FC<TraceSimulatorProps> = ({
  steps,
  variables,
  finalOutput,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000); // ms

  // Reset when steps change
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [steps]);

  // Auto-play timer
  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, speed, steps.length]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const currentStep = steps[currentStepIndex] || steps[0];
  const isFinished = currentStepIndex === steps.length - 1;

  return (
    <div id="trace-simulator" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Simulator Control Header */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">단계별 실행 추적 & 변수 시뮬레이터</h3>
            <p className="text-[11px] text-slate-500">
              알고리즘의 각 단계를 한 단계씩 실행하며 변수 상태의 변화를 관찰합니다.
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            title="처음으로"
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            title="이전 단계"
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded transition disabled:opacity-30"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={isFinished && !isPlaying}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" /> 일시정지
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" /> 자동 재생
              </>
            )}
          </button>
          <button
            onClick={handleNext}
            disabled={isFinished}
            title="다음 단계"
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded transition disabled:opacity-30"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Speed Selector */}
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="text-xs bg-white border border-slate-300 rounded px-2 py-1 text-slate-700 focus:outline-none"
          >
            <option value={1500}>0.7x (느리게)</option>
            <option value={1000}>1.0x (보통)</option>
            <option value={500}>2.0x (빠르게)</option>
          </select>
        </div>
      </div>

      {/* Current Step Status Card */}
      <div className="p-4 bg-indigo-50/50 border-b border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-sm">
            {currentStepIndex + 1}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800 text-sm">{currentStep.iteration}</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-medium font-mono">
                Step {currentStep.stepNum || currentStepIndex + 1} / {steps.length}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">{currentStep.description}</p>
          </div>
        </div>

        {/* Live Variable Badge */}
        <div className="bg-white px-3.5 py-2 rounded-lg border border-indigo-200 shadow-sm flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">현재 변수 상태:</span>
          <span className="text-xs font-mono font-bold text-indigo-700">{currentStep.varStates}</span>
        </div>
      </div>

      {/* Condition Result Alert (if available) */}
      {currentStep.conditionResult && (
        <div className="px-4 py-2 bg-amber-50/80 border-b border-amber-200 text-xs text-amber-900 flex items-center gap-2">
          <span className="font-bold text-amber-700">⚖️ 조건 검사:</span>
          <span>{currentStep.conditionResult}</span>
        </div>
      )}

      {/* Trace Table */}
      <div className="max-h-72 overflow-y-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-600 font-semibold sticky top-0 border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3 w-14 text-center">단계</th>
              <th className="py-2.5 px-3 w-24">회차/구분</th>
              <th className="py-2.5 px-4">실행 내용 (동작)</th>
              <th className="py-2.5 px-4">변수 값 (State)</th>
              <th className="py-2.5 px-4">조건 판단</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {steps.map((step, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;
              return (
                <tr
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-indigo-100/80 font-medium text-indigo-950 border-l-4 border-indigo-600'
                      : isPast
                      ? 'bg-white text-slate-700 hover:bg-slate-50'
                      : 'bg-slate-50/60 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  <td className="py-2 px-3 text-center font-mono font-medium">
                    {idx + 1}
                  </td>
                  <td className="py-2 px-3 font-semibold">{step.iteration}</td>
                  <td className="py-2 px-4">{step.description}</td>
                  <td className="py-2 px-4 font-mono font-semibold text-indigo-700">{step.varStates}</td>
                  <td className="py-2 px-4 text-slate-500 font-mono text-[11px]">
                    {step.conditionResult || '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Variables Summary & Final Result Box */}
      <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Variable Definitions */}
        <div className="flex-1">
          <h4 className="text-xs font-bold text-slate-600 mb-1.5">사용된 변수 명세:</h4>
          <div className="flex flex-wrap gap-2">
            {variables.map((v, i) => (
              <div key={i} className="bg-white border border-slate-200 px-2.5 py-1 rounded text-xs">
                <span className="font-mono font-bold text-indigo-600">{v.name}</span>
                <span className="text-slate-500 text-[11px] ml-1.5">({v.role} / 초깃값: {v.initialValue})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Final Result Card */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 shrink-0 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase">최종 예측 결과:</span>
            <p className="text-xs font-semibold text-emerald-950">{finalOutput}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
