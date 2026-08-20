import React from 'react';
import { FileText, Shield, UserCheck, AlertCircle } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-slate-200 animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                이용약관 및 권리 안내
              </h3>
              <p className="text-xs text-slate-500">교육용 이용 허용 범위 및 지식재산권 안내</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg p-1.5 rounded-lg hover:bg-slate-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-xs text-slate-700 leading-relaxed flex flex-col gap-4">
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">
              1. 서비스 목적 및 성격
            </h4>
            <p className="text-slate-600">
              본 서비스는 고등학교 '인공지능 수학' 및 '정보' 과목 수업에서 수학적 알고리즘을 표준 순서도로 시각화하고 실행 과정을 추적할 수 있도록 지원하는 무상 교육용 웹 도구입니다.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">
              2. 이용 대상 및 허용 범위
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li><strong>이용 대상:</strong> 인증된 초·중·고 교사 및 학생의 정규 수업 및 방과후 학습 활동</li>
              <li><strong>허용 범위:</strong> 수업 중 순서도 시각화, 실행 추적, 학습지 PDF 출력 및 수업 자료 활용</li>
              <li><strong>제한 사항:</strong> 본 웹앱의 무단 상업적 재배포, 2차 가공 배포, 사전 승인 없는 AI 모델 학습 및 복제 행위는 엄격히 금지됩니다.</li>
            </ul>
          </div>

          <div className="border border-indigo-100 rounded-xl p-4 bg-indigo-50/50 text-indigo-950">
            <h4 className="font-bold text-indigo-900 text-sm mb-1.5">
              3. 저작권 및 개발자 정보
            </h4>
            <p className="mb-1">
              - <strong>개발자 / 저작권자:</strong> Gabriel Math (Gabriel Byeongje Jeon)
            </p>
            <p className="mb-1">
              - <strong>문의 이메일:</strong> db_gabriel@gabrielmath.kr
            </p>
            <p className="text-[11px] text-indigo-800">
              - <strong>저작권 고지:</strong> © 2026 Gabriel Math (Gabriel Byeongje Jeon). All rights reserved.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-xs shadow-xs transition"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
