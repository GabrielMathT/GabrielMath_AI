import React, { useState, useEffect } from 'react';
import { ExpertRule, PresetExample } from '../types';
import { PRESET_EXAMPLES } from '../data/presets';
import {
  Brain,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  Database,
  Cpu,
  Layers,
  HelpCircle,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';

interface ExpertSystemBuilderProps {
  onGenerateFromRules: (storyText: string) => void;
  isLoading: boolean;
  onSelectPreset: (preset: PresetExample) => void;
}

export const ExpertSystemBuilder: React.FC<ExpertSystemBuilderProps> = ({
  onGenerateFromRules,
  isLoading,
  onSelectPreset,
}) => {
  const [systemTitle, setSystemTitle] = useState<string>('먹이에 따른 동물의 분류 전문가시스템');
  const [rules, setRules] = useState<ExpertRule[]>([
    { id: '1', condition: '동물 x는 동물만 먹이로 한다.', conclusion: '육식 동물이다.' },
    { id: '2', condition: '동물 x는 식물만 먹이로 한다.', conclusion: '초식 동물이다.' },
    { id: '3', condition: '동물 x는 동물을 먹이로 한다 AND 식물을 먹이로 한다.', conclusion: '잡식 동물이다.' },
  ]);
  const [testFact, setTestFact] = useState<string>("동물 x = '코끼리' (식물만 먹이로 함)");

  // Helper to load templates
  const handleLoadTemplate = (presetId: string) => {
    const preset = PRESET_EXAMPLES.find((p) => p.id === presetId);
    if (preset) {
      onSelectPreset(preset);
      setSystemTitle(preset.title);
      if (preset.expertRules && preset.expertRules.length > 0) {
        setRules(preset.expertRules);
      }
      if (preset.testFact) {
        setTestFact(preset.testFact);
      }
    }
  };

  const handleAddRule = () => {
    const newId = String(rules.length + 1);
    setRules([
      ...rules,
      {
        id: newId,
        condition: '',
        conclusion: '',
      },
    ]);
  };

  const handleRemoveRule = (index: number) => {
    if (rules.length <= 1) return;
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  const handleUpdateRule = (index: number, field: 'condition' | 'conclusion', val: string) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], [field]: val };
    setRules(newRules);
  };

  const handleSubmit = () => {
    // Format into standard textbook Expert System prompt
    let formattedStory = `[전문가시스템 지식 베이스 - ${systemTitle}]\n`;
    rules.forEach((rule, idx) => {
      formattedStory += `규칙 ${idx + 1}: IF (${rule.condition.trim() || '조건'}) THEN (${rule.conclusion.trim() || '결론'})\n`;
    });

    if (testFact.trim()) {
      formattedStory += `\n[테스트 사실 (Fact)]\n${testFact.trim()}\n를 입력하여 추론 엔진을 통해 최종 판단 결과를 도출하고 순서도를 생성합니다.`;
    } else {
      formattedStory += `\n위 지식 베이스 규칙들을 종합하여 사실(Fact)을 판단할 수 있는 전문가시스템 알고리즘 순서도를 생성합니다.`;
    }

    onGenerateFromRules(formattedStory);
  };

  return (
    <div id="expert-system-builder" className="flex flex-col gap-4">
      {/* Textbook Architecture Concept Card */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 rounded-xl p-3.5 border border-indigo-100 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-indigo-600" />
            전문가시스템 (Expert System)의 3대 핵심 구성
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
            인공지능 수학 교과서 기준
          </span>
        </div>

        {/* 3-Step Flow Diagram */}
        <div className="grid grid-cols-3 gap-1.5 text-center text-[11px] mt-1">
          <div className="bg-white/90 p-2 rounded-lg border border-indigo-200 shadow-xs flex flex-col items-center">
            <Database className="w-3.5 h-3.5 text-blue-600 mb-0.5" />
            <span className="font-bold text-slate-800">지식 베이스</span>
            <span className="text-[10px] text-slate-500">IF A THEN B 규칙</span>
          </div>
          <div className="bg-white/90 p-2 rounded-lg border border-indigo-200 shadow-xs flex flex-col items-center">
            <Cpu className="w-3.5 h-3.5 text-purple-600 mb-0.5" />
            <span className="font-bold text-slate-800">추론 엔진</span>
            <span className="text-[10px] text-slate-500">사실과 규칙 논리 연산</span>
          </div>
          <div className="bg-white/90 p-2 rounded-lg border border-indigo-200 shadow-xs flex flex-col items-center">
            <Layers className="w-3.5 h-3.5 text-emerald-600 mb-0.5" />
            <span className="font-bold text-slate-800">사용자 인터페이스</span>
            <span className="text-[10px] text-slate-500">질문 입력 & 결과 응답</span>
          </div>
        </div>
      </div>

      {/* Textbook Quick Load Buttons */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
          교과서 전문가시스템 예제 불러오기:
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => handleLoadTemplate('expert_animals')}
            className="p-2 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg text-left transition flex items-center gap-2 group"
          >
            <span className="text-sm">🦁</span>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-slate-800 group-hover:text-indigo-700 truncate">
                동물 식성 분류
              </div>
              <div className="text-[10px] text-slate-400">초식/육식/잡식</div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleLoadTemplate('expert_triangles')}
            className="p-2 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg text-left transition flex items-center gap-2 group"
          >
            <span className="text-sm">📐</span>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-slate-800 group-hover:text-indigo-700 truncate">
                삼각형 종류 판별
              </div>
              <div className="text-[10px] text-slate-400">피타고라스 c² 관계</div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleLoadTemplate('expert_quadratic')}
            className="p-2 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg text-left transition flex items-center gap-2 group"
          >
            <span className="text-sm">🧮</span>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-slate-800 group-hover:text-indigo-700 truncate">
                이차방정식 실근 개수
              </div>
              <div className="text-[10px] text-slate-400">판별식 D=b²-4ac</div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleLoadTemplate('expert_bloodtype')}
            className="p-2 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg text-left transition flex items-center gap-2 group"
          >
            <span className="text-sm">🩸</span>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-slate-800 group-hover:text-indigo-700 truncate">
                혈액형 항원 판정
              </div>
              <div className="text-[10px] text-slate-400">A, B, AB, O형</div>
            </div>
          </button>
        </div>
      </div>

      {/* System Title */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-700">
          전문가시스템 목표/이름:
        </label>
        <input
          type="text"
          value={systemTitle}
          onChange={(e) => setSystemTitle(e.target.value)}
          placeholder="예: 먹이에 따른 동물의 분류 전문가시스템"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
        />
      </div>

      {/* Knowledge Base Rules Builder */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-blue-600" />
            지식 베이스 (Knowledge Base) 규칙 설정:
          </label>
          <span className="text-[11px] text-slate-500">
            총 {rules.length}개 규칙
          </span>
        </div>

        {/* Rule Items */}
        <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex flex-col gap-1.5 relative group hover:border-indigo-300 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-md">
                  규칙 {idx + 1}
                </span>
                {rules.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRule(idx)}
                    className="text-slate-400 hover:text-rose-600 p-0.5 transition"
                    title="규칙 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* IF & THEN Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {/* Condition (IF) */}
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-600 text-[11px] shrink-0 font-mono">
                    IF (가정):
                  </span>
                  <input
                    type="text"
                    value={rule.condition}
                    onChange={(e) => handleUpdateRule(idx, 'condition', e.target.value)}
                    placeholder="예: x는 식물만 먹이로 한다"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Conclusion (THEN) */}
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-indigo-600 text-[11px] shrink-0 font-mono">
                    THEN (결론):
                  </span>
                  <input
                    type="text"
                    value={rule.conclusion}
                    onChange={(e) => handleUpdateRule(idx, 'conclusion', e.target.value)}
                    placeholder="예: 초식 동물이다"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Rule Button */}
        <button
          type="button"
          onClick={handleAddRule}
          className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-dashed border-slate-300"
        >
          <Plus className="w-3.5 h-3.5" />
          IF - THEN 규칙 추가하기
        </button>
      </div>

      {/* Fact Input (User Interface) */}
      <div className="flex flex-col gap-1 bg-amber-50/60 p-3 rounded-xl border border-amber-200">
        <label className="text-xs font-bold text-amber-900 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-amber-700" />
          테스트 사실 (Fact) 입력 (추론 엔진에 전달):
        </label>
        <input
          type="text"
          value={testFact}
          onChange={(e) => setTestFact(e.target.value)}
          placeholder="예: 동물 x = '코끼리' (식물만 먹이로 함) 또는 a=3, b=4, c=5"
          className="w-full px-3 py-2 bg-white border border-amber-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-800"
        />
        <p className="text-[10px] text-amber-700 mt-0.5">
          ※ 추론 엔진은 이 사실(Fact)을 지식 베이스 규칙들과 비교하여 최종 결론을 도출합니다.
        </p>
      </div>

      {/* Generate Button */}
      <button
        type="button"
        id="btn-generate-expert-flowchart"
        onClick={handleSubmit}
        disabled={isLoading || rules.some((r) => !r.condition.trim() || !r.conclusion.trim())}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-indigo-100 transition flex items-center justify-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>전문가시스템 순서도 및 추론 분석 중...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>전문가시스템 순서도 및 추론 실행</span>
          </>
        )}
      </button>
    </div>
  );
};
