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

    loadAssignment(id: number): Promise<void>;
    completeAssignment(): void;
}

const useGameState = () => {
    const [assignmentId, setAssignmentId] = useState<number>(-1);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [assignmentScore, setAssignmentScore] = useState<number>(0);
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [currentAssignment, setCurrentAssignment] = useState<Assignment | null>(null);

    const loadAssignment = async (id: number): Promise<boolean> => {
        try {
            setAssignmentId(id);
            const assignmentData = await import("@/data/assignment"+id.toString());
            console.log(assignmentData.default.name)
            setCurrentAssignment(assignmentData.default);
            return true;
        } catch (error) {
            console.error("failed to laod assignent:", error);
            return false;
        }
    }

    const changeQuestion = (questionIndex: number) => {
        if (!currentAssignment) return;

        if (questionIndex < currentAssignment.questions.length && questionIndex>-1) {
            setQuestionIndex(questionIndex);
            setCurrentQuestion(currentAssignment.questions[questionIndex]);
        }
    }

    const completeAssignment = () => {
        if (!currentAssignment) return;
    }

    return {assignmentId, currentQuestion, changeQuestion, completeAssignment, loadAssignment, currentAssignment, questionIndex}
}

export default useGameState;