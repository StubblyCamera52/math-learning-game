"use client";

import useGameState from "@/hooks/useGameState";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

export function QuestionDisplay({
  onSubmitAnswer,
}: {
  onSubmitAnswer: (answer: string) => void;
}) {
  return (
    <div>
      <p>Question: {currentQuestion?.text}</p>
      <div className="flex flex-col justify-center gap-3 mt-3">
        {currentQuestion?.choices.map((label, index) => (
          <Button key={index} className="bg-primary">
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
