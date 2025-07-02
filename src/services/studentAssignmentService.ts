import { Assignment } from '@/Components/Dashboard/student/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const ASSIGNMENTS_ENDPOINT = `${API_URL}/assignments`;

export const studentAssignmentService = {
    // Get all assignments for a student
    async getAll(): Promise<Assignment[]> {
        const response = await fetch(`${ASSIGNMENTS_ENDPOINT}`, {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Error fetching assignments: ${response.statusText}`);
        }

        // Transform API response to match our frontend type
        const data = await response.json();
        return data.map((item: any) => ({
            id: item.id,
            title: item.title,
            course: item.courseId, // Assuming courseId contains course name for now
            courseId: item.courseId,
            dueDate: new Date(item.dueDate).toLocaleDateString(),
            status: 'pending', // Default status
            description: item.description,
            totalPoints: item.totalPoints,
            attachments: item.attachments,
        }));
    },

    // Get pending assignments
    async getPending(): Promise<Assignment[]> {
        const assignments = await this.getAll();
        return assignments.filter(a => a.status === 'pending');
    },

    // Get submitted assignments
    async getSubmitted(): Promise<Assignment[]> {
        const assignments = await this.getAll();
        return assignments.filter(a => a.status === 'submitted');
    },

    // Submit an assignment
    async submitAssignment(id: string, submission: FormData): Promise<void> {
        const response = await fetch(`${API_URL}/${id}/submit`, {
            method: 'POST',
            body: submission,
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Error submitting assignment: ${response.statusText}`);
        }
    }
};
