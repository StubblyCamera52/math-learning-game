"use client";
import { useGame } from "@/components/game/gameContextProvider";
import { QuestionDisplay } from "@/components/game/questionDisplay";
import { arithmetic_addition_3 } from "@/lib/utils/generators/arithmetic/addition3";
import { linear_two_step } from "@/lib/utils/generators/linear/two-step";
import { useEffect, useState } from "react";

export default function PracticeClient() {
  const { currentQuestion, changeQuestion, submitAnswer, generateQuestion, currentQuestionPool, setCurrentQuestionPool, unlockedQuestionPools,  } =
    useGame();

  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <div>
      {currentQuestion ? (
        <QuestionDisplay
          question={currentQuestion}
          onSubmitAnswer={(answer) => {
            const correct = submitAnswer(answer);
            generateQuestion();
            console.log(correct);
          }}
        ></QuestionDisplay>
      ) : (
        <></>
      )}
    </div>
  );
}
