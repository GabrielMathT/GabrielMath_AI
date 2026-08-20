import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, FileText, UserCheck, AlertCircle } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200 animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                개인정보처리방침 및 학교운영위원회(에듀집) 필수 기준 고지
              </h3>
              <p className="text-xs text-slate-500">학생 정보 비수집 및 교육용 안전 원칙 안내</p>
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
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-start gap-2.5 text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">안심 교육 서비스 선언: </span>
              본 웹 애플리케이션은 학생들의 개인정보 보호를 최우선으로 하며, 서버 데이터베이스(DB)나 외부 저장소에 학생 식별정보를 일체 저장하지 않는 무저장(Stateless) 아키텍처로 운영됩니다.
            </div>
          </div>

          {/* 제1조~제3조: 최소처리 원칙 */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
              <span>제1장 개인정보 처리 및 최소 수집 원칙 (제1조 ~ 제3조)</span>
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600">
              <li><strong>제1조 (수집 항목):</strong> 서버에서 수집·보관하는 개인정보는 일체 없습니다 (별도 회원가입이나 로그인 없음).</li>
              <li><strong>제2조 (학생 입력 정보):</strong> 생각 쓰기 및 학습 성찰에 입력하는 이름/학번은 순수 브라우저 로컬 메모리 상에서만 일시 유지되며, [학습지 PDF 다운로드] 생성 즉시 또는 탭 종료 시 즉시 소멸합니다.</li>
              <li><strong>제3조 (수집·이용 목적):</strong> 고등학교 '인공지능 수학' 및 '정보' 과목 수업 중 순서도(Flowchart) 시각화 및 알고리즘 예측 활동 지원만을 목적으로 합니다.</li>
            </ul>
          </div>

          {/* 제4조~제6조: 파기 및 안전조치 */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
              <span>제2장 보유 기간, 파기 및 기술적 안전조치 (제4조 ~ 제6조)</span>
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600">
              <li><strong>제4조 (보유 기간 및 파기):</strong> 서버 저장 0일. 브라우저 새로고침 또는 창을 닫을 시 클라이언트 메모리에서 즉시 영구 파기됩니다.</li>
              <li><strong>제5조 (기술적 안전조치):</strong> HTTPS(전송구간 암호화 TLS v1.3), CSP(콘텐츠 보안 정책), HSTS, X-Content-Type-Options: nosniff, 클릭재킹 방지 등 엔터프라이즈 수준의 웹 보안 헤더가 상시 적용되어 있습니다.</li>
              <li><strong>제6조 (정보주체 권리):</strong> 서버에 데이터가 남지 않으므로 열람·정정·삭제 요청 대상 개인정보가 존재하지 않으며, 사용자가 즉시 화면에서 초기화할 수 있습니다.</li>
            </ul>
          </div>

          {/* 제7조: 상세 보안 정책 표 */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
            <h4 className="font-bold text-slate-900 text-sm mb-2">
              제3장 웹 보안 정책 (Security Policy) 적용 현황
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="font-semibold text-indigo-900 block">Content-Security-Policy (CSP)</span>
                악성 스크립트(XSS) 삽입 및 비인가 도메인 리소스 로딩 차단
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="font-semibold text-indigo-900 block">Strict-Transport-Security (HSTS)</span>
                항상 HTTPS(TLS v1.3) 암호화 연결을 강제하여 중간자 도청 방어
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="font-semibold text-indigo-900 block">X-Frame-Options (Clickjacking 방어)</span>
                타 사이트에서 몰래 화면을 띄워 클릭을 가로채는 공격 방지
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="font-semibold text-indigo-900 block">X-Content-Type-Options: nosniff</span>
                브라우저의 파일 확장자 임의 변조 해석 공격 방어
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="font-semibold text-indigo-900 block">Referrer-Policy: strict-origin...</span>
                외부 링크 이동 시 민감한 URL 쿼리 정보 노출 방지
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="font-semibold text-indigo-900 block">Permissions-Policy</span>
                카메라, 마이크, GPS 위치 정보 등 불필요한 브라우저 기기 권한 차단
              </div>
            </div>
          </div>

          {/* 제8조~제10조: 아동 보호, 위탁, 책임자 */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
              <span>제4장 아동 보호, 제3자 제공·위탁 및 보호책임자 (제8조 ~ 제10조)</span>
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600">
              <li><strong>제8조 (만 14세 미만 아동 보호):</strong> 학생 식별정보는 외부로 절대 전송되지 않으며, 수학적 알고리즘 텍스트만 인공지능 프롬프트로 전송됩니다.</li>
              <li><strong>제9조 (제3자 제공 및 위탁):</strong> 학생 개인정보의 제3자 제공은 일체 없습니다. 단, 사용자가 입력한 수학 알고리즘 설명 텍스트는 Google Cloud Gemini API(구글 클라우드 보안 환경)를 통해 암호화 전송되어 순서도 코드를 생성합니다.</li>
              <li><strong>제10조 (개인정보 보호책임자 및 개발자):</strong> Gabriel Math (Gabriel Byeongje Jeon) / 문의 이메일: db_gabriel@gabrielmath.kr</li>
            </ul>
          </div>

          {/* 저작권 및 이용 라이선스 */}
          <div className="border border-indigo-100 rounded-xl p-4 bg-indigo-50/50 text-indigo-950">
            <h4 className="font-bold text-indigo-900 text-sm mb-1.5">
              제5장 저작권 및 이용 안내
            </h4>
            <p className="mb-1">
              - <strong>개발자 / 권리자:</strong> Gabriel Math (Gabriel Byeongje Jeon)
            </p>
            <p className="mb-1">
              - <strong>이용 허용 대상:</strong> 인증된 교사 및 고등학교 수업 목적 활용
            </p>
            <p className="text-[11px] text-indigo-800">
              - <strong>권리 고지:</strong> © 2026 Gabriel Math (Gabriel Byeongje Jeon). All rights reserved. (무단 상업적 재배포 및 사전 승인 없는 AI 모델 학습 복제 금지)
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex items-center justify-between">
          <div className="text-[11px] text-emerald-800 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>학생 개인정보 0일 보유 · 무저장(Stateless) 시스템</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-xs shadow-xs transition cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
