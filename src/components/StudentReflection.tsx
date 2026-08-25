import React, { useState } from 'react';
import { FlowchartResult, StudentReflectionData } from '../types';
import { exportWorksheetToPdf, printWorksheet } from '../utils/exportUtils';
import {
  Download,
  CheckCircle2,
  Calendar,
  User,
  Hash,
  PenLine,
  Printer,
  Eye,
  Type,
  Maximize2,
  Minimize2,
  FileCheck,
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
  const [fontSizeMode, setFontSizeMode] = useState<'sm' | 'base' | 'lg'>('base');
  const [pdfFontScale, setPdfFontScale] = useState<'compact' | 'normal' | 'large'>('normal');
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [isExpandedEditor, setIsExpandedEditor] = useState(false);

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
        ? `_${reflectionData.studentName.trim()}`
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
      alert('PDF 생성 중 오류가 발생했습니다. 브라우저 인쇄(🖨️ 인쇄/PDF 저장) 버튼을 이용하실 수도 있습니다.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleBrowserPrint = () => {
    printWorksheet();
  };

  // Font size class mapping for UI editor
  const editorFontSizeClass =
    fontSizeMode === 'sm'
      ? 'text-[11px]'
      : fontSizeMode === 'lg'
      ? 'text-sm'
      : 'text-xs';

  // Font size class mapping for PDF worksheet
  const pdfTextClass =
    pdfFontScale === 'compact'
      ? 'text-[10px] leading-snug'
      : pdfFontScale === 'large'
      ? 'text-[13px] leading-relaxed'
      : 'text-[11px] leading-normal';

  const totalWords =
    (reflectionData.algorithmDesignIntent || '').length +
    (reflectionData.discoveriesAndTroubleshooting || '').length +
    (reflectionData.aiConnectionThought || '').length +
    (reflectionData.keyTakeaway || '').length;

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
                  PDF·인쇄 전체 출력 지원
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                순서도를 설계하고 결과를 관찰하며 느낀 수학적 생각과 발견을 직접 기록하세요. (글이 길어도 전체 내용이 모두 보존 및 출력됩니다)
              </p>
            </div>
          </div>

          {/* Action Buttons: PDF Download & Print */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFullPreview(!showFullPreview)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                showFullPreview
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title="작성된 전체 내용을 활동지 형태로 미리 확인합니다."
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showFullPreview ? '입력 화면으로' : '전체 내용 미리보기'}</span>
            </button>

            <button
              type="button"
              onClick={handleBrowserPrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold shadow-2xs transition"
              title="브라우저 인쇄 창을 열어 A4 용지로 출력하거나 PDF로 저장합니다."
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>인쇄 / 브라우저 PDF</span>
            </button>

            <button
              id="btn-download-reflection-pdf"
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition disabled:opacity-50"
            >
              {isExportingPdf ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>PDF 생성 중...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>📄 활동지 PDF 다운로드</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* View Controls Toolbar (Font Size & View Mode) */}
        <div className="bg-slate-100/70 px-4 py-2 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            {/* Editor Font Size Selector */}
            <div className="flex items-center gap-1.5 text-slate-600">
              <Type className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px] font-medium">입력창 글씨:</span>
              <div className="inline-flex bg-white border border-slate-200 rounded-md p-0.5">
                <button
                  type="button"
                  onClick={() => setFontSizeMode('sm')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded ${
                    fontSizeMode === 'sm' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="글씨를 작게 표시하여 많은 내용을 한눈에 봅니다."
                >
                  작게
                </button>
                <button
                  type="button"
                  onClick={() => setFontSizeMode('base')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded ${
                    fontSizeMode === 'base' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="표준 글씨 크기"
                >
                  보통
                </button>
                <button
                  type="button"
                  onClick={() => setFontSizeMode('lg')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded ${
                    fontSizeMode === 'lg' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="글씨를 크게 표시합니다."
                >
                  크게
                </button>
              </div>
            </div>

            {/* PDF Font Scale Selector */}
            <div className="flex items-center gap-1.5 text-slate-600">
              <FileCheck className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-[11px] font-medium">PDF 출력 배율:</span>
              <div className="inline-flex bg-white border border-slate-200 rounded-md p-0.5">
                <button
                  type="button"
                  onClick={() => setPdfFontScale('compact')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded ${
                    pdfFontScale === 'compact' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="작은 글씨로 많은 분량을 A4에 밀도 있게 담아냅니다."
                >
                  조밀(압축)
                </button>
                <button
                  type="button"
                  onClick={() => setPdfFontScale('normal')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded ${
                    pdfFontScale === 'normal' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="기본 배율"
                >
                  표준
                </button>
                <button
                  type="button"
                  onClick={() => setPdfFontScale('large')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded ${
                    pdfFontScale === 'large' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="글씨를 큼직하게 인쇄합니다."
                >
                  확대
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span>작성 글자 수: <strong className="text-slate-700 font-mono">{totalWords}자</strong></span>
            <button
              type="button"
              onClick={() => setIsExpandedEditor(!isExpandedEditor)}
              className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition"
              title="입력창을 넓게 펼칩니다."
            >
              {isExpandedEditor ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isExpandedEditor ? '기본 크기' : '입력창 넓게 펼치기'}</span>
            </button>
          </div>
        </div>

        {/* Live Preview Mode */}
        {showFullPreview ? (
          <div className="p-6 bg-slate-100/80 flex flex-col gap-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
              <span>💡 <strong>활동지 전체 실시간 미리보기 모드</strong>입니다. 긴 문장도 잘림 없이 온전히 표시되는지 확인하세요.</span>
              <button
                type="button"
                onClick={() => setShowFullPreview(false)}
                className="px-3 py-1 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700"
              >
                내용 수정하러 가기
              </button>
            </div>

            {/* Rendered Preview Card */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
              <div className="border-b border-indigo-600 pb-3 flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-bold text-indigo-700 tracking-wider">고등학교 인공지능 수학 학습 활동지</span>
                  <h2 className="text-lg font-bold text-slate-900 mt-0.5">{result.algorithmTitle || '수학 알고리즘 순서도 탐구'}</h2>
                </div>
                <div className="text-right text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                  <p><strong>수업 일자:</strong> {reflectionData.date || '(미입력)'}</p>
                  <p><strong>학번/이름:</strong> {reflectionData.studentId || '-'} {reflectionData.studentName || '-'}</p>
                </div>
              </div>

              {/* Problem Definition */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                <span className="font-bold text-indigo-900 block mb-1">📌 1. 수학 문제 상황 및 알고리즘 정의:</span>
                <p className="text-slate-800 whitespace-pre-wrap break-words leading-relaxed font-sans">
                  {story || result.problemSummary}
                </p>
              </div>

              {/* Student Answers */}
              <div className="flex flex-col gap-3">
                <div className="bg-indigo-50/40 p-3.5 rounded-lg border border-indigo-100 text-xs">
                  <span className="font-bold text-indigo-950 block mb-1.5">(1) 알고리즘 설계 의도 및 변수 선정 이유:</span>
                  <p className="text-slate-800 whitespace-pre-wrap break-words leading-relaxed min-h-[30px]">
                    {reflectionData.algorithmDesignIntent || '(작성 내용이 없습니다)'}
                  </p>
                </div>

                <div className="bg-indigo-50/40 p-3.5 rounded-lg border border-indigo-100 text-xs">
                  <span className="font-bold text-indigo-950 block mb-1.5">(2) 순서도 관찰 및 시뮬레이션을 통해 발견한 점 / 오류 해결:</span>
                  <p className="text-slate-800 whitespace-pre-wrap break-words leading-relaxed min-h-[30px]">
                    {reflectionData.discoveriesAndTroubleshooting || '(작성 내용이 없습니다)'}
                  </p>
                </div>

                <div className="bg-indigo-50/40 p-3.5 rounded-lg border border-indigo-100 text-xs">
                  <span className="font-bold text-indigo-950 block mb-1.5">(3) 인공지능(AI) 수학 개념 및 실생활 적용 아이디어:</span>
                  <p className="text-slate-800 whitespace-pre-wrap break-words leading-relaxed min-h-[30px]">
                    {reflectionData.aiConnectionThought || '(작성 내용이 없습니다)'}
                  </p>
                </div>

                <div className="bg-indigo-50/40 p-3.5 rounded-lg border border-indigo-100 text-xs">
                  <span className="font-bold text-indigo-950 block mb-1.5">(4) 오늘의 수업 한 줄 총평 및 느낀 점:</span>
                  <p className="text-slate-800 whitespace-pre-wrap break-words leading-relaxed min-h-[24px]">
                    {reflectionData.keyTakeaway || '(작성 내용이 없습니다)'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Editor Form Body */
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
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-mono shrink-0">
                    1
                  </span>
                  <span>알고리즘 설계 의도 및 변수 선정 이유</span>
                </div>
                <span className="text-[11px] font-normal text-slate-400 font-mono">
                  {(reflectionData.algorithmDesignIntent || '').length}자
                </span>
              </label>
              <p className="text-[11px] text-slate-500 pl-7">
                해결하고자 하는 수학 문제의 목표와, 사용한 변수들이 각각 어떤 역할을 하는지 설명해보세요.
              </p>
              <textarea
                rows={isExpandedEditor ? 6 : 3}
                value={reflectionData.algorithmDesignIntent}
                onChange={(e) => handleFieldChange('algorithmDesignIntent', e.target.value)}
                placeholder="직접 작성하기: 해결하려는 수학 문제 목표와 정의한 변수의 역할을 자유롭게 작성하세요."
                className={`w-full p-3 border border-slate-300 rounded-xl ${editorFontSizeClass} leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white resize-y break-words whitespace-pre-wrap`}
              />
            </div>

            {/* Question 2: Discoveries & Troubleshooting */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-mono shrink-0">
                    2
                  </span>
                  <span>순서도 관찰 및 실행 시뮬레이션을 통해 발견한 점 / 오류 해결 경험</span>
                </div>
                <span className="text-[11px] font-normal text-slate-400 font-mono">
                  {(reflectionData.discoveriesAndTroubleshooting || '').length}자
                </span>
              </label>
              <p className="text-[11px] text-slate-500 pl-7">
                반복문(Loop)과 조건 판단 분기에서 변수가 변화하는 과정 중 새롭게 알게 된 점을 기록해보세요.
              </p>
              <textarea
                rows={isExpandedEditor ? 6 : 3}
                value={reflectionData.discoveriesAndTroubleshooting}
                onChange={(e) =>
                  handleFieldChange('discoveriesAndTroubleshooting', e.target.value)
                }
                placeholder="직접 작성하기: 반복문 실행 횟수나 조건 분기에서 변수의 변화를 관찰하며 알게 된 점을 작성하세요."
                className={`w-full p-3 border border-slate-300 rounded-xl ${editorFontSizeClass} leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white resize-y break-words whitespace-pre-wrap`}
              />
            </div>

            {/* Question 3: AI & Real-World Connection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-mono shrink-0">
                    3
                  </span>
                  <span>인공지능(AI) 수학 개념 및 실생활 적용 아이디어</span>
                </div>
                <span className="text-[11px] font-normal text-slate-400 font-mono">
                  {(reflectionData.aiConnectionThought || '').length}자
                </span>
              </label>
              <p className="text-[11px] text-slate-500 pl-7">
                이 순서도 알고리즘의 원리가 인공지능의 어떤 원리(예: 손실함수 최적화, 반복 갱신, 지식 베이스 추론 등)나 실생활에 어떻게 적용될 수 있을지 적어보세요.
              </p>
              <textarea
                rows={isExpandedEditor ? 6 : 3}
                value={reflectionData.aiConnectionThought}
                onChange={(e) => handleFieldChange('aiConnectionThought', e.target.value)}
                placeholder="직접 작성하기: 인공지능 학습 원리(최적화, 가중치 갱신, 전문가시스템 규칙 등)나 실생활 적용 아이디어를 작성하세요."
                className={`w-full p-3 border border-slate-300 rounded-xl ${editorFontSizeClass} leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white resize-y break-words whitespace-pre-wrap`}
              />
            </div>

            {/* Question 4: Key Takeaway */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-mono shrink-0">
                    4
                  </span>
                  <span>오늘의 수업 한 줄 총평 및 느낀 점</span>
                </div>
                <span className="text-[11px] font-normal text-slate-400 font-mono">
                  {(reflectionData.keyTakeaway || '').length}자
                </span>
              </label>
              <textarea
                rows={isExpandedEditor ? 4 : 2}
                value={reflectionData.keyTakeaway}
                onChange={(e) => handleFieldChange('keyTakeaway', e.target.value)}
                placeholder="직접 작성하기: 오늘 활동을 통해 느낀 점이나 총평을 작성하세요."
                className={`w-full p-3 border border-slate-300 rounded-xl ${editorFontSizeClass} leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white resize-y break-words whitespace-pre-wrap`}
              />
            </div>
          </div>
        )}

        {/* Bottom PDF Download Action Banner */}
        <div className="bg-indigo-50/70 px-5 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
            <span className="text-xs text-indigo-950 font-medium">
              작성한 모든 내용과 순서도, 단계별 추적표가 온전히 포함된 <strong>활동지 보고서</strong>를 생성하여 저장하거나 인쇄할 수 있습니다.
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleBrowserPrint}
              className="flex-1 sm:flex-initial px-3.5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg border border-slate-300 shadow-2xs transition flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>인쇄 / PDF 출력</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm transition flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {isExportingPdf ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>PDF 생성 중...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>PDF 파일 저장</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Dedicated PDF / Print Worksheet Template Container (Rendered offscreen with fixed 800px width for html2canvas & print) */}
      <div
        id="printable-worksheet-container"
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
          className={`p-8 bg-white text-slate-900 font-sans border border-slate-200 ${pdfTextClass}`}
          style={{ width: '800px', backgroundColor: '#ffffff' }}
        >
          {/* Header */}
          <div className="border-b-2 border-indigo-700 pb-4 mb-5 flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-indigo-700 tracking-wider uppercase">
                고등학교 인공지능 수학 학습 활동지
              </span>
              <h1 className="text-xl font-black text-slate-900 mt-0.5">
                {result.algorithmTitle || '수학 알고리즘 순서도 탐구 활동'}
              </h1>
            </div>
            <div className="text-right text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 min-w-[200px]">
              <p><strong>수업 일자:</strong> {reflectionData.date || new Date().toISOString().split('T')[0]}</p>
              <p className="mt-0.5"><strong>학번:</strong> {reflectionData.studentId || '(미입력)'}</p>
              <p className="mt-0.5"><strong>이름:</strong> {reflectionData.studentName || '(미입력)'}</p>
            </div>
          </div>

          {/* Section 1: Problem Definition & Conditions (Full Prompt Unclipped) */}
          <div className="mb-4 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <h2 className="font-bold text-indigo-900 mb-1.5 flex items-center gap-1.5 text-xs">
              <span>📌 1. 수학 문제 상황 및 알고리즘 조건 (Prompt & Story)</span>
            </h2>
            <div className="text-slate-800 whitespace-pre-wrap break-words break-all leading-relaxed font-sans">
              {story || result.problemSummary}
            </div>
          </div>

          {/* Section 2: Flowchart Code & Variable Table */}
          <div className="mb-4 grid grid-cols-1 gap-3 page-break-inside-avoid">
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <h2 className="font-bold text-slate-900 text-xs mb-1.5 flex items-center gap-1.5">
                <span>🔄 2. 생성된 표준 순서도 (Mermaid Graph 코드)</span>
              </h2>
              <pre className="p-2.5 bg-slate-50 rounded text-[10px] font-mono text-slate-700 border border-slate-200 whitespace-pre-wrap break-words leading-tight">
                {result.mermaid}
              </pre>
            </div>

            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-xs mb-1.5">📊 변수 명세 및 최종 예측 결과</h3>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {result.variables.map((v, i) => (
                  <div key={i} className="bg-white p-2 rounded border border-slate-200 text-[10px]">
                    <span className="font-bold text-indigo-700 font-mono">{v.name}</span>: {v.role} (초깃값: {v.initialValue})
                  </div>
                ))}
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-2 rounded text-emerald-950 font-semibold text-xs">
                최종 예측 결과: {result.finalOutput}
              </div>
            </div>
          </div>

          {/* Section 3: Trace Steps (Full Trace Table) */}
          <div className="mb-4 page-break-inside-avoid">
            <h2 className="font-bold text-slate-900 text-xs mb-1.5">
              📈 3. 단계별 변수 실행 추적 과정 (Trace Table)
            </h2>
            <div className="overflow-hidden border border-slate-300 rounded">
              <table className="w-full text-left text-[10px]">
                <thead className="bg-slate-100 text-slate-700 font-semibold">
                  <tr className="border-b border-slate-300">
                    <th className="py-1 px-2 border-r border-slate-300 text-center w-10">단계</th>
                    <th className="py-1 px-2 border-r border-slate-300 w-20">구분</th>
                    <th className="py-1 px-2 border-r border-slate-300">실행 내용</th>
                    <th className="py-1 px-2 border-r border-slate-300 font-mono">변수 상태</th>
                    <th className="py-1 px-2 w-24">조건 판단</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {result.traceSteps.map((step, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-1 px-2 text-center border-r border-slate-300 font-mono">{idx + 1}</td>
                      <td className="py-1 px-2 border-r border-slate-300 font-medium">{step.iteration}</td>
                      <td className="py-1 px-2 border-r border-slate-300 break-words">{step.description}</td>
                      <td className="py-1 px-2 border-r border-slate-300 font-mono font-semibold text-indigo-700 break-words">{step.varStates}</td>
                      <td className="py-1 px-2 font-mono text-[9px] text-slate-600">{step.conditionResult || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: AI & Math Concepts */}
          <div className="mb-4 bg-indigo-50/60 border border-indigo-100 p-3 rounded-lg leading-relaxed page-break-inside-avoid">
            <h2 className="font-bold text-indigo-950 mb-1 text-xs">
              🧠 4. 인공지능 수학 핵심 원리
            </h2>
            <div className="text-indigo-950 whitespace-pre-wrap break-words leading-relaxed">
              {result.mathConcept}
            </div>
          </div>

          {/* Section 5: Student Reflection Notes (Core - Full Text Unclipped) */}
          <div className="border-t-2 border-indigo-600 pt-4 mt-4 flex flex-col gap-3">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span>✍️ 5. 학생 생각 정리 및 학습 성찰 (Student Reflection)</span>
            </h2>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1 text-xs">
                (1) 알고리즘 설계 의도 및 변수 선정 이유:
              </span>
              <div className="text-slate-800 whitespace-pre-wrap break-words break-all leading-relaxed min-h-[36px]">
                {reflectionData.algorithmDesignIntent || '(작성 내용 없음)'}
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1 text-xs">
                (2) 순서도 관찰 및 시뮬레이션을 통해 발견한 점 / 오류 해결:
              </span>
              <div className="text-slate-800 whitespace-pre-wrap break-words break-all leading-relaxed min-h-[36px]">
                {reflectionData.discoveriesAndTroubleshooting || '(작성 내용 없음)'}
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1 text-xs">
                (3) 인공지능(AI) 수학 개념 및 실생활 적용 아이디어:
              </span>
              <div className="text-slate-800 whitespace-pre-wrap break-words break-all leading-relaxed min-h-[36px]">
                {reflectionData.aiConnectionThought || '(작성 내용 없음)'}
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1 text-xs">
                (4) 한 줄 총평 및 배운 점:
              </span>
              <div className="text-slate-800 whitespace-pre-wrap break-words break-all leading-relaxed min-h-[28px]">
                {reflectionData.keyTakeaway || '(작성 내용 없음)'}
              </div>
            </div>

            {/* Teacher Feedback Box */}
            <div className="mt-2 p-3 border border-dashed border-slate-300 rounded-lg bg-white text-xs page-break-inside-avoid">
              <span className="font-bold text-slate-500 block mb-1">
                [선생님 확인 및 피드백]:
              </span>
              <div className="h-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

