export interface Student {
  id: number;
  username: string;
  grade: string;
  enrolledCourses: Course[];
  saveData: StudentData;
}

export type StudentData = {
  completedAssignments: AssignmentData[];
  totalTimeSpent: number; // seconds
};

export interface Course {
  id: number;
  name: string;
  type: "math" | "other";
  assignments: Assignment[];
}

export interface Assignment {
  id: number;
  name: string;
  description: string;
  subject: string;
  questions: Question[];
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export type AssignmentData = {
  assignmentId: number;
  startedAt: number; // seconds after epoch
  completedAt: number; // seconds after epoch
  timeSpent: number; // seconds total
  completedQuestions: number[]; // list of completed question ids
  numCorrect: number; // number of questions correct, NOTE: grading is based on completion not correctness for homework
};

export type Question = {
  index: number;
  text: string;
  type: "multiple-choice" | "single-answer";
  choices: string[];
  correctAnswer: string;
};
