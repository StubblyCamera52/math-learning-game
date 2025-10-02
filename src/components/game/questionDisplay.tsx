"use client";

import useGameState from "@/hooks/useGameState";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Question } from "@/data/mostOfTheTypes";

export function QuestionDisplay({
  onSubmitAnswer,
  question,
}: {
  onSubmitAnswer: (answer: string) => void;
  question: Question;
}) {
  return (
    <div>
      <p>Question: {question.text}</p>
      {question.type == "multiple-choice" ? (
        <div className="flex flex-col justify-center gap-3 mt-3">
          {question.choices.map((label, index) => (
            <Button
              key={index}
              className="bg-primary"
              onClick={() => onSubmitAnswer(label)}
            >
              {label}
            </Button>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
