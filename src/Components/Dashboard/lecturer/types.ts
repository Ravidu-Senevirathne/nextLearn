export interface StatisticItem {
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    change: string;
    color: string;
}

export interface Event {
    title: string;
    course: string;
    time: string;
    type: string;
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
