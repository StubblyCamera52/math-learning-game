import { Question } from "@/data/mostOfTheTypes";

const linear_two_step = (): Question => {
  const numbers: number[] = [
    2, 4, 5, 6, 7, 8, 9, -2, -3, -4, -5, -6, -7, -8, -9,
  ];

  let first = numbers[Math.floor(Math.random() * numbers.length)];
  let second = numbers[Math.floor(Math.random() * numbers.length)];
  let third = numbers[Math.floor(Math.random() * numbers.length)];

  let result = first * second + third;
  let sign = "+";

  if (third < 0) {
    third = Math.abs(third);
    sign = "-"
  }

  let question: Question = {
    index: 0,
    type: "single-answer",
    text: `${first}x ${sign} ${third} = ${result}`,
    choices: [],
    correctAnswer: second.toString()
  }

  return question;
};

export { linear_two_step };
