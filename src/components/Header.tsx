import React, { useState } from 'react';
import { Bot, ShieldCheck, Key, HelpCircle, GraduationCap, Sparkles } from 'lucide-react';

interface HeaderProps {
  customApiKey: string;
  setCustomApiKey: (key: string) => void;
  hasEnvKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  customApiKey,
  setCustomApiKey,
  hasEnvKey,
}) => {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [inputKey, setInputKey] = useState(customApiKey);

  const handleSaveKey = () => {
    setCustomApiKey(inputKey.trim());
    setShowKeyModal(false);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Subject Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-indigo-100">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                인공지능 수학 순서도 생성기
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                <GraduationCap className="w-3.5 h-3.5" />
                고등학교 인공지능 수학
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                개발자: <strong className="font-semibold text-indigo-900">Gabriel Math (Gabriel Byeongje Jeon)</strong>
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden md:block">
              수학적 상황 알고리즘 표현 · 순서도(Flowchart) 자동 렌더링 · 변수 변화 추적 및 결과 예측
            </p>
          </div>
        </div>

        {/* Right Status & Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Privacy Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="hidden lg:inline">개인정보 비수집 안심 모드</span>
            <span className="lg:hidden">안심 모드</span>
          </div>

          {/* API Key Status / Config Button */}
          <button
            onClick={() => setShowKeyModal(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
              customApiKey || hasEnvKey
                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                : 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {customApiKey ? '사용자 API Key 사용 중' : hasEnvKey ? 'AI 엔진 준비됨' : 'API Key 설정'}
            </span>
          </button>
        </div>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Key className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Gemini API Key 설정</h3>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Google AI Studio 서버 환경에 기본 키가 탑재되어 있어 별도 입력 없이도 사용 가능합니다. 학교나 개인의 커스텀 API 키를 사용하시려면 아래에 입력해주세요.
            </p>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Gemini API Key (선택 사항)
              </label>
              <input
                type="password"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="AI Studio API Key (AIzaSy...)"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">
                🔒 입력한 키는 브라우저 메모리에만 임시 저장되며 서버에 영구 기록되지 않습니다.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {customApiKey ? (
                <button
                  type="button"
                  onClick={() => {
                    setInputKey('');
                    setCustomApiKey('');
                    setShowKeyModal(false);
                  }}
                  className="text-xs text-rose-600 hover:underline"
                >
                  입력된 키 삭제 (기본값 사용)
                </button>
              ) : <div></div>}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSaveKey}
                  className="px-4 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-xs"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
