import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Assignment, Question } from "@/data/mostOfTheTypes";
import { linear_two_step } from "@/lib/utils/generators/linear/two-step";
import { arithmetic_addition_3 } from "@/lib/utils/generators/arithmetic/addition3";
import { toast } from "sonner";

const questionGenerators = {
  linear_two_step,
  arithmetic_addition_3,
};

export interface GameState {
  assignmentId: number;
  currentQuestion: Question | null;
  assignmentScore: number;
  coins: number;
  currentAssignment: Assignment | null;
  questionsAnswered: number;

  submitAnswer: (answer: string) => boolean;
  changeQuestion: (questionIndex: number) => void;
  loadAssignment: (id: number) => Promise<boolean>;
  completeAssignment: () => void;
  setCurrentQuestion: Dispatch<SetStateAction<Question | null>>;
  multiplyCoins: (multiplier: number) => void;
  setCoins: Dispatch<SetStateAction<number>>;
  currentQuestionPool: string;
  setCurrentQuestionPool: Dispatch<SetStateAction<string>>;
  unlockedQuestionPools: string[];
  unlockQuestionPool: (unlockName: string) => void;
  generateQuestion: () => Question;
}

const useGameState = () => {
  const [assignmentId, setAssignmentId] = useState<number>(-1);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [assignmentScore, setAssignmentScore] = useState<number>(0);
  const [coins, setCoins] = useState<number>(2);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<number[]>([]);
  const [currentAssignment, setCurrentAssignment] = useState<Assignment | null>(
    null
  );
  const [unlockedQuestionPools, setUnlockedQuestionPools] = useState<string[]>([
    "linear_two_step",
  ]);
  const [currentQuestionPool, setCurrentQuestionPool] =
    useState<string>("linear_two_step");
  const [practiceMode, setPracticeMode] = useState<boolean>(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);

  useEffect(() => {
    console.log("useGameState mounted/remounted");
    return () => console.log("useGameState unmounting");
  }, []);

  useEffect(() => {
    setCurrentQuestion(generateQuestion);
  }, [currentQuestionPool]);

  const generateQuestion = (): Question => {
    const generator =
      questionGenerators[
        currentQuestionPool as keyof typeof questionGenerators
      ];
    return generator();
  };

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

    setQuestionsAnswered(n => n+1);

    console.log(coins);

    if (answer == currentQuestion.correctAnswer) {
      setAnsweredQuestionIds([...answeredQuestionIds, currentQuestion.index]);
      setAssignmentScore(assignmentScore + 1);
      setCoins((prevCoins) => prevCoins + 1);
      toast("Correct :) +1 coin");
      return true;
    } else {
      setCoins((prevCoins) => Math.max(prevCoins - 1, 0));
      toast("Wrong :( -1 coin");
      return false;
    }
  };

  const multiplyCoins = (multiplier: number): void => {
    // console.log(multiplier);
    setCoins((prevCoins) => {
      // console.log(prevCoins);
      return Math.floor(prevCoins * multiplier);
    });
  };

  const unlockQuestionPool = (unlockName: string): void => {
    setUnlockedQuestionPools([...unlockedQuestionPools, unlockName]);
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
    assignmentScore,
    multiplyCoins,
    setCurrentQuestionPool,
    currentQuestionPool,
    unlockedQuestionPools,
    unlockQuestionPool,
    setCoins,
    generateQuestion,
    questionsAnswered
  };
};

export default useGameState;
