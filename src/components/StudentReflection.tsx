import React, { useState } from 'react';
import { FlowchartResult, StudentReflectionData } from '../types';
import { exportWorksheetToPdf } from '../utils/exportUtils';
import {
  Download,
  CheckCircle2,
  Calendar,
  User,
  Hash,
  PenLine,
  Printer,
} from 'lucide-react';

interface StudentReflectionProps {
  story: string;
  result: FlowchartResult;
  reflectionData: StudentReflectionData;
  setReflectionData: React.Dispatch<React.SetStateAction<StudentReflectionData>>;
}

export const StudentReflection: React.FC<StudentReflectionProps> = ({
  story,
  result,
  reflectionData,
  setReflectionData,
}) => {
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const handleFieldChange = (field: keyof StudentReflectionData, value: string) => {
    setReflectionData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDownloadPdf = async () => {
    try {
      setIsExportingPdf(true);
      const studentLabel = reflectionData.studentName
        ? `_${reflectionData.studentName}`
        : '';
      const safeTitle = (result.algorithmTitle || '인공지능수학_학습지')
        .replace(/[^\w\sㄱ-힣-]/g, '')
        .trim();
      await exportWorksheetToPdf(
        'pdf-export-worksheet',
        `${safeTitle}_활동지${studentLabel}.pdf`
      );
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Reflection Input Card */}
      <div
        id="student-reflection-card"
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
      >
        {/* Card Header */}
        <div className="bg-slate-50 px-4 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg shadow-2xs">
              <PenLine className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">
                  📝 학생 생각 정리 & 성찰 노트 (Student Reflection)
                </h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  PDF 저장 지원
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                순서도를 설계하고 결과를 관찰하며 느낀 수학적 생각과 발견을 직접 기록하세요.
              </p>
            </div>
          </div>

          {/* Action: Export PDF Button */}
          <button
            id="btn-download-reflection-pdf"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition disabled:opacity-50"
          >
            {isExportingPdf ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>PDF 활동지 생성 중...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>📄 학습지 PDF 다운로드</span>
              </>
            )}
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 flex flex-col gap-5">
          {/* Metadata Row (Student Info - Optional for privacy) */}
          <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 flex-1 min-w-[140px]">
              <User className="w-4 h-4 text-slate-400" />
              <label className="font-semibold text-slate-700 shrink-0">이름:</label>
              <input
                type="text"
                placeholder="예: 홍길동 (선택)"
                value={reflectionData.studentName}
                onChange={(e) => handleFieldChange('studentName', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 flex-1 min-w-[140px]">
              <Hash className="w-4 h-4 text-slate-400" />
              <label className="font-semibold text-slate-700 shrink-0">학번/번호:</label>
              <input
                type="text"
                placeholder="예: 2학년 3반 15번"
                value={reflectionData.studentId}
                onChange={(e) => handleFieldChange('studentId', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 flex-1 min-w-[140px]">
              <Calendar className="w-4 h-4 text-slate-400" />
              <label className="font-semibold text-slate-700 shrink-0">수업 일자:</label>
              <input
                type="date"
                value={reflectionData.date}
                onChange={(e) => handleFieldChange('date', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Question 1: Algorithm Design & Variables */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-mono shrink-0">
                1
              </span>
              <span>알고리즘 설계 의도 및 변수 선정 이유</span>
            </label>
            <p className="text-[11px] text-slate-500 pl-7">
              해결하고자 하는 수학 문제의 목표와, 사용한 변수들이 각각 어떤 역할을 하는지 설명해보세요.
            </p>
            <textarea
              rows={3}
              value={reflectionData.algorithmDesignIntent}
              onChange={(e) => handleFieldChange('algorithmDesignIntent', e.target.value)}
              placeholder="직접 작성하기: 해결하려는 수학 문제 목표와 정의한 변수의 역할을 작성하세요."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white ml-0"
            />
          </div>

          {/* Question 2: Discoveries & Troubleshooting */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-mono shrink-0">
                2
              </span>
              <span>순서도 관찰 및 실행 시뮬레이션을 통해 발견한 점 / 오류 해결 경험</span>
            </label>
            <p className="text-[11px] text-slate-500 pl-7">
              반복문(Loop)과 조건 판단 분기에서 변수가 변화하는 과정 중 새롭게 알게 된 점을 기록해보세요.
            </p>
            <textarea
              rows={3}
              value={reflectionData.discoveriesAndTroubleshooting}
              onChange={(e) =>
                handleFieldChange('discoveriesAndTroubleshooting', e.target.value)
              }
              placeholder="직접 작성하기: 반복문 실행 횟수나 조건 분기에서 변수의 변화를 관찰하며 알게 된 점을 작성하세요."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            />
          </div>

          {/* Question 3: AI & Real-World Connection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-mono shrink-0">
                3
              </span>
              <span>인공지능(AI) 수학 개념 및 실생활 적용 아이디어</span>
            </label>
            <p className="text-[11px] text-slate-500 pl-7">
              이 순서도 알고리즘의 원리가 인공지능의 어떤 원리(예: 손실함수 최적화, 반복 갱신, 탐색 등)나 실생활에 어떻게 적용될 수 있을지 적어보세요.
            </p>
            <textarea
              rows={3}
              value={reflectionData.aiConnectionThought}
              onChange={(e) => handleFieldChange('aiConnectionThought', e.target.value)}
              placeholder="직접 작성하기: 인공지능 학습 원리(최적화, 가중치 갱신 등)나 실생활 적용 아이디어를 작성하세요."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            />
          </div>

          {/* Question 4: Key Takeaway */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-mono shrink-0">
                4
              </span>
              <span>오늘의 수업 한 줄 총평 및 느낀 점</span>
            </label>
            <textarea
              rows={2}
              value={reflectionData.keyTakeaway}
              onChange={(e) => handleFieldChange('keyTakeaway', e.target.value)}
              placeholder="직접 작성하기: 오늘 활동을 통해 느낀 점이나 총평을 작성하세요."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            />
          </div>
        </div>

        {/* Bottom PDF Download Action Banner */}
        <div className="bg-indigo-50/70 px-5 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
            <span className="text-xs text-indigo-950 font-medium">
              작성한 생각과 순서도, 실행 결과가 포함된 <strong>활동지 보고서</strong>를 생성하여 PDF로 인쇄/저장할 수 있습니다.
            </span>
          </div>

          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm transition flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
          >
            {isExportingPdf ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>PDF 생성 중...</span>
              </>
            ) : (
              <>
                <Printer className="w-4 h-4" />
                <span>PDF 활동지 저장 / 출력</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hidden Dedicated PDF Worksheet Template Container (Rendered offscreen with fixed 800px width for html2canvas) */}
      <div
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          width: '800px',
          zIndex: -999,
          opacity: 1,
          pointerEvents: 'none',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          id="pdf-export-worksheet"
          className="p-8 bg-white text-slate-900 font-sans border border-slate-200"
          style={{ width: '800px', backgroundColor: '#ffffff' }}
        >
          {/* Header */}
          <div className="border-b-2 border-indigo-700 pb-4 mb-6 flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-indigo-700 tracking-wider uppercase">
                고등학교 인공지능 수학 학습 활동지
              </span>
              <h1 className="text-2xl font-black text-slate-900 mt-1">
                {result.algorithmTitle || '수학 알고리즘 순서도 탐구 활동'}
              </h1>
            </div>
            <div className="text-right text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 min-w-[200px]">
              <p><strong>수업 일자:</strong> {reflectionData.date || new Date().toISOString().split('T')[0]}</p>
              <p className="mt-1"><strong>학번:</strong> {reflectionData.studentId || '(미입력)'}</p>
              <p className="mt-1"><strong>이름:</strong> {reflectionData.studentName || '(미입력)'}</p>
            </div>
          </div>

          {/* Section 1: Problem Definition */}
          <div className="mb-5 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
            <h2 className="font-bold text-indigo-900 mb-1 flex items-center gap-1.5">
              <span>📌 1. 수학 상황 및 알고리즘 정의</span>
            </h2>
            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
              {story || result.problemSummary}
            </p>
          </div>

          {/* Section 2: Flowchart Code & Variable Table */}
          <div className="mb-6 grid grid-cols-1 gap-4">
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <h2 className="font-bold text-slate-900 text-xs mb-2 flex items-center gap-1.5">
                <span>🔄 2. 생성된 표준 순서도 (Mermaid Graph 코드)</span>
              </h2>
              <pre className="p-3 bg-slate-50 rounded text-[10px] font-mono text-slate-700 border border-slate-200 whitespace-pre-wrap leading-tight">
                {result.mermaid}
              </pre>
            </div>

            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50 text-xs">
              <h3 className="font-bold text-slate-800 mb-2">📊 변수 명세 및 최종 예측 결과</h3>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {result.variables.map((v, i) => (
                  <div key={i} className="bg-white p-2 rounded border border-slate-200 text-[11px]">
                    <span className="font-bold text-indigo-700 font-mono">{v.name}</span>: {v.role} (초깃값: {v.initialValue})
                  </div>
                ))}
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded text-emerald-950 font-semibold text-xs">
                최종 예측 결과: {result.finalOutput}
              </div>
            </div>
          </div>

          {/* Section 3: Trace Steps (Summary) */}
          <div className="mb-6">
            <h2 className="font-bold text-slate-900 text-xs mb-2">
              📈 3. 단계별 변수 실행 추적 과정 (Trace Table)
            </h2>
            <table className="w-full text-left text-[11px] border border-slate-300">
              <thead className="bg-slate-100 text-slate-700 font-semibold">
                <tr className="border-b border-slate-300">
                  <th className="py-1 px-2 border-r border-slate-300 text-center">단계</th>
                  <th className="py-1 px-2 border-r border-slate-300">구분</th>
                  <th className="py-1 px-2 border-r border-slate-300">실행 내용</th>
                  <th className="py-1 px-2 border-r border-slate-300">변수 상태</th>
                  <th className="py-1 px-2">조건 판단</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {result.traceSteps.slice(0, 12).map((step, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="py-1 px-2 text-center border-r border-slate-300">{idx + 1}</td>
                    <td className="py-1 px-2 border-r border-slate-300 font-medium">{step.iteration}</td>
                    <td className="py-1 px-2 border-r border-slate-300">{step.description}</td>
                    <td className="py-1 px-2 border-r border-slate-300 font-mono font-semibold text-indigo-700">{step.varStates}</td>
                    <td className="py-1 px-2 font-mono text-[10px] text-slate-600">{step.conditionResult || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 4: AI & Math Concepts */}
          <div className="mb-6 bg-indigo-50/60 border border-indigo-100 p-3.5 rounded-lg text-xs leading-relaxed">
            <h2 className="font-bold text-indigo-950 mb-1">
              🧠 4. 인공지능 수학 핵심 원리
            </h2>
            <p className="text-indigo-900 whitespace-pre-wrap">{result.mathConcept}</p>
          </div>

          {/* Section 5: Student Reflection Notes (Core) */}
          <div className="border-t-2 border-indigo-600 pt-4 mt-4 flex flex-col gap-3.5">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span>✍️ 5. 학생 생각 정리 및 학습 성찰 (Student Reflection)</span>
            </h2>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <span className="font-bold text-slate-800 block mb-1">
                (1) 알고리즘 설계 의도 및 변수 선정 이유:
              </span>
              <p className="text-slate-700 whitespace-pre-wrap min-h-[40px]">
                {reflectionData.algorithmDesignIntent || '(작성 내용 없음)'}
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <span className="font-bold text-slate-800 block mb-1">
                (2) 순서도 관찰 및 시뮬레이션을 통해 발견한 점 / 오류 해결:
              </span>
              <p className="text-slate-700 whitespace-pre-wrap min-h-[40px]">
                {reflectionData.discoveriesAndTroubleshooting || '(작성 내용 없음)'}
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <span className="font-bold text-slate-800 block mb-1">
                (3) 인공지능(AI) 수학 개념 및 실생활 적용 아이디어:
              </span>
              <p className="text-slate-700 whitespace-pre-wrap min-h-[40px]">
                {reflectionData.aiConnectionThought || '(작성 내용 없음)'}
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <span className="font-bold text-slate-800 block mb-1">
                (4) 한 줄 총평 및 배운 점:
              </span>
              <p className="text-slate-700 whitespace-pre-wrap min-h-[30px]">
                {reflectionData.keyTakeaway || '(작성 내용 없음)'}
              </p>
            </div>

            {/* Teacher Feedback Box */}
            <div className="mt-2 p-3 border border-dashed border-slate-300 rounded-lg bg-white text-xs">
              <span className="font-bold text-slate-500 block mb-1">
                [선생님 확인 및 피드백]:
              </span>
              <div className="h-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
