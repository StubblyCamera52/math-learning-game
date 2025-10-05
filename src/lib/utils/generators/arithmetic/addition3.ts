import { Question } from "@/data/mostOfTheTypes";

const arithmetic_addition_3 = (): Question => {
  let numbers = [];

  for (let i = 100; i <= 999; i++) {
    numbers.push(i);
  }

  let first = numbers[Math.floor(Math.random() * numbers.length)];
  let second = numbers[Math.floor(Math.random() * numbers.length)];

  let result = first + second;

  let question: Question = {
    index: 0,
    type: "single-answer",
    text: `${first} + ${second} = ?`,
    choices: [],
    correctAnswer: result.toString(),
  };

  return question;
};

export { arithmetic_addition_3 };
