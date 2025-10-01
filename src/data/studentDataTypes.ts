type StudentData = {
    id: number;
    username: string;
    grade: string;
    enrolledCourses: EnrolledCourseData[];
}

type Course = {
    id: number;
    name: string;
    type: "math" | "other";
}

type EnrolledCourseData = {
    course: Course;
    assignmentsCompleted: number;
    assignmentProgress: Assignment[]
}

type Assignment {
    id: number; // For looking up assignment data in the json folder
    name: number;
    subject: number;
    assignedDate: string; // ISO 8601
    dueDate: string; // ISO 8601
    totalQuestions: number;
    questionsCompleted: number;
}