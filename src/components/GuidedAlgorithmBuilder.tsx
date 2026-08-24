import React, { useState } from 'react';
import { Sparkles, Plus, Trash2, ArrowRight, RotateCcw, Lightbulb, Play } from 'lucide-react';

interface GuidedAlgorithmBuilderProps {
  onGenerateFromSteps: (formattedStory: string) => void;
  isLoading: boolean;
}

interface GuidedVariable {
  name: string;
  initVal: string;
  role: string;
}

const PRESET_TEMPLATES = [
  {
    title: '🔢 1부터 10까지 자연수의 합',
    vars: [
      { name: 'N', initVal: '0', role: '1씩 증가하는 카운터' },
      { name: 'S', initVal: '0', role: '누적합계' },
    ],
    operations: ['N = N + 1', 'S = S + N'],
    condition: 'N >= 10',
    loopTargetStep: 2,
    output: '누적합 S',
  },
  {
    title: '⚡ 2부터 20까지 짝수의 합',
    vars: [
      { name: 'N', initVal: '0', role: '2씩 증가하는 짝수' },
      { name: 'S', initVal: '0', role: '누적합계' },
    ],
    operations: ['N = N + 2', 'S = S + N'],
    condition: 'N >= 20',
    loopTargetStep: 2,
    output: '누적합 S',
  },
  {
    title: '✨ 1부터 5까지 팩토리얼 (5!)',
    vars: [
      { name: 'N', initVal: '1', role: '1씩 증가하는 곱수' },
      { name: 'F', initVal: '1', role: '누적 곱(팩토리얼)' },
    ],
    operations: ['F = F * N', 'N = N + 1'],
    condition: 'N > 5',
    loopTargetStep: 2,
    output: '최종 팩토리얼 F',
  },
  {
    title: '⚖️ 점수 합격/불합격 판정',
    vars: [
      { name: 'Score', initVal: '85', role: '학생 시험 점수' },
      { name: 'Result', initVal: '미결정', role: '판정 결과' },
    ],
    operations: ['Result = (Score >= 80 ? "합격" : "불합격")'],
    condition: 'Score >= 80',
    loopTargetStep: 1,
    output: '판정 결과 Result',
  },
];

export const GuidedAlgorithmBuilder: React.FC<GuidedAlgorithmBuilderProps> = ({
  onGenerateFromSteps,
  isLoading,
}) => {
  const [vars, setVars] = useState<GuidedVariable[]>([
    { name: 'N', initVal: '0', role: '반복 카운터' },
    { name: 'S', initVal: '0', role: '누적합계' },
  ]);

  const [operations, setOperations] = useState<string[]>([
    'N = N + 1',
    'S = S + N',
  ]);

  const [condition, setCondition] = useState<string>('N >= 10');
  const [outputVar, setOutputVar] = useState<string>('누적합 S');

  const handleAddVar = () => {
    setVars([...vars, { name: 'x', initVal: '0', role: '상태 변수' }]);
  };

  const handleRemoveVar = (index: number) => {
    setVars(vars.filter((_, i) => i !== index));
  };

  const handleVarChange = (index: number, field: keyof GuidedVariable, value: string) => {
    const updated = [...vars];
    updated[index][field] = value;
    setVars(updated);
  };

  const handleAddOperation = () => {
    setOperations([...operations, 'S = S + N']);
  };

  const handleRemoveOperation = (index: number) => {
    setOperations(operations.filter((_, i) => i !== index));
  };

  const handleOperationChange = (index: number, value: string) => {
    const updated = [...operations];
    updated[index] = value;
    setOperations(updated);
  };

  const handleLoadTemplate = (template: typeof PRESET_TEMPLATES[0]) => {
    setVars(template.vars);
    setOperations(template.operations);
    setCondition(template.condition);
    setOutputVar(template.output);
  };

  // Compile structured inputs to a clean, well-formatted natural language story
  const generateFormattedStory = () => {
    const varInitText = vars
      .map((v) => `${v.name}에 ${v.initVal}`)
      .join(', ');

    const opText = operations.join(', ');

    let formatted = `1. [초깃값 설정]: ${varInitText}을 대입하여 변수를 초기화합니다.\n`;
    formatted += `2. [연산 및 상태 갱신]: ${opText}을 계산하여 상태를 갱신합니다.\n`;
    formatted += `3. [조건 판단 및 루프]: ${condition} 인지 판단하여, 만족하지 않으면(No) 2번 과정으로 돌아가서 반복하고,\n`;
    formatted += `4. [결과 출력 및 종료]: ${condition} 조건을 만족하면(Yes) ${outputVar}를 화면에 출력하고 알고리즘을 종료합니다.`;

    return formatted;
  };

  const handleSubmit = () => {
    const storyText = generateFormattedStory();
    onGenerateFromSteps(storyText);
  };

  return (
    <div id="guided-algorithm-builder" className="flex flex-col gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200">
      {/* Header & Quick Templates */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="p-1 bg-amber-100 text-amber-800 rounded-md font-bold text-xs">
              가이드 모드
            </span>
            <h3 className="text-xs font-bold text-slate-800">
              학생용 4단계 구조화 알고리즘 설계기
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">순서도 4대 기본 구조</span>
        </div>

        {/* Preset Templates Bar */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-500" /> 추천 구조 템플릿:
          </span>
          {PRESET_TEMPLATES.map((tmpl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleLoadTemplate(tmpl)}
              className="text-[11px] px-2.5 py-1 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 rounded-lg shadow-2xs font-medium transition"
            >
              {tmpl.title}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Interactive Step Cards */}
      <div className="flex flex-col gap-3">
        {/* Step 1: Init Variables */}
        <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <span className="text-xs font-bold text-emerald-950">
                1단계: 시작 및 초깃값 입력 (Input / Init)
              </span>
              <span className="text-[10px] text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded">
                ▱ 평행사변형
              </span>
            </div>
            <button
              type="button"
              onClick={handleAddVar}
              className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> 변수 추가
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {vars.map((v, idx) => (
              <div key={idx} className="flex items-center gap-1.5 bg-emerald-50/40 p-2 rounded-lg border border-emerald-100">
                <span className="text-xs font-bold text-emerald-800 shrink-0 font-mono">
                  변수 {idx + 1}:
                </span>
                <input
                  type="text"
                  value={v.name}
                  onChange={(e) => handleVarChange(idx, 'name', e.target.value)}
                  placeholder="변수명 (예: N)"
                  className="w-16 px-2 py-1 bg-white border border-emerald-200 rounded text-xs font-mono font-bold text-slate-800 text-center"
                />
                <span className="text-xs font-bold text-emerald-600">=</span>
                <input
                  type="text"
                  value={v.initVal}
                  onChange={(e) => handleVarChange(idx, 'initVal', e.target.value)}
                  placeholder="초깃값"
                  className="w-16 px-2 py-1 bg-white border border-emerald-200 rounded text-xs font-mono text-slate-800 text-center"
                />
                <input
                  type="text"
                  value={v.role}
                  onChange={(e) => handleVarChange(idx, 'role', e.target.value)}
                  placeholder="역할/용도"
                  className="flex-1 min-w-0 px-2 py-1 bg-white border border-emerald-200 rounded text-[11px] text-slate-600 truncate"
                />
                {vars.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveVar(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Process & Operations */}
        <div className="bg-white p-3.5 rounded-xl border border-sky-200 shadow-2xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <span className="text-xs font-bold text-sky-950">
                2단계: 반복 연산 및 계산 처리 (Process)
              </span>
              <span className="text-[10px] text-sky-700 font-mono bg-sky-50 px-1.5 py-0.5 rounded">
                ▭ 직사각형
              </span>
            </div>
            <button
              type="button"
              onClick={handleAddOperation}
              className="text-[11px] text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> 연산식 추가
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            {operations.map((op, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-sky-50/40 p-2 rounded-lg border border-sky-100">
                <span className="text-xs font-bold text-sky-800 shrink-0 font-mono">
                  연산 {idx + 1}:
                </span>
                <input
                  type="text"
                  value={op}
                  onChange={(e) => handleOperationChange(idx, e.target.value)}
                  placeholder="예: S = S + N 또는 N = N + 1"
                  className="flex-1 px-2.5 py-1 bg-white border border-sky-200 rounded text-xs font-mono font-bold text-slate-800"
                />
                {operations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOperation(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Decision & Condition */}
        <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <span className="text-xs font-bold text-amber-950">
                3단계: 조건 판단 & 반복/탈출 제어 (Decision & Loop)
              </span>
              <span className="text-[10px] text-amber-800 font-mono bg-amber-50 px-1.5 py-0.5 rounded">
                ◇ 마름모
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 bg-amber-50/40 p-2.5 rounded-lg border border-amber-100">
            <span className="text-xs font-bold text-amber-900 shrink-0">
              종료 검사 조건식:
            </span>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="예: N >= 10 또는 N == 20"
              className="flex-1 px-2.5 py-1 bg-white border border-amber-200 rounded text-xs font-mono font-bold text-slate-800"
            />
            <div className="flex items-center gap-2 text-[11px] text-slate-600 shrink-0">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                예(Yes) ➔ 4단계 출력
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                아니오(No) ➔ 2단계 반복
              </span>
            </div>
          </div>
        </div>

        {/* Step 4: Output & Terminate */}
        <div className="bg-white p-3.5 rounded-xl border border-indigo-200 shadow-2xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                4
              </span>
              <span className="text-xs font-bold text-indigo-950">
                4단계: 결과 출력 및 종료 (Output & End)
              </span>
              <span className="text-[10px] text-indigo-700 font-mono bg-indigo-50 px-1.5 py-0.5 rounded">
                ▱ 출력 / ⬭ 타원
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-indigo-50/40 p-2.5 rounded-lg border border-indigo-100">
            <span className="text-xs font-bold text-indigo-900 shrink-0">
              최종 화면 출력값:
            </span>
            <input
              type="text"
              value={outputVar}
              onChange={(e) => setOutputVar(e.target.value)}
              placeholder="예: 누적합 S 또는 최대값 Max"
              className="flex-1 px-2.5 py-1 bg-white border border-indigo-200 rounded text-xs font-mono font-bold text-slate-800"
            />
            <span className="text-[11px] text-indigo-700 font-medium px-2 py-0.5 bg-indigo-50 rounded">
              출력 후 종료([종료])
            </span>
          </div>
        </div>
      </div>

      {/* Structured Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading || vars.length === 0 || operations.length === 0}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-amber-100 transition flex items-center justify-center gap-2 text-sm disabled:opacity-40"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>순서도 및 변수 시뮬레이션을 생성하는 중...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-white" />
            <span>설계한 알고리즘 순서도 생성 및 시뮬레이션 시작</span>
          </>
        )}
      </button>
    </div>
  );
};
