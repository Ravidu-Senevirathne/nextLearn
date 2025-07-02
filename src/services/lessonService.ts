<<<<<<< HEAD
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
=======
// Define base API URL
const API_URL = 'http://localhost:8000/lessons';

// Update interface to match API expectations
export interface CreateLessonParams {
    title: string;
    courseId: string;
    description: string;
    duration?: number; // Must be an integer
    contentType: 'video' | 'document'; // Required field
    status: 'draft' | 'published';
    videoUrl?: string;
    documentFile?: File;
}

export interface UpdateLessonParams {
    title?: string;
    courseId?: string;
    description?: string;
    duration?: number; // Changed from string to number
    contentType?: 'video' | 'document'; // Changed from type to contentType
    status?: 'draft' | 'published';
    videoUrl?: string;
    documentFile?: File;
}

export interface Lesson {
    id: string;
    title: string;
    courseId: string;
    description: string;
    duration: string;
    contentType: 'video' | 'document';
    type?: 'video' | 'document'; // Keep for backward compatibility
    status: 'draft' | 'published';
    videoUrl?: string;
    contentUrl?: string; // API uses contentUrl for documents
    documentUrl?: string; // Keep for backward compatibility
    createdAt: string;
    updatedAt: string;
}

export const lessonService = {
    async getAll(courseId?: string): Promise<Lesson[]> {
        const url = courseId ? `${API_URL}?courseId=${courseId}` : API_URL;
        const response = await fetch(url, {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return response.json();
    },

    async getById(id: string): Promise<Lesson> {
        const response = await fetch(`${API_URL}/${id}`, {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return response.json();
    },

    async createLesson(lessonData: CreateLessonParams): Promise<any> {
        const formData = new FormData();

        formData.append('title', lessonData.title);
        formData.append('courseId', lessonData.courseId);
        formData.append('description', lessonData.description);

        // Ensure duration is an integer
        if (lessonData.duration !== undefined && !isNaN(lessonData.duration)) {
            formData.append('duration', Math.round(lessonData.duration).toString());
        }

        // Ensure contentType is always set
        formData.append('contentType', lessonData.contentType);
        formData.append('status', lessonData.status);

        // Add video URL for video content
        if (lessonData.contentType === 'video' && lessonData.videoUrl) {
            formData.append('videoUrl', lessonData.videoUrl);
        }

        // Add document file for document content
        if (lessonData.contentType === 'document' && lessonData.documentFile) {
            formData.append('documentFile', lessonData.documentFile);
        }

        // Make the request
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error in createLesson:', error);
            throw error;
        }
    },

    async updateLesson(id: string, lessonData: UpdateLessonParams): Promise<any> {
        const formData = new FormData();

        // Only append defined fields
        if (lessonData.title) formData.append('title', lessonData.title);
        if (lessonData.courseId) formData.append('courseId', lessonData.courseId);
        if (lessonData.description) formData.append('description', lessonData.description);

        // Ensure duration is an integer
        if (lessonData.duration !== undefined) {
            formData.append('duration', Math.round(lessonData.duration).toString());
        }

        // Use contentType instead of type
        if (lessonData.contentType) formData.append('contentType', lessonData.contentType);
        if (lessonData.status) formData.append('status', lessonData.status);

        // Add video URL for video content
        if (lessonData.contentType === 'video' && lessonData.videoUrl) {
            formData.append('videoUrl', lessonData.videoUrl);
        }

        // Add document file for document content
        if (lessonData.contentType === 'document' && lessonData.documentFile) {
            formData.append('documentFile', lessonData.documentFile);
        }

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            body: formData,
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
>>>>>>> 98414113c0390847a7de4771865d8ca8ddb08dac
        }

        return response.json();
    },

<<<<<<< HEAD
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
=======
    async deleteLesson(id: string): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
        }
    }
};
>>>>>>> 98414113c0390847a7de4771865d8ca8ddb08dac
