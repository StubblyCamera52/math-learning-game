"use client";
import { Button } from "@/components/ui/button";
import useGameState from "@/hooks/useGameState";
import { useEffect, useState } from "react";
import { QuestionDisplay } from "@/components/game/questionDisplay";

export default function ClientAssignmentPage({ id }: { id: number }) {
  const {
    assignmentId,
    currentQuestion,
    changeQuestion,
    completeAssignment,
    currentAssignment,
    loadAssignment,
    submitAnswer,
  } = useGameState();
  const [loadedAssignment, setLoadedAssignment] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const load = async () => {
      const result = await loadAssignment(id);
      setLoadedAssignment(result);
    };
    load();
  }, []);

  return (
    <div>
      <Button onClick={() => changeQuestion(1)}>Question 0</Button>
      <div className="flex flex-row justify-between gap-4">
        <Button
          className="rounded-full size-12"
          onClick={() => {
            if (currentQuestion) changeQuestion(currentQuestion?.index - 1);
          }}
        >
          {"<"}
        </Button>
        <Button
          className="rounded-full h-12 grow"
          onClick={() => {
            if (currentQuestion) changeQuestion(currentQuestion?.index + 1);
          }}
        >
          Next
        </Button>
      </div>
      <h1>Assignment: {assignmentId}</h1>
      <p>success: {loadedAssignment?.toString()}</p>
      <p></p>
      {currentQuestion ? (
        <QuestionDisplay
          onSubmitAnswer={(answer) => {
            const correct = submitAnswer(answer);
            console.log(correct);
          }}
          question={currentQuestion}
        ></QuestionDisplay>
      ) : (
        <></>
      )}
    </div>
  );
}
