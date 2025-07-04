export interface StatisticItem {
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    change?: string;
    color: string;
}

export interface Course {
    id: string;
    title: string;
    instructor: string;
    progress: number;
    nextLesson: string;
    image: string;
    category: string;
}

export interface Assignment {
    id: string;
    title: string;
    course: string;
    courseId?: string;
    dueDate: string;
    status: 'pending' | 'submitted' | 'graded';
    description?: string;
    totalPoints?: number;
    attachments?: string[];
    grade?: number;
    feedback?: string;
    submittedDate?: string;
    waitingDays?: number; // For UI display
}

export interface Quiz {
    id: string;
    title: string;
    course: string;
    courseId?: string;
    dueDate: string;
    questions: number;
    duration?: string;
    status: 'pending' | 'completed' | 'expired';
    score?: string;
    description?: string;
    passingScore?: number;
    shuffleQuestions?: boolean;
    showCorrectAnswers?: boolean;
    maxAttempts?: number;
}

export interface Notification {
    id: string;
    type: 'announcement' | 'deadline' | 'grade' | 'message';
    title: string;
    message: string;
    date: string;
    read: boolean;
}

export interface ScheduleEvent {
    id: string;
    title: string;
    course: string;
    date: string;
    time: string;
    type: 'lesson' | 'deadline' | 'quiz' | 'exam' | 'live';
}
