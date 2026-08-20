import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Download, Copy, Check, ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, Sparkles, Image as ImageIcon, FileCode } from 'lucide-react';
import { downloadSvgAsPng } from '../utils/exportUtils';

interface MermaidViewerProps {
  code: string;
  title: string;
}

mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis',
  },
});

/**
 * Sanitizes and formats Mermaid syntax to prevent syntax parser errors caused by
 * special characters like ( ), !=, <, >, *, ^, etc., unquoted inside shape delimiters.
 */
function sanitizeMermaidCode(raw: string): string {
  let cleaned = raw
    .replace(/```mermaid/g, '')
    .replace(/```/g, '')
    .trim();

  if (!cleaned.startsWith('graph') && !cleaned.startsWith('flowchart')) {
    cleaned = 'graph TD\n' + cleaned;
  }

  const lines = cleaned.split('\n');
  const sanitizedLines = lines.map((line) => {
    let l = line;

    // 1. Fix unquoted parallelogram nodes: [/ ... /] -> [/"..."/]
    l = l.replace(/\[\/(?!")(.*?)(?<!")\/\]/g, (_, content) => {
      const escaped = content.trim().replace(/"/g, "'");
      return `[/"${escaped}"/]`;
    });

    // 2. Fix unquoted diamond condition nodes: { ... } -> {"..."}
    l = l.replace(/\{(?!")(.*?)(?<!")\}/g, (_, content) => {
      const escaped = content.trim().replace(/"/g, "'");
      return `{"${escaped}"}`;
    });

    // 3. Fix unquoted rectangle nodes with complex characters: [ ... ] -> ["..."]
    // Avoid stadium ([ ... ]) and parallelogram [/ ... /]
    l = l.replace(/(?<![\[\(])\[(?![\/"(])(.*?)(?<![\/"])\](?![\]\)])/g, (match, content) => {
      const trimmed = content.trim();
      if (!trimmed.startsWith('"') && /[=+\-*\/^()<>&!%,]/.test(trimmed)) {
        const escaped = trimmed.replace(/"/g, "'");
        return `["${escaped}"]`;
      }
      return match;
    });

    return l;
  });

  return sanitizedLines.join('\n');
}

export const MermaidViewer: React.FC<MermaidViewerProps> = ({ code, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState<number>(0.8);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExportingPng, setIsExportingPng] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const renderChart = async () => {
      if (!code) return;
      setError(null);

      const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`;
      const cleanCode = code
        .replace(/```mermaid/g, '')
        .replace(/```/g, '')
        .trim();

      // First attempt with original clean code
      try {
        const { svg } = await mermaid.render(id, cleanCode);
        if (isMounted) {
          setSvgContent(svg);
        }
        return;
      } catch (firstErr) {
        console.warn('Initial Mermaid render failed, attempting sanitization...', firstErr);
      }

      // Second attempt with sanitized code
      try {
        const sanitized = sanitizeMermaidCode(cleanCode);
        const retryId = `mermaid-retry-${Math.random().toString(36).substring(2, 9)}`;
        const { svg } = await mermaid.render(retryId, sanitized);
        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (finalErr: any) {
        console.error('Final Mermaid render error:', finalErr);
        if (isMounted) {
          setError('순서도 렌더링 중 문법 오류가 발생했습니다. 순서도 코드를 확인해주세요.');
        }
      }
    };

    renderChart();
    return () => {
      isMounted = false;
    };
  }, [code]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const handleDownloadPng = async () => {
    if (!containerRef.current) return;
    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    try {
      setIsExportingPng(true);
      const safeTitle = (title || '수학_순서도').replace(/[^\w\sㄱ-힣-]/g, '').trim();
      await downloadSvgAsPng(svgElement, `${safeTitle}_순서도.png`);
    } catch (err) {
      console.error('PNG download error:', err);
      alert('순서도 이미지(PNG) 저장 중 문제가 발생했습니다.');
    } finally {
      setIsExportingPng(false);
    }
  };

  const handleDownloadSvg = () => {
    if (!svgContent) return;
    const safeTitle = (title || '수학_순서도').replace(/[^\w\sㄱ-힣-]/g, '').trim();
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeTitle}_순서도.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(Number((prev + 0.1).toFixed(1)), 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(Number((prev - 0.1).toFixed(1)), 0.3));
  const handleResetZoom = () => setZoom(0.8);

  return (
    <div
      id="flowchart-container"
      className={`bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl' : 'shadow-sm'
      }`}
    >
      {/* Top Toolbar */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></div>
          <span className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            표준 순서도 (Flowchart)
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-medium">
            Mermaid.js 엔진
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Zoom Controls */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
            <button
              onClick={handleZoomOut}
              title="축소"
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded text-xs transition"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-500 min-w-[36px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              title="확대"
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded text-xs transition"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              title="기본 크기(80%)로 복원"
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded text-xs transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-[1px] bg-slate-300 mx-0.5"></div>

          {/* Copy Code */}
          <button
            onClick={handleCopyCode}
            title="Mermaid 코드 복사"
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '복사됨' : '코드'}</span>
          </button>

          {/* Download PNG Image */}
          <button
            id="btn-download-flowchart-png"
            onClick={handleDownloadPng}
            disabled={isExportingPng || !svgContent}
            title="순서도를 선명한 PNG 이미지 파일로 저장"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs transition disabled:opacity-50"
          >
            <ImageIcon className="w-3.5 h-3.5 text-indigo-200" />
            <span>{isExportingPng ? '변환 중...' : '🖼️ PNG 이미지 저장'}</span>
          </button>

          {/* Download SVG */}
          <button
            id="btn-download-flowchart-svg"
            onClick={handleDownloadSvg}
            disabled={!svgContent}
            title="순서도를 SVG 벡터 파일로 저장"
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs transition disabled:opacity-50"
          >
            <FileCode className="w-3.5 h-3.5 text-slate-500" />
            <span>SVG 저장</span>
          </button>

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? '창 복원' : '전체화면'}
            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition ml-0.5"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Diagram Canvas Area */}
      <div
        ref={containerRef}
        className="flex-1 p-6 bg-slate-50/50 min-h-[320px] max-h-[600px] overflow-auto flex items-center justify-center relative"
      >
        {error ? (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-sm max-w-md">
            <p className="font-semibold mb-1">순서도 렌더링 오류</p>
            <p className="text-xs">{error}</p>
            <pre className="mt-2 p-2 bg-white rounded text-[11px] font-mono text-slate-700 overflow-x-auto">
              {code}
            </pre>
          </div>
        ) : svgContent ? (
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              transition: 'transform 0.15s ease-out',
            }}
            className="mermaid-wrapper flex items-center justify-center w-full"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
            <div className="w-8 h-8 border-2 border-slate-300 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-xs">순서도를 렌더링하고 있습니다...</p>
          </div>
        )}
      </div>

      {/* Diagram Legend */}
      <div className="bg-slate-100/70 border-t border-slate-200 px-4 py-2 text-[11px] text-slate-600 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-700">기호 안내:</span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-2 rounded-full border border-slate-500 bg-white inline-block"></span> 시작/종료
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-2.5 skew-x-[-12deg] border border-slate-500 bg-white inline-block"></span> 입력/출력
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-2.5 border border-slate-500 bg-white inline-block"></span> 연산/대입
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rotate-45 border border-slate-500 bg-white inline-block"></span> 조건 판단
          </span>
        </div>
        <span className="text-slate-400 font-mono">고등학교 인공지능 수학 표준</span>
      </div>
    </div>
  );
};
