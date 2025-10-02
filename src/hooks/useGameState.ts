import { useState, useEffect } from "react";
import { Assignment, Question } from "@/data/mostOfTheTypes";

export interface GameState {
    currentQuestion: Question | null;
    assignmentScore: number;
    questionIndex: number;
    assignmentId: number | null;
    currentAssignment: Assignment | null;

    submitAnswer(selectedAnswer: string | number): boolean; // returns success or not
    changeQuestion(questionIndex: number): void;

    loadAssignment(assignmentId: number): Promise<void>;
    completeAssignment(): void;
}

const useGameState = () => {
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [assignmentScore, setAssignmentScore] = useState<number>(0);
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [currentAssignment, setCurrentAssignment] = useState<Assignment | null>(null);

    const changeQuestion = (questionIndex: number) => {
        if (!currentAssignment) return;

        if (questionIndex < currentAssignment.questions.length) {
            setQuestionIndex(questionIndex);
            setCurrentQuestion(currentAssignment.questions[questionIndex]);
        }
    }

    const completeAssignment = () => {
        if (!currentAssignment) return;
    }
}

export default useGameState;