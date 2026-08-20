import { PresetExample } from '../types';

export const PRESET_EXAMPLES: PresetExample[] = [
  {
    id: 'even_sum',
    title: '2부터 20까지 짝수의 합 구하기',
    category: '기초 반복/누적',
    description: '교과서 대표 예제: 초기값 설정, 2씩 증가, 누적합 연산 및 종료 조건 판단',
    story: `N에 0, S에 0을 입력(초기화)합니다.
N에 N+2를 대입하여 다음 짝수를 만들고, S에 S+N을 대입하여 합을 누적합니다.
N이 20인지 판단하여, 20이 아니면 다시 N에 N+2를 대입하는 과정으로 돌아가고,
20이 되면 최종 누적합 S를 출력하고 프로그램을 끝냅니다.`,
    presetResult: {
      algorithmTitle: '2부터 20까지 짝수의 합 누적 계산',
      mermaid: `graph TD
    A([시작]) --> B[N = 0, S = 0 초기화]
    B --> C[N = N + 2]
    C --> D[S = S + N]
    D --> E{"N >= 20 ?"}
    E -->|아니오 No| C
    E -->|예 Yes| F[/S 출력/]
    F --> G([종료])`,
      problemSummary: '2부터 20까지의 짝수(2, 4, 6, ..., 20)를 순차적으로 생성하면서 변수 S에 누적하여 총합을 구하는 반복 알고리즘입니다.',
      variables: [
        { name: 'N', role: '현재 검사할 짝수 (2씩 증가)', initialValue: '0' },
        { name: 'S', role: '짝수들의 누적 합계 (Sum)', initialValue: '0' },
      ],
      traceSteps: [
        { stepNum: 1, iteration: '초기화', description: '변수 초기값 설정', varStates: 'N = 0, S = 0' },
        { stepNum: 2, iteration: '1회차', description: 'N=0+2=2, S=0+2=2', varStates: 'N = 2, S = 2', conditionResult: '2 >= 20 ? 거짓(False) -> 반복' },
        { stepNum: 3, iteration: '2회차', description: 'N=2+2=4, S=2+4=6', varStates: 'N = 4, S = 6', conditionResult: '4 >= 20 ? 거짓(False) -> 반복' },
        { stepNum: 4, iteration: '3회차', description: 'N=4+2=6, S=6+6=12', varStates: 'N = 6, S = 12', conditionResult: '6 >= 20 ? 거짓(False) -> 반복' },
        { stepNum: 5, iteration: '4회차', description: 'N=6+2=8, S=12+8=20', varStates: 'N = 8, S = 20', conditionResult: '8 >= 20 ? 거짓(False) -> 반복' },
        { stepNum: 6, iteration: '5회차', description: 'N=8+2=10, S=20+10=30', varStates: 'N = 10, S = 30', conditionResult: '10 >= 20 ? 거짓(False) -> 반복' },
        { stepNum: 7, iteration: '...회차', description: 'N=12~18 누적 진행', varStates: 'N = 18, S = 90', conditionResult: '18 >= 20 ? 거짓(False) -> 반복' },
        { stepNum: 8, iteration: '10회차 (마지막)', description: 'N=18+2=20, S=90+20=110', varStates: 'N = 20, S = 110', conditionResult: '20 >= 20 ? 참(True) -> 루프 탈출' },
        { stepNum: 9, iteration: '출력', description: '최종 합 S(110) 출력 후 종료', varStates: 'N = 20, S = 110' },
      ],
      finalOutput: '최종 출력값 S = 110 (2 + 4 + 6 + ... + 20 = 110)',
      mathConcept: '등차수열의 합 공식: 2부터 20까지 짝수 10개의 합은 n(a + l)/2 = 10 * (2 + 20) / 2 = 110 입니다. 컴퓨터 알고리즘에서는 반복문(Loop)과 누적 변수(Accumulator)를 통해 수학적 점화식 S_k = S_{k-1} + N_k 를 계산합니다.',
      quiz: {
        question: '위 순서도에서 반복문이 총 몇 번 실행되고 종료될까요?',
        options: ['8번', '9번', '10번', '20번'],
        answerIndex: 2,
        explanation: 'N이 0에서 시작하여 2씩 증가하면서 2, 4, 6, 8, 10, 12, 14, 16, 18, 20이 될 때까지 총 10회 반복 실행됩니다.',
      },
    },
  },
  {
    id: 'factorial',
    title: '1부터 5까지의 곱 (5! 팩토리얼 계산)',
    category: '기초 반복/누적',
    description: '누적 곱셈 연산과 계승(Factorial)의 알고리즘적 표현',
    story: `P에 1, K에 1을 입력(초기화)합니다.
P에 P*K를 대입하여 곱을 누적하고, K에 K+1을 대입하여 다음 정수를 만듭니다.
K가 6인지 판단하여, 6이 아니면 다시 P*K 대입 단계로 돌아가고,
K가 6이 되면 최종 곱 P를 출력하고 종료합니다.`,
    presetResult: {
      algorithmTitle: '5! (팩토리얼) 누적 곱 계산 알고리즘',
      mermaid: `graph TD
    A([시작]) --> B[P = 1, K = 1]
    B --> C[P = P * K]
    C --> D[K = K + 1]
    D --> E{"K > 5 ?"}
    E -->|아니오 No| C
    E -->|예 Yes| F[/P 출력/]
    F --> G([종료])`,
      problemSummary: '1부터 5까지의 자연수를 차례대로 곱하는 5! (5 계승)을 구하는 알고리즘입니다.',
      variables: [
        { name: 'P', role: '누적 곱 (Product, 초기값 1)', initialValue: '1' },
        { name: 'K', role: '현재 곱할 자연수 (1씩 증가)', initialValue: '1' },
      ],
      traceSteps: [
        { stepNum: 1, iteration: '초기화', description: '변수 초기값 설정 (곱셈 누적은 1로 초기화)', varStates: 'P = 1, K = 1' },
        { stepNum: 2, iteration: '1회차', description: 'P=1*1=1, K=1+1=2', varStates: 'P = 1, K = 2', conditionResult: '2 > 5 ? 거짓(False) -> 반복' },
        { stepNum: 3, iteration: '2회차', description: 'P=1*2=2, K=2+1=3', varStates: 'P = 2, K = 3', conditionResult: '3 > 5 ? 거짓(False) -> 반복' },
        { stepNum: 4, iteration: '3회차', description: 'P=2*3=6, K=3+1=4', varStates: 'P = 6, K = 4', conditionResult: '4 > 5 ? 거짓(False) -> 반복' },
        { stepNum: 5, iteration: '4회차', description: 'P=6*4=24, K=4+1=5', varStates: 'P = 24, K = 5', conditionResult: '5 > 5 ? 거짓(False) -> 반복' },
        { stepNum: 6, iteration: '5회차', description: 'P=24*5=120, K=5+1=6', varStates: 'P = 120, K = 6', conditionResult: '6 > 5 ? 참(True) -> 루프 탈출' },
        { stepNum: 7, iteration: '출력', description: '최종값 P(120) 출력 후 종료', varStates: 'P = 120, K = 6' },
      ],
      finalOutput: '최종 출력값 P = 120 (5! = 5 × 4 × 3 × 2 × 1 = 120)',
      mathConcept: '경우의 수와 순열에서 등장하는 계승(Factorial, n!)의 정의와 점화식 P_n = P_{n-1} × n 입니다. 곱셈의 항등원인 1을 초기값으로 설정하는 원리가 중요합니다.',
      quiz: {
        question: '누적 합(Sum)을 구할 때는 초기값을 0으로 두지만, 누적 곱(Product)을 구할 때 초기값을 1로 두는 이유는 무엇일까요?',
        options: [
          '컴퓨터 메모리가 1을 더 선호하기 때문',
          '0을 곱하면 모든 결과가 0이 되므로 곱셈의 항등원인 1을 사용해야 함',
          '알고리즘의 실행 속도를 높이기 위함',
          '종료 조건을 만족시키기 위함'
        ],
        answerIndex: 1,
        explanation: '0에 어떤 수를 곱해도 0이 되기 때문에, 곱셈의 항등원(identity element)인 1로 초기화해야 정상적인 계승 누적 계산이 가능합니다.',
      },
    },
  },
  {
    id: 'fibonacci',
    title: '피보나치 수열 제7항 구하기',
    category: '수열과 점화식',
    description: '앞선 두 항의 합으로 다음 항을 만드는 대표적인 인공지능 수학 점화식',
    story: `A에 1, B에 1, Count에 2를 대입하여 초기화합니다.
Next에 A+B를 대입하여 다음 피보나치 수를 구합니다.
A에 B를 대입하고, B에 Next를 대입하여 두 수를 한 칸씩 앞으로 이동시킵니다.
Count에 Count+1을 대입합니다.
Count가 7인지 판단하여, 7이 아니면 Next 계산 단계로 돌아가고,
7이 되면 B(제7항)를 출력하고 종료합니다.`,
    presetResult: {
      algorithmTitle: '피보나치 수열 제7항 계산 알고리즘',
      mermaid: `graph TD
    A([시작]) --> B[A = 1, B = 1, Count = 2]
    B --> C[Next = A + B]
    C --> D[A = B, B = Next]
    D --> E[Count = Count + 1]
    E --> F{"Count >= 7 ?"}
    F -->|아니오 No| C
    F -->|예 Yes| G[/B 출력/]
    G --> H([종료])`,
      problemSummary: 'F(1)=1, F(2)=1, F(n) = F(n-1) + F(n-2) 점화식에 따라 제7항 F(7)을 순차적으로 갱신하며 구하는 알고리즘입니다.',
      variables: [
        { name: 'A', role: '이전 이전 항 F(n-2)', initialValue: '1' },
        { name: 'B', role: '직전 항 F(n-1)', initialValue: '1' },
        { name: 'Next', role: '새로 계산된 현재 항 F(n)', initialValue: '미정' },
        { name: 'Count', role: '현재 항 번호 카운터', initialValue: '2' },
      ],
      traceSteps: [
        { stepNum: 1, iteration: '초기화', description: '1항=1, 2항=1, 카운트 2', varStates: 'A=1, B=1, Count=2' },
        { stepNum: 2, iteration: '3항 계산', description: 'Next=1+1=2, A=1, B=2, Count=3', varStates: 'A=1, B=2, Count=3', conditionResult: '3 >= 7 ? 거짓(False)' },
        { stepNum: 3, iteration: '4항 계산', description: 'Next=1+2=3, A=2, B=3, Count=4', varStates: 'A=2, B=3, Count=4', conditionResult: '4 >= 7 ? 거짓(False)' },
        { stepNum: 4, iteration: '5항 계산', description: 'Next=2+3=5, A=3, B=5, Count=5', varStates: 'A=3, B=5, Count=5', conditionResult: '5 >= 7 ? 거짓(False)' },
        { stepNum: 5, iteration: '6항 계산', description: 'Next=3+5=8, A=5, B=8, Count=6', varStates: 'A=5, B=8, Count=6', conditionResult: '6 >= 7 ? 거짓(False)' },
        { stepNum: 6, iteration: '7항 계산', description: 'Next=5+8=13, A=8, B=13, Count=7', varStates: 'A=8, B=13, Count=7', conditionResult: '7 >= 7 ? 참(True) -> 종료' },
        { stepNum: 7, iteration: '출력', description: '제7항 B=13 출력', varStates: 'A=8, B=13, Count=7' },
      ],
      finalOutput: '최종 출력값 B = 13 (피보나치 수열: 1, 1, 2, 3, 5, 8, 13)',
      mathConcept: '점화식(Recurrence relation) F_n = F_{n-1} + F_{n-2}의 알고리즘적 구현입니다. 변수 swap 및 갱신(State update)을 통해 메모리를 O(1)로 절약하며 순차 계산하는 동적 계획법(Dynamic Programming)의 기본 토대입니다.',
      quiz: {
        question: '피보나치 수열에서 다음 8번째 항 F(8)의 값은 무엇일까요?',
        options: ['18', '20', '21', '25'],
        answerIndex: 2,
        explanation: 'F(8) = F(7) + F(6) = 13 + 8 = 21 입니다.',
      },
    },
  },
  {
    id: 'gradient_descent',
    title: '경사하강법(Gradient Descent) 최적화 맛보기',
    category: '인공지능 핵심',
    description: '인공지능 수학 핵심: 손실함수 f(x)=x^2의 기울기(2x)를 따라 최솟값 x=0으로 이동',
    story: `초기 위치 X에 4.0, 학습률 lr에 0.2, 반복 횟수 Step에 0을 대입합니다.
현재 위치의 기울기 Grad에 2*X를 대입합니다.
X에 X - (lr * Grad)를 대입하여 기울기 반대 방향으로 이동합니다.
Step에 Step + 1을 대입합니다.
Step이 5에 도달했는지 판단하여, 아니면 다시 기울기 계산 단계로 돌아가고,
5에 도달하면 최적화된 위치 X를 출력하고 종료합니다.`,
    presetResult: {
      algorithmTitle: '1차원 경사하강법(Gradient Descent) 최적화 알고리즘',
      mermaid: `graph TD
    A([시작]) --> B[X = 4.0, lr = 0.2, Step = 0]
    B --> C[Grad = 2 * X]
    C --> D[X = X - lr * Grad]
    D --> E[Step = Step + 1]
    E --> F{"Step >= 5 ?"}
    F -->|아니오 No| C
    F -->|예 Yes| G[/최적화 위치 X 출력/]
    G --> H([종료])`,
      problemSummary: '손실함수 L(x) = x^2의 최솟값을 찾기 위해 미분계수(기울기 2x)를 계산하고, 학습률 0.2만큼 기울기 반대 방향으로 이동하여 최솟값(x=0)에 수렴해 가는 인공지능 최적화 알고리즘입니다.',
      variables: [
        { name: 'X', role: '현재 가중치/파라미터 위치', initialValue: '4.0' },
        { name: 'lr', role: '학습률 (Learning Rate)', initialValue: '0.2' },
        { name: 'Grad', role: '현재 점에서의 기울기 (d/dx x^2 = 2x)', initialValue: '미정' },
        { name: 'Step', role: '학습 반복 에포크(Epoch) 수', initialValue: '0' },
      ],
      traceSteps: [
        { stepNum: 1, iteration: '초기화', description: '시작점 X = 4.0, lr = 0.2, Step = 0', varStates: 'X = 4.0, Step = 0' },
        { stepNum: 2, iteration: 'Step 1', description: 'Grad = 2*4.0 = 8.0, X = 4.0 - (0.2*8.0) = 2.4', varStates: 'X = 2.4, Grad = 8.0, Step = 1', conditionResult: '1 >= 5 ? 거짓(False)' },
        { stepNum: 3, iteration: 'Step 2', description: 'Grad = 2*2.4 = 4.8, X = 2.4 - (0.2*4.8) = 1.44', varStates: 'X = 1.44, Grad = 4.8, Step = 2', conditionResult: '2 >= 5 ? 거짓(False)' },
        { stepNum: 4, iteration: 'Step 3', description: 'Grad = 2*1.44 = 2.88, X = 1.44 - (0.2*2.88) = 0.864', varStates: 'X = 0.864, Grad = 2.88, Step = 3', conditionResult: '3 >= 5 ? 거짓(False)' },
        { stepNum: 5, iteration: 'Step 4', description: 'Grad = 2*0.864 = 1.728, X = 0.864 - (0.2*1.728) = 0.5184', varStates: 'X = 0.5184, Grad = 1.728, Step = 4', conditionResult: '4 >= 5 ? 거짓(False)' },
        { stepNum: 6, iteration: 'Step 5', description: 'Grad = 1.0368, X = 0.5184 - 0.20736 = 0.31104', varStates: 'X = 0.311, Step = 5', conditionResult: '5 >= 5 ? 참(True) -> 종료' },
        { stepNum: 7, iteration: '출력', description: '5단계 경사하강 결과 X ≈ 0.311 출력', varStates: 'X ≈ 0.311' },
      ],
      finalOutput: '최종 위치 X ≈ 0.311 (초기 4.0에서 시작하여 최적해인 0에 근접함)',
      mathConcept: '인공지능 모델 훈련(딥러닝 가중치 최적화)의 핵심 원리입니다. 가중치 갱신 공식 W_{new} = W_{old} - η ∇L(W) 에 따라 미분계수(기울기)를 이용해 손실함수가 감소하는 방향으로 점진적으로 이동합니다.',
      quiz: {
        question: '경사하강법에서 학습률(lr)이 너무 크면 어떤 현상이 발생할 수 있을까요?',
        options: [
          '학습 속도가 항상 느려진다',
          '최솟값을 지나쳐 발산(Overshooting)하거나 진동할 수 있다',
          '컴퓨터 전원이 꺼진다',
          '기울기 값이 0이 된다'
        ],
        answerIndex: 1,
        explanation: '학습률(Learning Rate)이 너무 크면 최적의 극솟값을 지나쳐 발산(Overshoot)하여 최적해를 찾지 못할 수 있습니다.',
      },
    },
  },
  {
    id: 'gcd_euclid',
    title: '유클리드 호제법으로 최대공약수(GCD) 구하기',
    category: '탐색과 최적화',
    description: 'A와 B의 나눗셈 나머지를 이용해 최대공약수를 빠르게 찾는 수학 알고리즘',
    story: `A에 56, B에 24를 입력(초기화)합니다.
R에 A를 B로 나눈 나머지(A mod B)를 대입합니다.
A에 B를 대입하고, B에 R을 대입합니다.
B가 0인지 판단하여, 0이 아니면 다시 나머지 연산 단계로 돌아가고,
B가 0이 되면 현재 A를 최대공약수로 출력하고 끝냅니다.`,
    presetResult: {
      algorithmTitle: '유클리드 호제법을 이용한 최대공약수(GCD) 계산',
      mermaid: `graph TD
    A([시작]) --> B[A = 56, B = 24]
    B --> C[R = A % B]
    C --> D[A = B, B = R]
    D --> E{"B == 0 ?"}
    E -->|아니오 No| C
    E -->|예 Yes| F[/최대공약수 A 출력/]
    F --> G([종료])`,
      problemSummary: '두 양의 정수 A=56, B=24에 대하여 gcd(A, B) = gcd(B, A mod B) 원리를 적용하여 나머지가 0이 될 때까지 반복하여 최대공약수를 구합니다.',
      variables: [
        { name: 'A', role: '첫 번째 수 (나누어지는 수)', initialValue: '56' },
        { name: 'B', role: '두 번째 수 (나누는 수)', initialValue: '24' },
        { name: 'R', role: 'A를 B로 나눈 나머지 (A % B)', initialValue: '미정' },
      ],
      traceSteps: [
        { stepNum: 1, iteration: '초기화', description: 'A = 56, B = 24', varStates: 'A = 56, B = 24' },
        { stepNum: 2, iteration: '1회차', description: '56 % 24 = 8 (나머지 R=8) -> A=24, B=8', varStates: 'A = 24, B = 8, R = 8', conditionResult: '8 == 0 ? 거짓(False) -> 반복' },
        { stepNum: 3, iteration: '2회차', description: '24 % 8 = 0 (나머지 R=0) -> A=8, B=0', varStates: 'A = 8, B = 0, R = 0', conditionResult: '0 == 0 ? 참(True) -> 루프 탈출' },
        { stepNum: 4, iteration: '출력', description: '최종 최대공약수 A=8 출력', varStates: 'A = 8, B = 0' },
      ],
      finalOutput: '최대공약수 GCD(56, 24) = 8',
      mathConcept: '인류 역사상 가장 오래된 알고리즘 중 하나로, 정수론과 현대 암호학(RSA)의 핵심 기초입니다. 시간복잡도 O(log(min(A, B)))로 매우 빠릅니다.',
      quiz: {
        question: 'gcd(48, 18)을 유클리드 호제법으로 구할 때, 첫 번째 단계의 나머지(48 mod 18)는 얼마일까요?',
        options: ['6', '12', '18', '2'],
        answerIndex: 1,
        explanation: '48 = 18 × 2 + 12 이므로 첫 번째 나머지는 12입니다. 다음 단계에서 gcd(18, 12)를 계산하게 됩니다.',
      },
    },
  },
  {
    id: 'expert_animals',
    title: '동물의 식성에 따른 분류 전문가시스템',
    category: '전문가시스템 & 규칙',
    description: '교과서 본문 대표 예제: 지식 베이스(IF-THEN 규칙)와 사실 입력을 통한 동물 식성 판정',
    story: `[전문가시스템 지식 베이스]
규칙 1: IF (어떤 동물 x는 동물만 먹이로 한다.) THEN (육식 동물이다.)
규칙 2: IF (어떤 동물 x는 식물만 먹이로 한다.) THEN (초식 동물이다.)
규칙 3: IF (어떤 동물 x는 동물을 먹이로 한다 AND 식물을 먹이로 한다.) THEN (잡식 동물이다.)

[테스트 사실 (Fact)]
동물 x = '코끼리' (식물만 먹이로 함)를 입력하여 추론 엔진을 통해 분류 결과를 예측합니다.`,
    expertRules: [
      { id: '1', condition: '동물 x는 동물만 먹이로 한다', conclusion: '육식 동물이다' },
      { id: '2', condition: '동물 x는 식물만 먹이로 한다', conclusion: '초식 동물이다' },
      { id: '3', condition: '동물 x는 동물을 먹이로 한다 AND 식물을 먹이로 한다', conclusion: '잡식 동물이다' },
    ],
    testFact: "x = '코끼리' (식물만 섭취)",
    presetResult: {
      algorithmTitle: '동물의 식성 분류 전문가시스템 알고리즘',
      mermaid: `graph TD
    A([시작]) --> B[/동물 x 입력/]
    B --> C{"① x는 식물을 먹이로 하는가?"}
    C -->|예 Yes| D{"② x는 동물을 먹이로 하는가?"}
    C -->|아니오 No| E[/육식 동물 출력/]
    D -->|예 Yes| F[/잡식 동물 출력/]
    D -->|아니오 No| G[/초식 동물 출력/]
    E --> H([종료])
    F --> H
    G --> H`,
      problemSummary: '전문가의 지식을 지식 베이스(IF-THEN 규칙)로 저장하고, 사용자가 입력한 동물 x의 섭식 사실(Fact)을 바탕으로 추론 엔진이 논리 연산을 수행하여 육식/초식/잡식 동물을 분류하는 전문가시스템입니다.',
      variables: [
        { name: 'x', role: '분류할 대상 동물 이름 (예: 코끼리)', initialValue: '코끼리' },
        { name: 'eatsPlant', role: '식물을 먹이로 하는지 여부 (참/거짓)', initialValue: '참(True)' },
        { name: 'eatsMeat', role: '동물을 먹이로 하는지 여부 (참/거짓)', initialValue: '거짓(False)' },
        { name: 'result', role: '추론 엔진의 최종 판단 결과', initialValue: '미정' },
      ],
      traceSteps: [
        { stepNum: 1, iteration: '사실 입력', description: "사용자 인터페이스를 통해 x='코끼리' 입력", varStates: "x = '코끼리', eatsPlant = 참, eatsMeat = 거짓" },
        { stepNum: 2, iteration: '규칙 비교 ①', description: '조건 ①: x는 식물을 먹이로 하는가? 판정', varStates: 'eatsPlant == 참(True)', conditionResult: '참(True) -> 조건 ② 분기로 이동' },
        { stepNum: 3, iteration: '규칙 비교 ②', description: '조건 ②: x는 동물을 먹이로 하는가? 판정', varStates: 'eatsMeat == 거짓(False)', conditionResult: '거짓(False) -> 규칙 2 만족 (초식 동물)' },
        { stepNum: 4, iteration: '추론 결과 도출', description: "지식 베이스 규칙 2에 의해 result='초식 동물' 확정", varStates: "result = '초식 동물'" },
        { stepNum: 5, iteration: '결과 출력', description: "사용자 인터페이스에 '초식 동물' 출력 후 종료", varStates: "x = '코끼리', 출력: '초식 동물'" },
      ],
      finalOutput: "동물 '코끼리' 판정 결과: 초식 동물 (규칙 2: IF 식물만 먹이로 함 THEN 초식 동물)",
      mathConcept: '인공지능의 1세대 접근법인 전문가시스템(Expert System)의 원리입니다. [전문가의 지식 → 지식 베이스(IF A THEN B 규칙) → 추론 엔진(Inference Engine, 논리 연산) → 사용자 인터페이스] 구조로 이루어지며, 논리합(OR), 논리곱(AND), 조건문(IF)의 수학적 명제 논리를 순서도로 체계화합니다.',
      quiz: {
        question: "어떤 동물 x가 '곰'이고 식물과 동물을 모두 먹이로 한다면, 위 순서도에서 ①번 조건과 ②번 조건의 판단 결과는 각각 무엇일까요?",
        options: [
          '① 예, ② 예 (잡식 동물 출력)',
          '① 예, ② 아니오 (초식 동물 출력)',
          '① 아니오, ② 예 (육식 동물 출력)',
          '① 아니오, ② 아니오 (분류 불가)'
        ],
        answerIndex: 0,
        explanation: "곰은 식물을 먹으므로 ①번에서 '예'로 이동하고, 동물도 먹으므로 ②번에서도 '예'로 이동하여 '잡식 동물'을 출력합니다.",
      },
    },
  },
  {
    id: 'expert_triangles',
    title: '세 변의 길이에 따른 삼각형 분류 전문가시스템',
    category: '전문가시스템 & 규칙',
    description: '교과서 문제 08: 세 변 a, b, c(a ≤ b ≤ c)와 피타고라스 정리 규칙을 이용한 삼각형 종류 판별',
    story: `[전문가시스템 지식 베이스]
세 변의 길이가 a, b, c (a ≤ b ≤ c)인 삼각형에 대하여:
규칙 1: IF (c^2 < a^2 + b^2) THEN (예각삼각형이다.)
규칙 2: IF (c^2 = a^2 + b^2) THEN (직각삼각형이다.)
규칙 3: IF (c^2 > a^2 + b^2) THEN (둔각삼각형이다.)

[테스트 사실 (Fact)]
세 변의 길이 a = 3, b = 4, c = 5 를 입력하여 추론 엔진을 통해 어떤 삼각형인지 판정합니다.`,
    expertRules: [
      { id: '1', condition: 'c^2 < a^2 + b^2', conclusion: '예각삼각형이다' },
      { id: '2', condition: 'c^2 == a^2 + b^2', conclusion: '직각삼각형이다' },
      { id: '3', condition: 'c^2 > a^2 + b^2', conclusion: '둔각삼각형이다' },
    ],
    testFact: 'a = 3, b = 4, c = 5',
    presetResult: {
      algorithmTitle: '삼각형 분류 전문가시스템 (피타고라스 정리 기반)',
      mermaid: `graph TD
    A([시작]) --> B[/"세 변의 길이 a, b, c 입력 (a ≤ b ≤ c)"/]
    B --> C["LHS = c^2, RHS = a^2 + b^2 계산"]
    C --> D{"c^2 < a^2 + b^2 ?"}
    D -->|예 Yes| E[/"예각삼각형 출력"/]
    D -->|아니오 No| F{"c^2 == a^2 + b^2 ?"}
    F -->|예 Yes| G[/"직각삼각형 출력"/]
    F -->|아니오 No| H[/"둔각삼각형 출력"/]
    E --> I([종료])
    G --> I
    H --> I`,
      problemSummary: '세 변의 길이 a, b, c (a ≤ b ≤ c)를 입력받아 지식 베이스에 저장된 c^2과 a^2 + b^2의 대소 관계 규칙을 적용하여 예각·직각·둔각삼각형을 판별하는 전문가시스템 알고리즘입니다.',
      variables: [
        { name: 'a, b, c', role: '삼각형의 세 변의 길이 (가장 긴 변 c)', initialValue: 'a=3, b=4, c=5' },
        { name: 'LHS', role: '빗변의 제곱 c^2', initialValue: '25' },
        { name: 'RHS', role: '나머지 두 변의 제곱의 합 a^2 + b^2', initialValue: '25' },
        { name: 'result', role: '추론 엔진의 최종 삼각형 판정', initialValue: '미정' },
      ],
      traceSteps: [
        { stepNum: 1, iteration: '사실 입력', description: '세 변의 길이 a=3, b=4, c=5 입력', varStates: 'a = 3, b = 4, c = 5' },
        { stepNum: 2, iteration: '연산 처리', description: 'LHS = 5^2 = 25, RHS = 3^2 + 4^2 = 9 + 16 = 25 계산', varStates: 'LHS = 25, RHS = 25' },
        { stepNum: 3, iteration: '규칙 1 검사', description: 'LHS < RHS (25 < 25) 비교', varStates: '25 < 25', conditionResult: '거짓(False) -> 다음 규칙 검사로 이동' },
        { stepNum: 4, iteration: '규칙 2 검사', description: 'LHS == RHS (25 == 25) 비교', varStates: '25 == 25', conditionResult: '참(True) -> 규칙 2 충족 (직각삼각형)' },
        { stepNum: 5, iteration: '결과 출력', description: "추론 결과 '직각삼각형' 출력 후 종료", varStates: "result = '직각삼각형'" },
      ],
      finalOutput: '판정 결과: 직각삼각형 (c^2 = 25, a^2 + b^2 = 25 이므로 직각삼각형)',
      mathConcept: '피타고라스 정리의 역과 삼각형의 변의 길이 관계에 대한 수학적 정리입니다. 둔각(c^2 > a^2 + b^2), 직각(c^2 = a^2 + b^2), 예각(c^2 < a^2 + b^2)의 수학 규칙을 전문가시스템의 IF-THEN 지식 베이스로 표현하고 순서도로 제어 분기를 구현합니다.',
      quiz: {
        question: '세 변의 길이가 a=4, b=5, c=6 일 때, 위 전문가시스템의 판별 결과는 무엇일까요?',
        options: [
          '예각삼각형 (6^2 = 36 < 4^2 + 5^2 = 41)',
          '직각삼각형 (6^2 = 36 == 4^2 + 5^2 = 36)',
          '둔각삼각형 (6^2 = 36 > 4^2 + 5^2 = 30)',
          '삼각형이 만들어지지 않음'
        ],
        answerIndex: 0,
        explanation: 'c^2 = 36이고 a^2 + b^2 = 16 + 25 = 41이므로 c^2 < a^2 + b^2(36 < 41)을 만족하여 규칙 1에 의해 예각삼각형입니다.',
      },
    },
  },
  {
    id: 'expert_quadratic',
    title: '이차방정식 실근 개수 판별 전문가시스템',
    category: '전문가시스템 & 규칙',
    description: '교과서 문제 09: 판별식 D = b^2 - 4ac 규칙을 지식 베이스로 구축하여 실근 개수(2개, 1개, 0개) 판정',
    story: `[전문가시스템 지식 베이스]
세 실수 a, b, c (a ≠ 0)에 대하여 판별식 D = b^2 - 4ac 일 때:
규칙 1: IF (D > 0) THEN (서로 다른 두 실근 (실근 2개)이다.)
규칙 2: IF (D = 0) THEN (중근 (실근 1개)이다.)
규칙 3: IF (D < 0) THEN (서로 다른 두 허근 (실근 0개)이다.)

[테스트 사실 (Fact)]
이차방정식 2x^2 - 4x + 2 = 0 (a = 2, b = -4, c = 2)의 실근 개수를 추론 엔진으로 판정합니다.`,
    expertRules: [
      { id: '1', condition: 'D > 0', conclusion: '서로 다른 두 실근 (실근 2개)' },
      { id: '2', condition: 'D == 0', conclusion: '중근 (실근 1개)' },
      { id: '3', condition: 'D < 0', conclusion: '서로 다른 두 허근 (실근 0개)' },
    ],
    testFact: 'a = 2, b = -4, c = 2',
    presetResult: {
      algorithmTitle: '이차방정식 판별식(D) 실근 개수 판별 전문가시스템',
      mermaid: `graph TD
    A([시작]) --> B[/"계수 a, b, c 입력 (a != 0)"/]
    B --> C["판별식 D = b^2 - 4*a*c 계산"]
    C --> D{"D > 0 ?"}
    D -->|예 Yes| E[/"서로 다른 두 실근 2개 출력"/]
    D -->|아니오 No| F{"D == 0 ?"}
    F -->|예 Yes| G[/"중근 (실근 1개) 출력"/]
    F -->|아니오 No| H[/"서로 다른 두 허근 (실근 0개) 출력"/]
    E --> I([종료])
    G --> I
    H --> I`,
      problemSummary: '이차방정식 ax^2 + bx + c = 0의 계수 a, b, c를 입력받아 판별식 D = b^2 - 4ac를 계산하고, 지식 베이스 규칙을 통해 실근의 개수를 논리적으로 판정하는 전문가시스템입니다.',
      variables: [
        { name: 'a, b, c', role: '이차방정식의 계수들', initialValue: 'a=2, b=-4, c=2' },
        { name: 'D', role: '판별식 (Discriminant = b^2 - 4ac)', initialValue: '0' },
        { name: 'result', role: '추론된 실근의 개수 및 형태', initialValue: '미정' },
      ],
      traceSteps: [
        { stepNum: 1, iteration: '사실 입력', description: '이차방정식 계수 a=2, b=-4, c=2 입력', varStates: 'a = 2, b = -4, c = 2' },
        { stepNum: 2, iteration: '판별식 연산', description: 'D = (-4)^2 - 4*(2)*(2) = 16 - 16 = 0 계산', varStates: 'D = 0' },
        { stepNum: 3, iteration: '규칙 1 검사', description: 'D > 0 (0 > 0) 판단', varStates: 'D = 0', conditionResult: '거짓(False) -> 규칙 2 검사로 이동' },
        { stepNum: 4, iteration: '규칙 2 검사', description: 'D == 0 (0 == 0) 판단', varStates: 'D = 0', conditionResult: '참(True) -> 규칙 2 충족 (중근, 1개)' },
        { stepNum: 5, iteration: '결과 출력', description: "추론 결과 '중근 (실근 1개)' 출력 후 종료", varStates: "result = '중근 (실근 1개)'" },
      ],
      finalOutput: '판정 결과: 중근 (서로 같은 두 실근 1개, D = 0)',
      mathConcept: '근의 공식 x = (-b ± √(b^2 - 4ac)) / (2a) 에서 루트 안의 식 D = b^2 - 4ac의 부호에 따라 실근의 개수가 결정되는 수학적 원리입니다. 수학의 판별식 정리를 인공지능 지식 베이스의 결정 트리(Decision Tree) 및 규칙 기반 추론 엔진으로 완벽히 매핑할 수 있습니다.',
      quiz: {
        question: '이차방정식 x^2 - 2x + 5 = 0 (a=1, b=-2, c=5)을 이 전문가시스템에 입력하면 판별식 D의 값과 최종 출력은 무엇일까요?',
        options: [
          'D = 16, 서로 다른 두 실근 (2개)',
          'D = -16, 서로 다른 두 허근 (실근 0개)',
          'D = 0, 중근 (1개)',
          'D = -4, 서로 다른 두 실근 (2개)'
        ],
        answerIndex: 1,
        explanation: 'D = (-2)^2 - 4*(1)*(5) = 4 - 20 = -16 < 0 이므로 규칙 3에 의해 실근 0개(서로 다른 두 허근)가 출력됩니다.',
      },
    },
  },
  {
    id: 'expert_bloodtype',
    title: '혈액형 항원 판정 전문가시스템',
    category: '전문가시스템 & 규칙',
    description: '교과서 본문 예제: A 항원과 B 항원의 유무 사실(Fact)과 지식 베이스 규칙을 결합한 혈액형(A, B, AB, O형) 추론',
    story: `[전문가시스템 지식 베이스]
규칙 1: IF (A 항원이 있다.) THEN (A형이다 OR AB형이다.)
규칙 2: IF (B 항원이 있다.) THEN (B형이다 OR AB형이다.)
규칙 3: IF (A 항원이 없다 AND B 항원이 없다.) THEN (O형이다.)

[테스트 사실 (Fact)]
사실 1: A 항원이 있다. (hasA = true)
사실 2: B 항원이 있다. (hasB = true)
를 입력하여 추론 엔진을 통해 혈액형을 판정합니다.`,
    expertRules: [
      { id: '1', condition: 'A 항원이 있다', conclusion: 'A형이다 OR AB형이다' },
      { id: '2', condition: 'B 항원이 있다', conclusion: 'B형이다 OR AB형이다' },
      { id: '3', condition: 'A 항원이 없다 AND B 항원이 없다', conclusion: 'O형이다' },
    ],
    testFact: 'A 항원 = 있음, B 항원 = 있음',
    presetResult: {
      algorithmTitle: '혈액형 항원 판정 전문가시스템',
      mermaid: `graph TD
    A([시작]) --> B[/"항원 정보 입력: hasA, hasB"/]
    B --> C{"hasA == true ? (A 항원 있음)"}
    C -->|예 Yes| D{"hasB == true ? (B 항원 있음)"}
    C -->|아니오 No| E{"hasB == true ? (B 항원 있음)"}
    D -->|예 Yes| F[/"결과: AB형 출력"/]
    D -->|아니오 No| G[/"결과: A형 출력"/]
    E -->|예 Yes| H[/"결과: B형 출력"/]
    E -->|아니오 No| I[/"결과: O형 출력"/]
    F --> J([종료])
    G --> J
    H --> J
    I --> J`,
      problemSummary: '적혈구 표면의 A 항원과 B 항원의 유무를 입력받아, 지식 베이스 규칙과 논리곱(AND)·논리합(OR) 연산을 거쳐 사용자의 최종 혈액형(A, B, AB, O형)을 도출하는 전문가시스템입니다.',
      variables: [
        { name: 'hasA', role: 'A 항원 존재 여부 (참/거짓)', initialValue: '참(True)' },
        { name: 'hasB', role: 'B 항원 존재 여부 (참/거짓)', initialValue: '참(True)' },
        { name: 'bloodType', role: '추론 엔진이 확정한 최종 혈액형', initialValue: '미정' },
      ],
      traceSteps: [
        { stepNum: 1, iteration: '사실(Fact) 입력', description: 'A 항원=참, B 항원=참 입력', varStates: 'hasA = 참, hasB = 참' },
        { stepNum: 2, iteration: '규칙 1 추론', description: '사실 1(hasA=참)과 규칙 1에 의해 -> A형 또는 AB형 후보군 압축', varStates: "후보: ['A형', 'AB형']", conditionResult: 'hasA == 참(True)' },
        { stepNum: 3, iteration: '규칙 2 추론', description: '사실 2(hasB=참)과 규칙 2에 의해 -> B형 또는 AB형 후보군 압축', varStates: "후보: ['B형', 'AB형']", conditionResult: 'hasB == 참(True)' },
        { stepNum: 4, iteration: '추론 엔진 결합', description: '규칙 1과 규칙 2의 교집합(AND) 판정 -> AB형 확정', varStates: "bloodType = 'AB형'" },
        { stepNum: 5, iteration: '결과 출력', description: "최종 혈액형 'AB형' 출력 후 종료", varStates: "출력: 'AB형'" },
      ],
      finalOutput: '판정 결과: AB형 (A 항원과 B 항원이 모두 존재하므로 AB형 확정)',
      mathConcept: '집합론(Set Theory)의 교집합과 명제 논리의 조건문 결합입니다. 규칙 1의 결과 집합 {A, AB}와 규칙 2의 결과 집합 {B, AB}의 교집합 {A, AB} ∩ {B, AB} = {AB}를 추론 엔진이 논리 연산으로 도출하는 인공지능 지식 표현의 전형적인 예시입니다.',
      quiz: {
        question: 'A 항원은 없고, B 항원만 있는 경우(hasA=거짓, hasB=참) 위 순서도가 도출하는 최종 혈액형은 무엇일까요?',
        options: ['A형', 'B형', 'AB형', 'O형'],
        answerIndex: 1,
        explanation: "hasA가 거짓이므로 오른쪽 가지로 이동한 뒤 hasB가 참이므로 'B형'이 최종 출력됩니다.",
      },
    },
  },
];

