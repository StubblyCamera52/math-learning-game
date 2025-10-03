"use client";
import { QuestionDisplay } from "@/components/game/questionDisplay";
import { mathPracticeQuestions } from "@/data/practiceQuestions";
import useGameState from "@/hooks/useGameState";

export default function PracticeClient() {
  const {currentQuestion, changeQuestion, questionIndex, submitAnswer} = useGameState();

  return (
    <QuestionDisplay
      question={mathPracticeQuestions[1]}
      onSubmitAnswer={(answer) => (submitAnswer(answer))}
    ></QuestionDisplay>
  );
}
