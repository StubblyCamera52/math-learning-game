import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Assignment, Question } from "@/data/mostOfTheTypes";

export interface GameState {
  assignmentId: number;
  currentQuestion: Question | null;
  assignmentScore: number;
  coins: number;
  currentAssignment: Assignment | null;

  submitAnswer: (answer: string) => boolean;
  changeQuestion: (questionIndex: number) => void;
  loadAssignment: (id: number) => Promise<boolean>;
  completeAssignment: () => void;
  setCurrentQuestion: Dispatch<SetStateAction<Question | null>>;
}

const useGameState = () => {
  const [assignmentId, setAssignmentId] = useState<number>(-1);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [assignmentScore, setAssignmentScore] = useState<number>(0);
  const [coins, setCoins] = useState<number>(0);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<number[]>([]);
  const [currentAssignment, setCurrentAssignment] = useState<Assignment | null>(
    null
  );
  const [practiceMode, setPracticeMode] = useState<boolean>(false);

  const loadAssignment = async (id: number): Promise<boolean> => {
    try {
      setAssignmentId(id);
      const assignmentData = await import("@/data/assignment" + id.toString());
      console.log(assignmentData.default.name);
      setCurrentAssignment(assignmentData.default);
      return true;
    } catch (error) {
      console.error("failed to laod assignent:", error);
      return false;
    }
  };

  const changeQuestion = (questionIndex: number) => {
    if (!currentAssignment) return;

    if (
      questionIndex < currentAssignment.questions.length &&
      questionIndex > -1
    ) {
      setCurrentQuestion(currentAssignment.questions[questionIndex]);
    }
  };

  const completeAssignment = () => {
    if (!currentAssignment) return;
  };

  const submitAnswer = (answer: string): boolean => {
    if (!currentQuestion) return false;

    console.log(coins);

    if (answer == currentQuestion.correctAnswer) {
      setAnsweredQuestionIds([...answeredQuestionIds, currentQuestion.index]);
      setAssignmentScore(assignmentScore + 1);
      setCoins(coins + 1);
      return true;
    } else return false;
  };

  return {
    assignmentId,
    currentQuestion,
    changeQuestion,
    completeAssignment,
    loadAssignment,
    currentAssignment,
    submitAnswer,
    setCurrentQuestion,
    coins,
    assignmentScore
  };
};

export default useGameState;
