import React, { useState } from 'react';
import { PRESET_EXAMPLES } from '../data/presets';
import { PresetExample } from '../types';
import { ExpertSystemBuilder } from './ExpertSystemBuilder';
import { GuidedAlgorithmBuilder } from './GuidedAlgorithmBuilder';
import { Sparkles, BookOpen, Trash2, PlusCircle, Brain, FileText, Sliders, Type, Maximize2, Minimize2 } from 'lucide-react';

interface StoryInputFormProps {
  story: string;
  setStory: (story: string) => void;
  onGenerate: () => void;
  onSelectPreset: (preset: PresetExample) => void;
  isLoading: boolean;
  selectedPresetId: string;
}

export const StoryInputForm: React.FC<StoryInputFormProps> = ({
  story,
  setStory,
  onGenerate,
  onSelectPreset,
  isLoading,
  selectedPresetId,
}) => {
  const [inputMode, setInputMode] = useState<'story' | 'guided' | 'expert'>('story');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [fontSizeMode, setFontSizeMode] = useState<'sm' | 'base' | 'lg'>('base');
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = ['all', '전문가시스템 & 규칙', '기초 반복/누적', '수열과 점화식', '탐색과 최적화', '인공지능 핵심'];

  const filteredPresets = selectedCategory === 'all'
    ? PRESET_EXAMPLES
    : PRESET_EXAMPLES.filter((p) => p.category === selectedCategory);

  const handleInsertSnippet = (snippet: string) => {
    setStory(story ? `${story.trim()}\n${snippet}` : snippet);
  };

  const handleGenerateFromGuided = (storyText: string) => {
    setStory(storyText);
    setTimeout(() => {
      onGenerate();
    }, 50);
  };

  const handleGenerateFromExpertRules = (storyText: string) => {
    setStory(storyText);
    setTimeout(() => {
      onGenerate();
    }, 50);
  };

  const editorFontSizeClass =
    fontSizeMode === 'sm'
      ? 'text-[11px]'
      : fontSizeMode === 'lg'
      ? 'text-sm'
      : 'text-xs';

  const lineCount = story ? story.split('\n').length : 0;

  return (
    <div id="story-input-card" className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
      {/* Step Header & Mode Switcher */}
      <div className="border-b border-slate-200 pb-3 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h2 className="text-base font-bold text-slate-800">수학 이야기 & 알고리즘 입력</h2>
          </div>
          {story && inputMode === 'story' && (
            <button
              type="button"
              onClick={() => setStory('')}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-600 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> 전체 지우기
            </button>
          )}
        </div>

        {/* Input Mode Selector Tabs (3 Modes) */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setInputMode('story')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition ${
              inputMode === 'story'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="truncate">자연어 문장 입력</span>
          </button>

          <button
            type="button"
            onClick={() => setInputMode('guided')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition ${
              inputMode === 'guided'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="truncate">📐 4단계 구조화 가이드</span>
          </button>

          <button
            type="button"
            onClick={() => setInputMode('expert')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition ${
              inputMode === 'expert'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span className="truncate">🧠 전문가시스템</span>
          </button>
        </div>
      </div>

      {inputMode === 'expert' ? (
        /* Expert System Dedicated Builder */
        <ExpertSystemBuilder
          onGenerateFromRules={handleGenerateFromExpertRules}
          isLoading={isLoading}
          onSelectPreset={onSelectPreset}
        />
      ) : inputMode === 'guided' ? (
        /* Guided Step-by-Step Structure Builder */
        <GuidedAlgorithmBuilder
          onGenerateFromSteps={handleGenerateFromGuided}
          isLoading={isLoading}
        />
      ) : (
        /* Standard Story Input Mode */
        <>
          {/* Preset Problem Selection */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                교과서 & AI 수학 추천 예제 선택:
              </label>

              {/* Explicit Custom Input Button */}
              <button
                type="button"
                id="btn-custom-story-mode"
                onClick={() => {
                  onSelectPreset({
                    id: '',
                    title: '나만의 수학 알고리즘 직접 작성',
                    category: '기초 반복/누적',
                    description: '사용자가 직접 입력한 맞춤형 수학 알고리즘',
                    story: '',
                    presetResult: {
                      algorithmTitle: '나만의 수학 알고리즘',
                      mermaid: `graph TD\n    Start([시작]) --> Input[/"수학 문제 상황 입력"/]\n    Input --> Process["수학 연산 및 조건 처리"]\n    Process --> Output[/"결과 출력"/]\n    Output --> Stop([종료])`,
                      problemSummary: '직접 입력한 수학 문제 상황에 대한 알고리즘입니다. 문장을 작성한 후 [순서도 생성 및 시뮬레이션 시작]을 클릭하세요.',
                      variables: [
                        { name: 'N', role: '상태 또는 제어 변수', initialValue: '0' },
                        { name: 'S', role: '연산 결과 누적 변수', initialValue: '0' },
                      ],
                      traceSteps: [
                        {
                          stepNum: 1,
                          iteration: '작성 대기',
                          description: '수학 상황을 입력하고 [순서도 생성 및 시뮬레이션 시작]을 클릭하여 분석을 시작합니다.',
                          varStates: 'N=0, S=0',
                          conditionResult: '준비 완료',
                        },
                      ],
                      finalOutput: '순서도 생성을 실행하면 최종 계산 결과가 표시됩니다.',
                      mathConcept: '자연어로 기술된 수학적 문제 상황을 변수, 조건 판단, 반복 구조로 분해하여 절차적 알고리즘으로 설계하는 인공지능 수학 기본 역량입니다.',
                      quiz: {
                        question: '알고리즘을 표준 순서도로 시각화할 때 얻을 수 있는 가장 중요한 이점은 무엇인가요?',
                        options: ['문제 해결 절차와 조건 분기 흐름을 직관적·구조적으로 파악', '하드웨어 연산 속도 즉시 증대', '변수 선언 절차 생략 가능', '컴퓨터 전원 절약'],
                        answerIndex: 0,
                        explanation: '순서도는 복잡한 논리적 절차와 조건 판단을 표준화된 도형 기호로 나타내어 누구나 알고리즘의 동작을 명확히 이해하고 검증할 수 있도록 돕습니다.',
                      },
                    },
                  });
                  setStory('');
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg border transition flex items-center gap-1.5 shadow-2xs ${
                  !selectedPresetId
                    ? 'bg-amber-500 text-white border-amber-600 ring-2 ring-amber-200'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
                }`}
              >
                <span>✍️ 나만의 수학 상황 직접 작성</span>
              </button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? '전체 예제' : cat}
                </button>
              ))}
            </div>

            {/* Preset Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1 max-h-56 overflow-y-auto pr-1">
              {filteredPresets.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onSelectPreset(preset)}
                    className={`p-2.5 rounded-lg border text-left transition flex flex-col gap-1 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 ring-1 ring-indigo-500'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-semibold text-xs text-slate-900 truncate">
                        {preset.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 shrink-0 font-medium">
                        {preset.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Story Textarea Header with Font Size and Expand Controls */}
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="storyInput" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <span>직접 수학 상황 설명 작성 (자연어 / 한글):</span>
                {!selectedPresetId && (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full border border-amber-200">
                    ✍️ 사용자 직접 작성 모드
                  </span>
                )}
              </label>

              {/* View/Font size toolbar for Story Input */}
              <div className="flex items-center gap-2">
                <div className="inline-flex bg-slate-100 border border-slate-200 rounded-md p-0.5">
                  <span className="px-1.5 py-0.5 text-[10px] text-slate-500 flex items-center gap-1">
                    <Type className="w-3 h-3" /> 글씨:
                  </span>
                  <button
                    type="button"
                    onClick={() => setFontSizeMode('sm')}
                    className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${
                      fontSizeMode === 'sm' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    작게
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSizeMode('base')}
                    className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${
                      fontSizeMode === 'base' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    보통
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSizeMode('lg')}
                    className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${
                      fontSizeMode === 'lg' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    크게
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-indigo-600 transition"
                  title="입력창을 넓게 펼칩니다."
                >
                  {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                  <span>{isExpanded ? '기본' : '펼치기'}</span>
                </button>
              </div>
            </div>

            <textarea
              id="storyInput"
              rows={isExpanded ? 10 : 6}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder={`[직접 작성 예시]
1. N에 0, S에 0을 초깃값으로 설정합니다.
2. N에 N+2를 대입하고, S에 S+N을 누적합니다.
3. N이 20인지 판단하여, 20이 아니면 2번 과정으로 돌아가고,
4. 20이 되면 최종 누적합 S를 출력하고 종료합니다.`}
              className={`w-full p-3.5 border rounded-xl font-sans ${editorFontSizeClass} leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-y break-words whitespace-pre-wrap ${
                !selectedPresetId ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-300'
              }`}
            />

            {/* Character & Line info */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>긴 문장이나 여러 조건도 빠짐없이 입력하실 수 있습니다.</span>
              <span className="font-mono">{story.length}자 ({lineCount}줄)</span>
            </div>
          </div>

          {/* Quick Snippet Chips */}
          <div className="flex flex-col gap-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
              <PlusCircle className="w-3.5 h-3.5 text-indigo-600" />
              자주 쓰이는 알고리즘 & 전문가 규칙 표현 도우미 (클릭 시 추가):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'N에 0, S에 0을 대입합니다.',
                'N에 N+1을 대입합니다.',
                'S에 S+N을 대입합니다.',
                'N이 100에 도달했는지 판단합니다.',
                '규칙 1: IF (c^2 < a^2 + b^2) THEN (예각삼각형)',
                '규칙 2: IF (D > 0) THEN (실근 2개)',
                'S를 출력하고 프로그램을 끝냅니다.',
              ].map((phrase, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleInsertSnippet(phrase)}
                  className="text-[11px] px-2 py-1 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 rounded-md transition"
                >
                  + {phrase}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            id="btn-generate-flowchart"
            onClick={onGenerate}
            disabled={isLoading || !story.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-indigo-100 transition flex items-center justify-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>AI가 순서도와 결과를 분석하고 있습니다...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>순서도 생성 및 시뮬레이션 시작</span>
              </>
            )}
          </button>
        </>
      )}

      {/* Educational Notice */}
      <p className="text-[11px] text-center text-slate-400">
        ※ 생성된 순서도는 Mermaid.js 표준 그래프로 렌더링되며, 변수 단계별 추적표와 인공지능 수학 원리 해설이 함께 제공됩니다.
      </p>
    </div>
  );
};

