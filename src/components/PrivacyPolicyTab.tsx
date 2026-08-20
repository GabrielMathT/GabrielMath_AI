import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  FileText,
  UserCheck,
  AlertCircle,
  Database,
  ServerOff,
  Cpu,
  KeyRound,
  Printer,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface PrivacyPolicyTabProps {
  onBackToWorkbench: () => void;
}

export const PrivacyPolicyTab: React.FC<PrivacyPolicyTabProps> = ({ onBackToWorkbench }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="privacy-policy-view" className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-12">
      {/* Top Banner & Return Action */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-100 shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                개인정보처리방침 및 교육 보안 정책 관리
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                무저장(Stateless) 안심 인증
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              학교운영위원회 및 교육 정보보안 가이드라인(에듀집) 준수 표준 고지문
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>문서 인쇄 / PDF 저장</span>
          </button>
          <button
            type="button"
            onClick={onBackToWorkbench}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>순서도 워크벤치로 돌아가기</span>
          </button>
        </div>
      </div>

      {/* 4 Core Safeguard Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <ServerOff className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">서버 DB 완전 미수집</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              회원가입, 로그인, 데이터베이스(DB) 저장이 전혀 없는 100% 무저장 아키텍처
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">전송구간 TLS 1.3 암호화</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              HTTPS 보안 전송 및 HSTS, CSP 웹 보안 헤더 적용으로 패킷 가로채기 방어
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">브라우저 로컬 즉시 소멸</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              학생 이름/학번은 PDF 생성 시 클라이언트 메모리에서만 쓰이고 탭 종료 시 즉시 소멸
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">순수 교육용 목적 한정</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              고등학교 인공지능 수학 및 정보 교과 수업 지원 목적으로만 한정하여 무상 운영
            </p>
          </div>
        </div>
      </div>

      {/* Main Legal & Policy Clauses (5 Chapters) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
          <FileText className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">
            고등학교 교육용 인공지능 수학 순서도 생성기 개인정보 처리방침
          </h3>
        </div>

        {/* Declaration Box */}
        <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-xl flex items-start gap-3 text-emerald-950">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold text-emerald-900 block mb-0.5">안심 교육 서비스 원칙 선언</span>
            본 웹 애플리케이션(이하 "서비스")은 학생 및 교사의 개인정보 보호를 최우선 가치로 삼으며, 일체의 학생 식별정보(이름, 연락처, 주민번호 등)를 서버 데이터베이스에 수집·저장하지 않습니다. 모든 알고리즘 변환은 교육적 목적의 순서도 시각화 및 학습 성찰 활동에 한해 진행됩니다.
          </div>
        </div>

        {/* Chapter 1 */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 flex flex-col gap-2">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 text-indigo-950">
            <span>제1장 개인정보 처리 및 최소 수집 원칙 (제1조 ~ 제3조)</span>
          </h4>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700 leading-relaxed pl-1">
            <li>
              <strong>제1조 (수집 항목의 부존재):</strong> 본 서비스는 별도의 회원가입, 계정 생성, 로그인 절차가 없으며, 서버 저장소에 어떠한 개인정보도 수집하거나 누적하지 않습니다.
            </li>
            <li>
              <strong>제2조 (학생 성찰 및 입력 정보 처리):</strong> '생각 쓰기 & 학습 성찰' 기능에서 입력되는 학생 이름, 학번, 메모는 오직 학생 본인의 브라우저 메모리(RAM) 상에서만 일시적으로 유지되며, [학습지 PDF 보고서] 파일 생성 직후 브라우저 종료 또는 새로고침 시 영구히 소멸합니다.
            </li>
            <li>
              <strong>제3조 (수집·이용 목적의 한정):</strong> 고등학교 '인공지능 수학' 및 '정보' 과목 수업 중 자연어 알고리즘의 순서도(Flowchart) 렌더링, 변수 변화 추적(Trace Table), 확인 퀴즈 및 학습 보고서 작성을 지원하는 순수 교육적 목적 외에는 어떠한 용도로도 이용되지 않습니다.
            </li>
          </ul>
        </div>

        {/* Chapter 2 */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 flex flex-col gap-2">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 text-indigo-950">
            <span>제2장 보유 기간, 파기 절차 및 권리 보장 (제4조 ~ 제6조)</span>
          </h4>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700 leading-relaxed pl-1">
            <li>
              <strong>제4조 (보유 기간 및 파기):</strong> 서버 내 데이터 보관 기간은 0초(Stateless)입니다. 브라우저 탭을 닫거나 새로고침을 실행하면 모든 클라이언트 상태가 즉시 초기화되어 파기됩니다.
            </li>
            <li>
              <strong>제5조 (기술적·관리적 안전성 확보 조치):</strong> 전송구간 암호화(HTTPS/TLS v1.3), 콘텐츠 보안 정책(CSP), HSTS 강제, 클릭재킹 방지(X-Frame-Options), 확장자 변조 방지(nosniff) 등 웹 취약점 방어 조치를 철저히 적용하고 있습니다.
            </li>
            <li>
              <strong>제6조 (정보주체의 권리 및 행사 방법):</strong> 서버에 영구 보관되는 데이터가 존재하지 않으므로 열람·정정·삭제 요구 대상이 없으며, 사용자는 화면 상의 [새로고침] 또는 [지우기] 버튼을 통해 언제든 즉각 모든 입력을 초기화할 수 있습니다.
            </li>
          </ul>
        </div>

        {/* Chapter 3: Web Security Headers Table */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-sm text-indigo-950">
              제3장 웹 보안 정책 (Security Policy) 기술적 적용 현황
            </h4>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              전 항목 정상 가동 중
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-700">
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-indigo-900 block mb-0.5">Content-Security-Policy (CSP)</span>
              악성 스크립트(XSS) 주입 및 비인가 외부 리소스의 무단 로딩을 원천 차단
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-indigo-900 block mb-0.5">Strict-Transport-Security (HSTS)</span>
              모든 통신을 HTTPS(TLS v1.3) 보안 암호화 채널로 강제하여 도청 및 스니핑 방어
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-indigo-900 block mb-0.5">X-Frame-Options: SAMEORIGIN</span>
              타 웹사이트에서 불법 프레임으로 삽입하여 클릭을 유도하는 클릭재킹 공격 방지
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-indigo-900 block mb-0.5">X-Content-Type-Options: nosniff</span>
              브라우저가 파일 타입을 임의로 변조하여 악성 코드를 실행하는 취약점 차단
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-indigo-900 block mb-0.5">Referrer-Policy: strict-origin-when-cross-origin</span>
              외부 페이지로 이동 시 브라우저 주소창의 민감한 쿼리 정보 유출 방지
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-indigo-900 block mb-0.5">Permissions-Policy</span>
              카메라, 마이크, GPS 위치 정보, 결제 API 등 불필요한 브라우저 기기 권한 전면 비활성화
            </div>
          </div>
        </div>

        {/* Chapter 4 */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 flex flex-col gap-2">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 text-indigo-950">
            <span>제4장 아동 보호, 제3자 제공·위탁 및 보호책임자 (제8조 ~ 제10조)</span>
          </h4>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700 leading-relaxed pl-1">
            <li>
              <strong>제8조 (만 14세 미만 아동 보호):</strong> 학생 식별정보는 수집하지 않으며, 순수 수학 알고리즘 및 규칙 텍스트만 처리됩니다.
            </li>
            <li>
              <strong>제9조 (제3자 제공 및 AI 처리 위탁):</strong> 학생 개인정보의 제3자 제공은 일체 없습니다. 단, 사용자가 입력한 수학 알고리즘 설명 텍스트는 Google Cloud Gemini API(구글 클라우드 보안 환경)를 통해 암호화 전송되어 순서도 코드를 생성합니다.
            </li>
            <li>
              <strong>제10조 (개인정보 보호책임자 및 개발자):</strong>
              <div className="mt-1 bg-white p-2.5 rounded-lg border border-slate-200 font-sans">
                <div>• <strong>개발자 및 권리자:</strong> Gabriel Math (Gabriel Byeongje Jeon)</div>
                <div>• <strong>문의 이메일:</strong> db_gabriel@gabrielmath.kr</div>
                <div>• <strong>적용 교과:</strong> 고등학교 인공지능 수학, 정보</div>
              </div>
            </li>
          </ul>
        </div>

        {/* Chapter 5: Copyright & Licensing */}
        <div className="border border-indigo-200 rounded-xl p-4 bg-indigo-50/60 text-indigo-950 flex flex-col gap-2">
          <h4 className="font-bold text-indigo-900 text-sm flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>제5장 저작권 및 이용 허용 라이선스</span>
          </h4>
          <div className="text-xs space-y-1 leading-relaxed">
            <p>
              • <strong>이용 허용 범위:</strong> 전국 초·중·고등학교 정규 수업, 방과후 수업, 교원 연수 및 학생 자율 탐구 활동 목적의 무상 이용을 전면 허용합니다.
            </p>
            <p>
              • <strong>지식재산권 안내:</strong> 본 소프트웨어의 순서도 생성 파이프라인, 알고리즘 추적 엔진 및 UI 아키텍처에 대한 지식재산권은 <strong>Gabriel Math (Gabriel Byeongje Jeon)</strong>에 있습니다.
            </p>
            <p className="text-[11px] text-indigo-800 pt-1 border-t border-indigo-200/70">
              • <strong>권리 고지:</strong> © 2026 Gabriel Math (Gabriel Byeongje Jeon). All rights reserved. (무단 상업적 재배포 및 사전 승인 없는 AI 모델 학습 복제 금지)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
