export interface Assignment {
    id: string;
    title: string;
    description: string;
    courseId: string;
    dueDate: string;
    totalPoints: number;
    attachments?: string[];
    status?: 'Active' | 'Expired' | 'Draft';
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateAssignmentDto {
    title: string;
    description: string;
    courseId: string;
    dueDate: string;
    totalPoints: number;
    attachments?: string[];
}

export interface UpdateAssignmentDto {
    title?: string;
    description?: string;
    courseId?: string;
    dueDate?: string;
    totalPoints?: number;
    attachments?: string[];
    status?: 'Active' | 'Expired' | 'Draft';
}
