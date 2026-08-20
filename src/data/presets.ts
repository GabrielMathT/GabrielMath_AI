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
];
