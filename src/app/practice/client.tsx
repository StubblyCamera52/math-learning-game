"use client";
import { useGame } from "@/components/game/gameContextProvider";
import { QuestionDisplay } from "@/components/game/questionDisplay";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

export default function PracticeClient() {
  const { currentQuestion, submitAnswer, generateQuestion, setCurrentQuestion} =
    useGame();

  useEffect(() => {
    setCurrentQuestion(generateQuestion);
  }, []);

  return (
      <Card className="w-full bg-stone-600 max-w-2xl p-12 mt-12 h-full relative">
        <div className="bg-green-500 size-14 rounded-xl absolute top-[-1rem] right-[-1rem] rotate-12">
          <span className="">#2</span>
        </div>
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
      </Card>
  );
}
