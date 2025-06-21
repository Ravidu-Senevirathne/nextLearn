export interface StatisticItem {
    title: string;
    value: string | number;
    icon: any;
    change: string;
    color: string;
}

export interface Event {
    id: string;
    title: string;
    course: string;
    time: string;
    date: string;
    type: 'quiz' | 'review' | 'live' | 'exam' | 'lesson' | 'deadline' | 'meeting';
    location?: string;
    description?: string;
}

export interface Submission {
    student: string;
    course: string;
    assignment: string;
    time: string;
    status: 'pending' | 'graded';
    grade?: string;
}

export interface Course {
    title: string;
    students: number;
    completion: number;
    rating: number;
}

export interface CalendarEvent extends Event {
    startTime: string;
    endTime: string;
    allDay?: boolean;
    recurring?: boolean;
    recurrencePattern?: string;
}
