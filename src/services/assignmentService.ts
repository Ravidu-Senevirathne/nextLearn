import { Assignment, CreateAssignmentDto, UpdateAssignmentDto } from '../types/assignment';

const API_URL = 'http://localhost:8000/assignments';

export const assignmentService = {
    // Get all assignments
    async getAll(courseId?: string): Promise<Assignment[]> {
        const url = courseId ? `${API_URL}?courseId=${courseId}` : API_URL;
        const response = await fetch(url, {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Error fetching assignments: ${response.statusText}`);
        }

        return response.json();
    },

    // Get a single assignment by ID
    async getById(id: string): Promise<Assignment> {
        const response = await fetch(`${API_URL}/${id}`, {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Error fetching assignment: ${response.statusText}`);
        }

        return response.json();
    },

    // Create a new assignment
    async create(assignmentData: CreateAssignmentDto): Promise<Assignment> {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assignmentData),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Error creating assignment: ${response.statusText}`);
        }

        return response.json();
    },

    // Create a new assignment with files
    async createWithFiles(assignmentData: CreateAssignmentDto, files: File[]): Promise<Assignment> {
        const formData = new FormData();

        // Append assignment data
        Object.keys(assignmentData).forEach(key => {
            if (key !== 'attachments') {
                formData.append(key, String(assignmentData[key as keyof CreateAssignmentDto]));
            }
        });

        // Append files
        files.forEach(file => {
            formData.append('files', file);
        });

        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Error creating assignment with files: ${response.statusText}`);
        }

        return response.json();
    },

    // Update an assignment
    async update(id: string, assignmentData: UpdateAssignmentDto): Promise<Assignment> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assignmentData),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Error updating assignment: ${response.statusText}`);
        }

        return response.json();
    },

    // Delete an assignment
    async delete(id: string): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Error deleting assignment: ${response.statusText}`);
        }
    }
};
