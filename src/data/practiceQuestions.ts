import { Question } from "./mostOfTheTypes";

export const mathPracticeQuestions: Question[] = [
  {
    index: 0,
    text: "solve for x: 2x + 5 = 13",
    type: "single-answer",
    choices: [],
    correctAnswer: "4",
  },
  {
    index: 1,
    text: "what is the value of 3x - 7 when x = 5",
    type: "multiple-choice",
    choices: ["8", "15", "22", "9"],
    correctAnswer: "8",
  },
  {
    index: 2,
    text: "simplify 4(x + 3) - 2x",
    type: "single-answer",
    choices: [],
    correctAnswer: "2x + 12",
  },
  {
    index: 3,
    text: "which equation represents a line with slope 2 and y-intercept -3",
    type: "multiple-choice",
    choices: ["y = 2x - 3", "y = -3x + 2", "y = 2x + 3", "y = 3x - 2"],
    correctAnswer: "y = 2x - 3",
  },
  {
    index: 4,
    text: "if 5x - 10 = 25, what is the value of x",
    type: "multiple-choice",
    choices: ["3", "6", "7", "9"],
    correctAnswer: "7",
  },
];
