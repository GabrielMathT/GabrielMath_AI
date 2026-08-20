import React from 'react';
import { BookOpen, Cpu, Lightbulb, Target } from 'lucide-react';

interface ConceptExplainerProps {
  title: string;
  problemSummary: string;
  mathConcept: string;
}

export const ConceptExplainer: React.FC<ConceptExplainerProps> = ({
  title,
  problemSummary,
  mathConcept,
}) => {
  return (
    <div id="concept-explainer" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">수학적 원리 및 인공지능(AI) 연계 분석</h3>
            <p className="text-[11px] text-slate-500">알고리즘의 수학적 모델링과 인공지능 수학과의 연결고리를 배웁니다.</p>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Problem Summary */}
        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
          <div className="flex items-center gap-2 font-bold text-slate-700 text-xs mb-1">
            <Target className="w-4 h-4 text-indigo-600" />
            <span>수학적 문제 정의 및 알고리즘 개요</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{problemSummary}</p>
        </div>

        {/* Math & AI Connection */}
        <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100 flex flex-col gap-2">
          <div className="flex items-center gap-2 font-bold text-indigo-900 text-xs">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span>인공지능 수학 핵심 개념 (Mathematical Principle & AI Connection)</span>
          </div>
          <p className="text-xs text-indigo-950 leading-relaxed whitespace-pre-wrap">{mathConcept}</p>
        </div>

        {/* High School AI Math TIP */}
        <div className="flex items-start gap-2.5 p-3 bg-amber-50/60 border border-amber-200 rounded-lg text-xs text-amber-900">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-amber-800">💡 학습 가이드 (AI Math Tip): </span>
            인공지능의 핵심인 신경망 훈련과 최적화는 이처럼 <span className="font-semibold text-amber-950">초기화 → 반복 계산(Loop) → 오차/기울기 평가 → 변수 갱신(Update) → 조건 판단</span>의 순서도 구조를 기반으로 작동합니다.
          </div>
        </div>
      </div>
    </div>
  );
};
