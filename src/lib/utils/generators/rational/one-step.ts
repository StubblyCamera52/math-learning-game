import { Question } from "@/data/mostOfTheTypes";

const rational_one_step = (): Question => {
  const numbers: number[] = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, -2, -3, -4, -5, -6, -7, -8, -9, -10,
    -11, -12,
  ];

  let first = numbers[Math.floor(Math.random() * numbers.length)];
  let second = numbers[Math.floor(Math.random() * numbers.length)];

  let result = first * second;

  let question: Question = {
    index: 0,
    type: "single-answer",
    text: `What is the value of x? $$\\dfrac{${result}}{x} = ${first}$$`,
    choices: [],
    correctAnswer: second.toString(),
  };

  return question;
};

export { rational_one_step };
