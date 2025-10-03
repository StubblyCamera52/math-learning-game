"use client";
import { QuestionDisplay } from "@/components/game/questionDisplay";
import { mathPracticeQuestions } from "@/data/practiceQuestions";
import useGameState from "@/hooks/useGameState";
import { randint } from "@/lib/utils/mathHelpers";
import { useEffect, useState } from "react";

export default function PracticeClient() {
  const { currentQuestion, changeQuestion, submitAnswer, setCurrentQuestion } =
    useGameState();

  useEffect(() => {
    setCurrentQuestion(
      mathPracticeQuestions[randint(0, mathPracticeQuestions.length - 1)]
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
              mathPracticeQuestions[
                randint(0, mathPracticeQuestions.length - 1)
              ]
            );
            console.log(randint(0, mathPracticeQuestions.length - 1));
            console.log(correct);
          }}
        ></QuestionDisplay>
      ) : (
        <></>
      )}
    </div>
  );
}
