"use client";
import { useGame } from "@/components/game/gameContextProvider";
import { QuestionDisplay } from "@/components/game/questionDisplay";
import { useEffect, useState } from "react";

export default function PracticeClient() {
  const { currentQuestion, changeQuestion, submitAnswer, generateQuestion, currentQuestionPool, setCurrentQuestionPool, unlockedQuestionPools, setCurrentQuestion} =
    useGame();

  useEffect(() => {
    setCurrentQuestion(generateQuestion);
  }, []);

  return (
    <div>
      {currentQuestion ? (
        <QuestionDisplay
          question={currentQuestion}
          onSubmitAnswer={(answer) => {
            const correct = submitAnswer(answer);
            setCurrentQuestion(generateQuestion);
            console.log(correct);
          }}
        ></QuestionDisplay>
      ) : (
        <></>
      )}
    </div>
  );
}
