import { useState, useEffect } from "react";
import { Assignment, Question } from "@/data/mostOfTheTypes";

export interface GameState {
    currentQuestion: Question;
    assignmentScore: number;
    questionIndex: number;
    assignmentId: number;

    submitAnswer(): boolean; // returns success or not
}

const useGameState = () => {
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [assignmentScore, setAssignmentScore] = useState<number>(0);
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [currentAssignment, setCurrentAssignment] = useState<Assignment | null>(null);
}

export default useGameState;