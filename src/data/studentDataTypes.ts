interface StudentData {
    id: number;
    username: string;
    grade: string;
    enrolledCourses: EnrolledCourseSingleStudentData[];
}

interface Course {
    id: number;
    name: string;
    type: "math" | "other";
}

interface EnrolledCourseSingleStudentData {
    course: Course;
    assignmentsCompleted: number;
    assignmentProgress: Assignment[]
}

type Assignment = {
    id: number; // For looking up assignment data in the json folder
    name: string;
    subject: string;
    assignedDate: string; // ISO 8601
    dueDate: string; // ISO 8601
    totalQuestions: number;
    questionsCompleted: number;
}