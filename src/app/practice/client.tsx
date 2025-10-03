"use client";
import { QuestionDisplay } from "@/components/game/questionDisplay";
import { mathPracticeQuestions } from "@/data/practiceQuestions";
import useGameState from "@/hooks/useGameState";
import { useEffect, useState } from "react";

export default function PracticeClient() {
  const { currentQuestion, changeQuestion, submitAnswer, setCurrentQuestion } =
    useGameState();

  useEffect(() => {
    setCurrentQuestion(mathPracticeQuestions[0]);
  }, []);
  return (
    <div>
      {currentQuestion ? (
        <QuestionDisplay
          question={currentQuestion}
          onSubmitAnswer={(answer) => {
            const correct = submitAnswer(answer);
            console.log(correct);
          }}
        ></QuestionDisplay>
      ) : (
        <></>
      )}
    </div>
  );
}
