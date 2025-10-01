export interface AssignmentData {
    name: string;
    subject: string;
    questions: AssignmentDataQuestion[]
}

type AssignmentDataQuestion = {
    id: number;
    imageUrl: string | null;
    questionText: string;
    difficulty: "easy" | "medium" | "hard";
    type: "multiple_choice" | "type_answer";
    options: AssignmentDataAnswerMultipleChoiceOption[] | AssignmentDataAnswerTypeResponse;
}

export type AssignmentDataAnswerMultipleChoiceOption = {
    isCorrect: boolean;
    answerDisplayString: string;
    incorrectExplanationString: string | null;
    correctExplanationString: string | null;
}

type AssignmentDataAnswerTypeResponse = {
    correctAnswers: string[];
    incorrectExplanationString: string | null;
    correctExplanationString: string | null;
}