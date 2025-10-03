"use client";

import useGameState from "@/hooks/useGameState";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import { Question } from "@/data/mostOfTheTypes";

export function QuestionDisplay({
  onSubmitAnswer,
  question,
}: {
  onSubmitAnswer: (answer: string) => void;
  question: Question;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  return (
    <form
      className="flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitAnswer(selectedAnswer);
      }}
    >
      <p className="font-bold text-xl mb-3">{question.text}</p>
      {question.type == "multiple-choice" ? (
        <div className="flex flex-col justify-center gap-3 mt-3">
          {question.choices.map((label, index) => (
            <Button
              key={index}
              className="bg-primary"
              onClick={(e) => {
                setSelectedAnswer(label);
                e.currentTarget.form?.dispatchEvent(
                  new Event("submit", { cancelable: true })
                );
              }}
            >
              {label}
            </Button>
          ))}
        </div>
      ) : (
        <Input
          type="text"
          placeholder="answer"
          onChange={(e) => setSelectedAnswer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.form?.dispatchEvent(
                new Event("submit", { cancelable: true })
              );
            }
          }}
        />
      )}
    </form>
  );
}
