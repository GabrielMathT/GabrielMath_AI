import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Disable Express fingerprinting
app.disable('x-powered-by');

// Security Headers Middleware for dorms-check & production security
app.use((req, res, next) => {
  // Strict-Transport-Security (2 years)
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  
  // MIME Type Sniffing Prevention
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Clickjacking protection (fallback for older browsers)
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  
  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com data:; " +
    "img-src 'self' data: blob: https:; " +
    "connect-src 'self' https://generativelanguage.googleapis.com; " +
    "frame-ancestors 'self' https://ais-dev-aceusjdrkwpqlm2nvpn635-418235644195.asia-east1.run.app https://ais-pre-aceusjdrkwpqlm2nvpn635-418235644195.asia-east1.run.app https://*.run.app https://*.google.com https://*.aistudio.google.com;"
  );
  
  next();
});

// Standalone Privacy & Security Policy page for external crawler / dorms-check edzip inspection
app.get('/privacy', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>개인정보처리방침 및 보안정책 - 인공지능 수학 순서도 생성기</title>
  <meta name="description" content="인공지능 수학 순서도 생성기 개인정보처리방침, 보안 정책 및 학교운영위원회(에듀집) 기준 고지">
  <link rel="canonical" href="https://ais-dev-aceusjdrkwpqlm2nvpn635-418235644195.asia-east1.run.app/privacy" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif; line-height: 1.65; max-width: 860px; margin: 0 auto; padding: 2rem 1.25rem; color: #1e293b; background: #f8fafc; }
    .container { background: #ffffff; padding: 2.5rem; border-radius: 1rem; box-shadow: 0 4px 12px -2px rgb(0 0 0 / 0.08); border: 1px solid #e2e8f0; }
    h1 { font-size: 1.65rem; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.85rem; margin-top: 0; display: flex; align-items: center; gap: 0.5rem; }
    h2 { font-size: 1.2rem; color: #1e293b; margin-top: 2rem; border-left: 4px solid #4f46e5; padding-left: 0.75rem; }
    h3 { font-size: 1rem; color: #334155; margin-top: 1.25rem; }
    p, li { font-size: 0.935rem; color: #334155; }
    .badge-wrap { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
    .badge { display: inline-flex; align-items: center; gap: 0.25rem; background: #dcfce7; color: #166534; padding: 0.35rem 0.85rem; border-radius: 9999px; font-weight: 600; font-size: 0.85rem; border: 1px solid #bbf7d0; }
    .badge-sec { background: #ede9fe; color: #5b21b6; border-color: #ddd6fe; }
    .table-box { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.875rem; }
    .table-box th, .table-box td { border: 1px solid #cbd5e1; padding: 0.65rem 0.85rem; text-align: left; }
    .table-box th { background: #f1f5f9; color: #0f172a; font-weight: 600; }
    .code-tag { background: #f1f5f9; color: #0f172a; padding: 0.15rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.85rem; border: 1px solid #e2e8f0; }
    .alert-box { background: #f0fdf4; border: 1px solid #86efac; border-radius: 0.75rem; padding: 1rem 1.25rem; margin: 1.25rem 0; color: #166534; }
    .footer { margin-top: 2.5rem; font-size: 0.875rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
    .btn-home { display: inline-block; background: #4f46e5; color: #ffffff; padding: 0.5rem 1.25rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; transition: background 0.2s; }
    .btn-home:hover { background: #4338ca; }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge-wrap">
      <span class="badge">🛡️ 학교운영위원회(에듀집) 9대 필수 기준 준수</span>
      <span class="badge badge-sec">🔒 엔터프라이즈 보안 정책 (Security Policy) 적용</span>
    </div>
    
    <h1>개인정보처리방침 및 정보보안 정책</h1>
    <p>본 방침은 <strong>'인공지능 수학 - 순서도 생성 & 결과 예측기'</strong> 서비스의 학생·교사 개인정보 보호 원칙과 서비스가 준수하는 기술적·관리적 보안 정책을 명시합니다.</p>

    <div class="alert-box">
      <strong>✨ 핵심 안심 원칙 (Stateless Architecture):</strong><br>
      본 교육용 애플리케이션은 학생들의 개인정보를 서버 데이터베이스(DB)에 일체 저장하지 않는 <strong>서버 저장 0일(무저장)</strong> 원칙으로 운영되며, 회원가입이나 로그인 없이 안전하게 수업에 활용할 수 있습니다.
    </div>

    <h2>1. 개인정보 수집·이용 및 처리 방침</h2>
    <table class="table-box">
      <thead>
        <tr>
          <th>구분</th>
          <th>처리 항목</th>
          <th>처리 목적 및 보관 주기</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>서버 수집 항목</strong></td>
          <td><strong>수집 정보 일체 없음 (0건)</strong></td>
          <td>서버 DB 미운영, 서버 저장 기간 0일</td>
        </tr>
        <tr>
          <td><strong>화면 입력 항목</strong></td>
          <td>학습자 이름, 학번, 생각 쓰기 소감</td>
          <td>수업 중 브라우저 로컬 메모리에서 학습지 PDF 생성 용도로만 일시 사용 후 창 종료 시 즉시 파기</td>
        </tr>
        <tr>
          <td><strong>수학 알고리즘 텍스트</strong></td>
          <td>문제 설명 및 조건 텍스트</td>
          <td>순서도(Flowchart) 코드 생성을 위해 Google Gemini API로 전송 (개인정보 미포함)</td>
        </tr>
      </tbody>
    </table>

    <h2>2. 학교운영위원회(에듀집) 필수 기준 9대 항목 준수 현황</h2>
    <ul style="padding-left: 1.25rem; space-y: 0.5rem;">
      <li><strong>1. 최소 수집 원칙:</strong> 서비스 구동에 개인정보를 일체 요구하지 않습니다.</li>
      <li><strong>2. 이용 목적 명시:</strong> 고등학교 '인공지능 수학' 및 '정보' 과목 수업 알고리즘 시각화에만 사용됩니다.</li>
      <li><strong>3. 보유 기간 및 파기:</strong> 서버 저장 0일이며, 탭 종료 시 브라우저 메모리에서 영구 소멸합니다.</li>
      <li><strong>4. 안전조치:</strong> 전송 구간 암호화(HTTPS TLS v1.3) 및 HTTP 보안 헤더가 전면 적용되어 있습니다.</li>
      <li><strong>5. 정보주체 권리:</strong> 서버에 남는 개인정보가 없으며 사용자가 화면에서 언제든 초기화 가능합니다.</li>
      <li><strong>6. 만 14세 미만 아동 보호:</strong> 아동의 고유식별정보를 절대 수집·보관·전송하지 않습니다.</li>
      <li><strong>7. 개인정보 보호책임자:</strong> Gabriel Math (Gabriel Byeongje Jeon / db_gabriel@gabrielmath.kr)</li>
      <li><strong>8. 제3자 제공:</strong> 어떠한 학생 개인정보도 제3자에게 제공되지 않습니다.</li>
      <li><strong>9. 처리 위탁:</strong> AI 알고리즘 분석을 위해 구글 클라우드(Google Gemini API) 보안 환경을 안전하게 연동합니다.</li>
    </ul>

    <h2>3. 기술적 정보보안 정책 (Security Policy)</h2>
    <p>본 웹 애플리케이션은 웹 표준 및 교육 정보보안 가이드라인에 따라 아래의 보안 헤더 및 방어 기제를 상시 적용하고 있습니다.</p>
    
    <table class="table-box">
      <thead>
        <tr>
          <th>보안 정책 항목</th>
          <th>설정값 및 방어 메커니즘</th>
          <th>보안 효과</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Content-Security-Policy (CSP)</strong></td>
          <td><span class="code-tag">default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; frame-ancestors ...</span></td>
          <td>악성 스크립트 삽입(XSS) 및 악의적 외부 리소스 로딩 원천 차단</td>
        </tr>
        <tr>
          <td><strong>Strict-Transport-Security (HSTS)</strong></td>
          <td><span class="code-tag">max-age=63072000; includeSubDomains; preload</span></td>
          <td>항상 HTTPS(TLS v1.3) 암호화 연결을 강제하여 중간자 도청 방어</td>
        </tr>
        <tr>
          <td><strong>X-Frame-Options / frame-ancestors</strong></td>
          <td><span class="code-tag">SAMEORIGIN / frame-ancestors 'self' ...</span></td>
          <td>비인가 도메인의 화면 가로채기 및 클릭재킹(Clickjacking) 공격 방어</td>
        </tr>
        <tr>
          <td><strong>X-Content-Type-Options</strong></td>
          <td><span class="code-tag">nosniff</span></td>
          <td>브라우저가 파일 형식을 임의 추측하여 실행하는 MIME 스니핑 공격 방지</td>
        </tr>
        <tr>
          <td><strong>Referrer-Policy</strong></td>
          <td><span class="code-tag">strict-origin-when-cross-origin</span></td>
          <td>외부 링크 이동 시 불필요한 주소 경로 및 쿼리 파라미터 노출 방지</td>
        </tr>
        <tr>
          <td><strong>Permissions-Policy</strong></td>
          <td><span class="code-tag">camera=(), microphone=(), geolocation=()</span></td>
          <td>카메라, 마이크, GPS 등 민감한 브라우저 기기 권한을 원천 비활성화</td>
        </tr>
      </tbody>
    </table>

    <h2>4. 저작권 및 서비스 이용 안내</h2>
    <p>
      - <strong>개발자 및 권리자:</strong> Gabriel Math (Gabriel Byeongje Jeon)<br>
      - <strong>이용 허용 대상:</strong> 인증된 초·중·고 교사 및 학생의 비영리 교육적 수업 활동<br>
      - <strong>저작권 고지:</strong> © 2026 Gabriel Math (Gabriel Byeongje Jeon). All rights reserved.
    </p>

    <div class="footer">
      <div>
        <span>문의: <a href="mailto:db_gabriel@gabrielmath.kr" style="color: #4f46e5;">db_gabriel@gabrielmath.kr</a></span> | 
        <span>시행일자: 2026년 8월 20일</span>
      </div>
      <div>
        <a href="/" class="btn-home">← 앱 메인 화면으로 돌아가기</a>
      </div>
    </div>
  </div>
</body>
</html>`);
});

// Standalone Terms of Service page for external crawler inspection
app.get('/terms', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>이용약관 - 인공지능 수학 순서도 생성기</title>
  <meta name="description" content="인공지능 수학 순서도 생성기 이용약관 및 저작권 안내">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 2rem 1rem; color: #1e293b; background: #f8fafc; }
    .container { background: #ffffff; padding: 2.5rem; border-radius: 1rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 1px solid #e2e8f0; }
    h1 { font-size: 1.5rem; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.75rem; margin-top: 0; }
    h2 { font-size: 1.15rem; color: #1e293b; margin-top: 1.5rem; }
    p, li { font-size: 0.925rem; color: #334155; }
    .footer { margin-top: 2rem; font-size: 0.85rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 1rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>이용약관 및 권리 안내 (Terms of Service)</h1>
    
    <h2>1. 서비스의 목적</h2>
    <p>본 서비스는 고등학교 '인공지능 수학' 및 '정보' 과목 수업에서 수학적 알고리즘을 표준 순서도로 시각화하고 실행 과정을 추적할 수 있도록 지원하는 교육용 도구입니다.</p>

    <h2>2. 이용 대상 및 허용 범위</h2>
    <ul>
      <li><strong>이용 대상:</strong> 인증된 초·중·고 교사 및 학생의 비영리 교육적 수업 활동</li>
      <li><strong>허용 범위:</strong> 수업 중 순서도 시각화, 실행 추적, 학습지 PDF 출력 및 활용</li>
      <li><strong>제한 사항:</strong> 본 웹앱의 무단 상업적 재배포, 2차 가공 배포, 사전 승인 없는 AI 모델 학습 및 복제 행위는 금지됩니다.</li>
    </ul>

    <h2>3. 저작권 및 지식재산권</h2>
    <p>본 웹 애플리케이션의 디자인, 알고리즘 프롬프트 체계, 소스코드 및 관련 저작권은 개발자 <strong>Gabriel Math (Gabriel Byeongje Jeon)</strong>에게 있습니다.</p>

    <div class="footer">
      <p>© 2026 Gabriel Math (Gabriel Byeongje Jeon). All rights reserved.</p>
      <p><a href="/" style="color: #4f46e5; text-decoration: none;">← 앱 메인 화면으로 돌아가기</a></p>
    </div>
  </div>
</body>
</html>`);
});

app.use(express.json({ limit: '10mb' }));

// Helper to get Gemini client
function getGeminiClient(customApiKey?: string) {
  const key = customApiKey?.trim() || process.env.GEMINI_API_KEY;
  if (!key) return null;
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System prompt tailored for High School "Artificial Intelligence Mathematics" (인공지능 수학) & "Informatics" (정보)
const SYSTEM_PROMPT = `너는 고등학교 '인공지능 수학' 및 '정보' 과목의 교육 전문가이자 알고리즘 프로그래밍 전문가이다.
사용자가 입력한 수학적 알고리즘, 수학 이야기(자연어 설명), 또는 '전문가시스템 지식 베이스(IF-THEN 규칙)'를 분석하여:

1. Mermaid.js (graph TD) 형태의 표준 순서도 코드를 작성한다.
   - 순서도 기호 표준 준수:
     * 시작/끝: 타원 \`([시작])\`, \`([종료])\`
     * 입력/출력: 평행사변형 \`[/"입력: ..."/]\`, \`[/"출력: ..."/]\`
     * 처리/대입/연산: 직사각형 \`["S = S + N"]\`
     * 조건 판단: 마름모 \`{"N >= 20 ?"}\` 또는 \`{"x는 식물을 먹이로 하는가?"}\`
     * 분기 라벨: \`-->|예 Yes| B\` 및 \`-->|아니오 No| C\`
   - 전문가시스템(IF-THEN 규칙)의 경우:
     * 시작 -> 사실(Fact) 입력 -> 규칙 기반 조건 판단 마름모 분기망(결정 트리 구조) -> 결과 결론 출력 -> 종료 순서로 정확하고 간결한 순서도를 생성한다.
   - Mermaid 문법 에러 방지 규칙:
     * 괄호 ( ), 수식 기호(=, !=, >, <, *, +, -), 쉼표 등이 들어가는 노드 텍스트는 반드시 큰따옴표("")로 감싸서 작성한다. (예: \`B[/"계수 a, b, c 입력 (a ≠ 0)"/]\`)
     * 노드 ID는 A, B, C, D... 등으로 단순하게 작성할 것.
   - 시작 노드부터 종료 노드까지 연결이 끊김없이 유효한 그래프 구조를 가질 것.

2. 단계별 실행 추적표(Trace table):
   - 일반 알고리즘: 변수들의 초기 상태부터 반복문(Loop)의 각 회차별 변화 과정, 조건 판단 결과, 마지막 종료 및 출력값까지 단계별(최대 15~20스텝 이내로 요약 또는 전체)로 구조화.
   - 전문가시스템: 사실(Fact) 입력 단계 -> 추론 엔진의 각 지식 베이스 규칙(Rule 1, 2, 3...) 비교 검증 과정 -> 최종 판정 결론 도출 단계로 명확히 추적.

3. 인공지능 수학 및 수학적 개념 연계 설명:
   - 수학적 원리 (명제 논리, 조건문, 진리표, 수열의 합, 점화식, 팩토리얼, 피타고라스 정리, 이차방정식 판별식 등)
   - 인공지능 분야와의 연계성 (전문가시스템의 지식 베이스와 추론 엔진, 규칙 기반 AI, 의사결정나무, 반복적 가중치 업데이트 등)

4. 학생들을 위한 확인 퀴즈 1문제 (4지선다형 객관식, 정답 인덱스 0~3, 상세 해설).

반드시 지정된 JSON 스키마에 맞추어 응답하라.`;

app.post('/api/generate-flowchart', async (req, res) => {
  try {
    const { story, customApiKey } = req.body;

    if (!story || typeof story !== 'string') {
      return res.status(400).json({ error: '수학 이야기 내용을 입력해주세요.' });
    }

    const ai = getGeminiClient(customApiKey);

    if (!ai) {
      // Return a helpful error indicating API key is needed if not injected
      return res.status(400).json({
        error: 'API 키가 설정되지 않았습니다. Gemini API Key를 환경 변수 또는 화면에 입력해주세요.',
        needsKey: true,
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: `[사용자 입력 수학 상황/알고리즘 이야기]:\n${story}\n\n위 수학 상황을 인공지능 수학 순서도와 실행 예측 데이터로 변환해주세요.`,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            algorithmTitle: {
              type: Type.STRING,
              description: '알고리즘의 명확한 제목 (예: 2부터 20까지 짝수의 합 계산)',
            },
            mermaid: {
              type: Type.STRING,
              description: 'Mermaid graph TD 순서도 코드 (마크다운 백틱 제외)',
            },
            problemSummary: {
              type: Type.STRING,
              description: '수학적 상황 요약 및 문제 정의',
            },
            variables: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  role: { type: Type.STRING },
                  initialValue: { type: Type.STRING },
                },
                required: ['name', 'role', 'initialValue'],
              },
              description: '알고리즘에 사용된 변수 목록',
            },
            traceSteps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stepNum: { type: Type.INTEGER },
                  iteration: { type: Type.STRING },
                  description: { type: Type.STRING },
                  varStates: {
                    type: Type.STRING,
                    description: '변수 상태 (예: "N=2, S=2")',
                  },
                  conditionResult: {
                    type: Type.STRING,
                    description: '조건 판단 결과 (예: "2 >= 20 ? 거짓(False) -> 반복")',
                  },
                },
                required: ['stepNum', 'iteration', 'description', 'varStates'],
              },
              description: '단계별 변수 및 조건 실행 추적 과정',
            },
            finalOutput: {
              type: Type.STRING,
              description: '최종 출력값 및 결과 설명',
            },
            mathConcept: {
              type: Type.STRING,
              description: '수학적 원리 및 인공지능(AI) 개념과의 연계 해설',
            },
            quiz: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                answerIndex: { type: Type.INTEGER },
                explanation: { type: Type.STRING },
              },
              required: ['question', 'options', 'answerIndex', 'explanation'],
              description: '개념 확인 퀴즈',
            },
          },
          required: [
            'algorithmTitle',
            'mermaid',
            'problemSummary',
            'variables',
            'traceSteps',
            'finalOutput',
            'mathConcept',
            'quiz',
          ],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('AI 모델로부터 응답을 받지 못했습니다.');
    }

    const parsedData = JSON.parse(responseText);
    return res.json(parsedData);
  } catch (error: any) {
    console.error('Flowchart generation error:', error);
    return res.status(500).json({
      error: error.message || '순서도 및 결과 생성 중 오류가 발생했습니다.',
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasEnvKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

start();
