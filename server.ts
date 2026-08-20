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

// Standalone Privacy Policy page for external crawler / dorms-check edzip inspection
app.get('/privacy', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>개인정보처리방침 - 인공지능 수학 순서도 생성기</title>
  <meta name="description" content="인공지능 수학 순서도 생성기 개인정보처리방침 및 학교운영위원회 기준 고지">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 2rem 1rem; color: #1e293b; background: #f8fafc; }
    .container { background: #ffffff; padding: 2.5rem; border-radius: 1rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 1px solid #e2e8f0; }
    h1 { font-size: 1.5rem; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.75rem; margin-top: 0; }
    h2 { font-size: 1.15rem; color: #1e293b; margin-top: 1.5rem; }
    p, li { font-size: 0.925rem; color: #334155; }
    .badge { display: inline-block; background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 9999px; font-weight: 600; font-size: 0.85rem; margin-bottom: 1rem; }
    .footer { margin-top: 2rem; font-size: 0.85rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 1rem; }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">🛡️ 학교운영위원회(에듀집) 기준 충족 안심 서비스</div>
    <h1>개인정보처리방침 (Privacy Policy)</h1>
    
    <h2>1. 개인정보 비수집 및 처리 원칙</h2>
    <p>본 '인공지능 수학 순서도 생성기'는 고등학교 인공지능 수학 및 정보 교육용 웹 애플리케이션으로, <strong>학생 및 교사의 개인 식별정보를 서버에 일체 수집·저장하지 않습니다.</strong></p>
    <ul>
      <li><strong>수집하는 개인정보:</strong> 없음 (회원가입, 로그인, DB 저장소 없음)</li>
      <li><strong>입력 데이터:</strong> 사용자가 화면에 입력하는 생각 쓰기(이름, 학번, 소감)는 사용자의 웹 브라우저 메모리에만 일시 존재하며, PDF 학습지 출력 또는 새로고침 시 즉시 파기됩니다.</li>
      <li><strong>수학 문제 설명:</strong> 입력된 알고리즘 이야기 텍스트는 순서도 생성을 위해 Google Gemini API로 전송되며, 개인정보는 포함되지 않습니다.</li>
    </ul>

    <h2>2. 개인정보의 보유 및 이용 기간</h2>
    <p><strong>서버 저장 기간 0일:</strong> 브라우저 탭을 닫거나 새로고침 시 모든 로컬 입력 데이터가 즉시 삭제됩니다.</p>

    <h2>3. 개인정보의 제3자 제공 및 위탁</h2>
    <p>본 서비스는 학생 및 이용자의 개인정보를 제3자에게 제공하거나 위탁하지 않습니다. AI 순서도 분석을 위해 전송되는 텍스트는 전송 구간 암호화(HTTPS TLS v1.3)를 통해 안전하게 처리됩니다.</p>

    <h2>4. 개인정보 보호책임자 및 개발자 정보</h2>
    <p>
      - <strong>개발자 / 관리자:</strong> Gabriel Math (Gabriel Byeongje Jeon)<br>
      - <strong>문의 이메일:</strong> db_gabriel@gabrielmath.kr<br>
      - <strong>적용 일자:</strong> 2026년 8월 20일
    </p>

    <div class="footer">
      <p>© 2026 Gabriel Math (Gabriel Byeongje Jeon). All rights reserved.</p>
      <p><a href="/" style="color: #4f46e5; text-decoration: none;">← 앱 메인 화면으로 돌아가기</a></p>
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
사용자가 입력한 수학적 알고리즘이나 수학 이야기(자연어 설명)를 분석하여:

1. Mermaid.js (graph TD) 형태의 표준 순서도 코드를 작성한다.
   - 순서도 기호 표준 준수:
     * 시작/끝: 타원 \`([시작])\`, \`([종료])\`
     * 입력/출력: 평행사변형 \`[/입력: .../]\`, \`[/출력: .../]\`
     * 처리/대입/연산: 직사각형 \`[S = S + N]\`
     * 조건 판단: 마름모 \`{"N >= 20?"}\`
     * 분기 라벨: \`-->|예 (Yes)| B\` 및 \`-->|아니오 (No)| C\`
   - Mermaid 문법 에러가 나지 않도록 따옴표, 특수문자 처리를 깔끔하고 단순하게 작성할 것. (노드 ID는 A, B, C, D... 등으로 단순하게)
   - 시작 노드부터 종료 노드까지 연결이 끊김없이 유효한 그래프 구조를 가질 것.

2. 단계별 실행 추적표(Trace table):
   - 변수들의 초기 상태부터 반복문(Loop)의 각 회차별 변화 과정, 조건 판단 결과, 마지막 종료 및 출력값까지 단계별(최대 15~20스텝 이내로 요약 또는 전체)로 구조화.

3. 인공지능 수학 및 수학적 개념 연계 설명:
   - 수학적 원리 (수열의 합, 점화식, 팩토리얼, 이진분할, 경사하강 최적화 등)
   - 인공지능 분야와의 연계성 (예: 반복적 가중치 업데이트, 오차 최소화, 탐색 알고리즘 등)

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
