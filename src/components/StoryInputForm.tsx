import React, { useState } from 'react';
import { PRESET_EXAMPLES } from '../data/presets';
import { PresetExample } from '../types';
import { ExpertSystemBuilder } from './ExpertSystemBuilder';
import { Play, Sparkles, BookOpen, Trash2, PlusCircle, Brain, FileText, Lightbulb } from 'lucide-react';

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
  const [inputMode, setInputMode] = useState<'story' | 'expert'>('story');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', '전문가시스템 & 규칙', '기초 반복/누적', '수열과 점화식', '탐색과 최적화', '인공지능 핵심'];

  const filteredPresets = selectedCategory === 'all'
    ? PRESET_EXAMPLES
    : PRESET_EXAMPLES.filter((p) => p.category === selectedCategory);

  const handleInsertSnippet = (snippet: string) => {
    setStory(story ? `${story.trim()}\n${snippet}` : snippet);
  };

  const handleGenerateFromExpertRules = (storyText: string) => {
    setStory(storyText);
    setTimeout(() => {
      onGenerate();
    }, 50);
  };

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
              <Trash2 className="w-3.5 h-3.5" /> 지우기
            </button>
          )}
        </div>

        {/* Input Mode Selector Tabs */}
        <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setInputMode('story')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition ${
              inputMode === 'story'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>자연어 수학 알고리즘</span>
          </button>

          <button
            type="button"
            onClick={() => setInputMode('expert')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition ${
              inputMode === 'expert'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>🧠 전문가시스템 규칙 빌더</span>
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

          {/* Story Textarea */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="storyInput" className="text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span>직접 수학 상황 설명 작성 (자연어 / 한글):</span>
              <span className="text-[11px] font-normal text-slate-400">자유로운 문장 또는 IF-THEN 규칙</span>
            </label>
            <textarea
              id="storyInput"
              rows={6}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder={`[입력 예시]
1. N에 0, S에 0을 입력(초기화)합니다.
2. N에 N+2를 대입하고, S에 S+N을 대입합니다.
3. N이 20인지 판단하여, 20이 아니면 2번 과정으로 돌아가고,
4. 20이 되면 S를 출력하고 프로그램을 마칩니다.`}
              className="w-full p-3.5 border border-slate-300 rounded-xl text-xs font-sans leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            />
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
