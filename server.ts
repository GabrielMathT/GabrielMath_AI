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
