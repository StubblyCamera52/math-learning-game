export interface StudentData {
    id: number;
    username: string;
    grade: string;
    enrolledCourses: EnrolledCourseSingleStudentData[];
}

export interface Course {
    id: number;
    name: string;
    type: "math" | "other";
}

export interface EnrolledCourseSingleStudentData {
    course: Course;
    assignmentsCompleted: number;
    assignmentProgress: Assignment[]
}

export interface Assignment {
    id: string;
    name: string;
    description: string;
    subject: string;
    questions: Question[]
    createdAt: string; // ISO 8601
    updatedAt: string; // ISO 8601
}

export type Question = {

}