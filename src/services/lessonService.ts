import { CreateLessonDto, UpdateLessonDto, LessonResponseDto } from '@/types/lesson';

const API_BASE_URL = 'http://localhost:8000';

export type Lesson = LessonResponseDto;
export type CreateLessonData = CreateLessonDto;

export const lessonService = {
    // Get all lessons
    async getAllLessons(): Promise<Lesson[]> {
        const response = await fetch(`${API_BASE_URL}/lessons`);
        if (!response.ok) {
            throw new Error('Failed to fetch lessons');
        }
        return response.json();
    },

    // Get lessons by course ID
    async getLessonsByCourse(courseId: string): Promise<Lesson[]> {
        const response = await fetch(`${API_BASE_URL}/lessons?courseId=${courseId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch lessons');
        }
        return response.json();
    },

    // Get a single lesson
    async getLessonById(id: string): Promise<Lesson> {
        const response = await fetch(`${API_BASE_URL}/lessons/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch lesson');
        }
        return response.json();
    },

    // Create a new lesson
    async createLesson(data: CreateLessonData, file?: File): Promise<Lesson> {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('courseId', data.courseId);
        formData.append('contentType', data.contentType);
        formData.append('status', data.status);

        if (data.duration) {
            formData.append('duration', data.duration);
        }

        if (data.contentUrl) {
            formData.append('contentUrl', data.contentUrl);
        }

        if (file) {
            formData.append('documentFile', file);
        }

        const response = await fetch(`${API_BASE_URL}/lessons`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create lesson');
        }

        return response.json();
    },

    // Update a lesson
    async updateLesson(id: string, data: Partial<CreateLessonData>): Promise<Lesson> {
        const response = await fetch(`${API_BASE_URL}/lessons/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update lesson');
        }

        return response.json();
    },

    // Delete a lesson
    async deleteLesson(id: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/lessons/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete lesson');
        }
    },
};
