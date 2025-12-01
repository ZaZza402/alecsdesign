export interface CalculatorOption {
  id: string;
  translationKey: string;
  complexity: number;
  independence: number;
}

export interface CalculatorQuestion {
  id: number;
  translationKey: string;
  multiSelect?: boolean;
  options: CalculatorOption[];
}

export const calculatorConfig: CalculatorQuestion[] = [
  {
    id: 1,
    translationKey: "q1",
    options: [
      { id: "opt1", translationKey: "opt1", complexity: 10, independence: 0 },
      { id: "opt2", translationKey: "opt2", complexity: 40, independence: 0 },
      { id: "opt3", translationKey: "opt3", complexity: 80, independence: 0 },
    ],
  },
  {
    id: 2,
    translationKey: "q2",
    options: [
      { id: "opt1", translationKey: "opt1", complexity: 0, independence: 3 },
      { id: "opt2", translationKey: "opt2", complexity: 0, independence: 1 },
      { id: "opt3", translationKey: "opt3", complexity: 0, independence: -3 },
    ],
  },
  {
    id: 3,
    translationKey: "q3",
    options: [
      { id: "opt1", translationKey: "opt1", complexity: 0, independence: 1 },
      { id: "opt2", translationKey: "opt2", complexity: 20, independence: -1 },
      { id: "opt3", translationKey: "opt3", complexity: 40, independence: -2 },
    ],
  },
  {
    id: 4,
    translationKey: "q4",
    multiSelect: true,
    options: [
      { id: "opt1", translationKey: "opt1", complexity: 0, independence: 0 },
      { id: "opt2", translationKey: "opt2", complexity: 15, independence: 0 },
      { id: "opt3", translationKey: "opt3", complexity: 25, independence: 0 },
      { id: "opt4", translationKey: "opt4", complexity: 30, independence: 0 },
    ],
  },
  {
    id: 5,
    translationKey: "q5",
    options: [
      { id: "opt1", translationKey: "opt1", complexity: 0, independence: 5 },
      { id: "opt2", translationKey: "opt2", complexity: 0, independence: -5 },
    ],
  },
];

export const getResultTier = (complexity: number) => {
  if (complexity <= 30) return "low";
  if (complexity <= 70) return "mid";
  return "high";
};

export const getResultModel = (independence: number) => {
  return independence < 0 ? "managed" : "owned";
};
