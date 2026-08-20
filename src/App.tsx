import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StoryInputForm } from './components/StoryInputForm';
import { MermaidViewer } from './components/MermaidViewer';
import { TraceSimulator } from './components/TraceSimulator';
import { ConceptExplainer } from './components/ConceptExplainer';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { StudentReflection } from './components/StudentReflection';
import { PRESET_EXAMPLES } from './data/presets';
import { FlowchartResult, PresetExample, StudentReflectionData } from './types';
import { Sparkles, GitFork, Play, BookOpen, AlertCircle, CheckCircle, PenLine, FileText } from 'lucide-react';

export default function App() {
  const [selectedPreset, setSelectedPreset] = useState<PresetExample>(PRESET_EXAMPLES[0]);
  const [story, setStory] = useState<string>(PRESET_EXAMPLES[0].story);
  const [result, setResult] = useState<FlowchartResult>(PRESET_EXAMPLES[0].presetResult);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [customApiKey, setCustomApiKey] = useState<string>('');
  const [hasEnvKey, setHasEnvKey] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'all' | 'flowchart' | 'trace' | 'concept' | 'reflection'>('all');

  const [reflectionData, setReflectionData] = useState<StudentReflectionData>({
    studentName: '',
    studentId: '',
    date: new Date().toISOString().split('T')[0],
    hypothesis: '',
    algorithmDesignIntent: '',
    discoveriesAndTroubleshooting: '',
    aiConnectionThought: '',
    keyTakeaway: '',
  });

  // Check health and API key status on mount
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.hasEnvKey === 'boolean') {
          setHasEnvKey(data.hasEnvKey);
        }
      })
      .catch((err) => console.log('Health check note:', err));
  }, []);

  const handleSelectPreset = (preset: PresetExample) => {
    setSelectedPreset(preset);
    setStory(preset.story);
    setResult(preset.presetResult);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!story.trim()) return;

    setIsLoading(true);
    setError(null);

    // Check if the current story matches any preset exactly
    const matchingPreset = PRESET_EXAMPLES.find(
      (p) => p.story.trim() === story.trim()
    );

    try {
      const response = await fetch('/api/generate-flowchart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          story,
          customApiKey: customApiKey || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If API fails or key is not set, but matches a preset, fallback gracefully
        if (matchingPreset) {
          setResult(matchingPreset.presetResult);
          return;
        }
        throw new Error(data.error || '순서도 생성에 실패했습니다.');
      }

      setResult(data);
    } catch (err: any) {
      console.error('Generation error:', err);
      // If we have a matching preset fallback, use it
      if (matchingPreset) {
        setResult(matchingPreset.presetResult);
      } else {
        setError(
          err.message ||
            'AI 생성 중 오류가 발생했습니다. 입력을 점검하거나 API Key 설정을 확인해주세요.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 font-sans flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navigation */}
      <Header
        customApiKey={customApiKey}
        setCustomApiKey={setCustomApiKey}
        hasEnvKey={hasEnvKey}
      />

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col gap-6">
        {/* Error Alert if any */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-start gap-3 text-rose-800 text-xs">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold">안내: </span>
              {error}
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-500 hover:text-rose-700 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Input Form (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <StoryInputForm
              story={story}
              setStory={setStory}
              onGenerate={handleGenerate}
              onSelectPreset={handleSelectPreset}
              isLoading={isLoading}
              selectedPresetId={selectedPreset.id}
            />

            {/* Quick Curriculum Guide Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm text-xs text-slate-600 flex flex-col gap-2">
              <h3 className="font-bold text-slate-800 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                인공지능 수학 학습 목표
              </h3>
              <ul className="list-disc list-inside space-y-1 text-slate-500 text-[11px] leading-relaxed">
                <li>자연어로 된 수학적 문제 상황을 절차적 알고리즘으로 구조화</li>
                <li>표준 순서도(시작/종료, 입출력, 처리, 조건판단)를 통해 흐름 시각화</li>
                <li>순서도 이미지를 PNG/SVG로 추출하여 포트폴리오에 활용</li>
                <li>루프(반복문)와 조건 분기에 따른 변수 값의 변화 과정을 추적표로 검증</li>
                <li><strong>생각 쓰기 & 성찰 노트를 작성하고 학습지 PDF 보고서로 저장</strong></li>
              </ul>
            </div>
          </div>

          {/* Right Column: Output & Simulation (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Output Header with Title and Tabs */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wide">
                  2. 분석 및 실행 결과
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-0.5">
                  {result.algorithmTitle || '알고리즘 분석 결과'}
                </h2>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                    activeTab === 'all'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  전체 보기
                </button>
                <button
                  onClick={() => setActiveTab('flowchart')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                    activeTab === 'flowchart'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  순서도
                </button>
                <button
                  onClick={() => setActiveTab('trace')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                    activeTab === 'trace'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  실행 추적
                </button>
                <button
                  onClick={() => setActiveTab('concept')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                    activeTab === 'concept'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  개념·퀴즈
                </button>
                <button
                  onClick={() => setActiveTab('reflection')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
                    activeTab === 'reflection'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
                  }`}
                >
                  <PenLine className="w-3 h-3" />
                  생각 쓰기 (PDF)
                </button>
              </div>
            </div>

            {/* Components Based on Active Tab */}
            {(activeTab === 'all' || activeTab === 'flowchart') && (
              <MermaidViewer
                code={result.mermaid}
                title={result.algorithmTitle}
              />
            )}

            {(activeTab === 'all' || activeTab === 'trace') && (
              <TraceSimulator
                steps={result.traceSteps}
                variables={result.variables}
                finalOutput={result.finalOutput}
              />
            )}

            {(activeTab === 'all' || activeTab === 'concept') && (
              <>
                <ConceptExplainer
                  title={result.algorithmTitle}
                  problemSummary={result.problemSummary}
                  mathConcept={result.mathConcept}
                />

                {result.quiz && <InteractiveQuiz quiz={result.quiz} />}
              </>
            )}

            {/* Student Thought & Reflection Section */}
            {(activeTab === 'all' || activeTab === 'reflection') && (
              <StudentReflection
                story={story}
                result={result}
                reflectionData={reflectionData}
                setReflectionData={setReflectionData}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">고등학교 인공지능 수학 순서도 생성 & 결과 예측기</span>
            <span className="text-slate-300">|</span>
            <span>교육용 무상 제공 프로그램</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-700 font-medium">※ 본 프로그램은 학생의 개인정보를 일체 수집 및 저장하지 않습니다.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
