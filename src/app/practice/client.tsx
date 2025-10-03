"use client";
import { useGame } from "@/components/game/gameContextProvider";
import { QuestionDisplay } from "@/components/game/questionDisplay";
import { linear_two_step } from "@/lib/utils/generators/linear/two-step";
import { useEffect, useState } from "react";

export default function PracticeClient() {
  const { currentQuestion, changeQuestion, submitAnswer, setCurrentQuestion } =
    useGame();

  useEffect(() => {
    setCurrentQuestion(
      linear_two_step()
    );
  }, []);

  return (
    <div>
      {currentQuestion ? (
        <QuestionDisplay
          question={currentQuestion}
          onSubmitAnswer={(answer) => {
            const correct = submitAnswer(answer);
            setCurrentQuestion(
              linear_two_step()
            );
            console.log(correct);
          }}
        ></QuestionDisplay>
      ) : (
        <></>
      )}
    </div>
  );
}
