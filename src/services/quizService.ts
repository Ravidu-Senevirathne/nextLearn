import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Types that match the backend DTOs
export type QuizStatus = 'active' | 'draft' | 'expired';

export interface QuizQuestion {
    id?: string;
    text: string;
    type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
    options?: string[];
    correctAnswer?: string | string[];
    points: number;
    order: number;
}

export interface CreateQuizDto {
    title: string;
    description?: string;
    dueDate?: Date | string;
    duration?: number;
    passingScore?: number;
    shuffleQuestions?: boolean;
    showCorrectAnswers?: boolean;
    maxAttempts?: number;
    courseId: string;
    questions: QuizQuestion[];
    status?: QuizStatus;
}

export interface Quiz extends CreateQuizDto {
    id: string;
    courseName?: string;
    timeLimit?: number;
    totalScore?: number;
    status: QuizStatus;
    course?: {
        id: string;
        title: string;
    };
}

export const quizService = {
    async createQuiz(quizData: CreateQuizDto): Promise<Quiz> {
        try {
            const response = await axios.post(`${API_URL}/quizzes`, quizData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error creating quiz:', error);
            throw error;
        }
    },

    async getQuizzes(courseId?: string): Promise<Quiz[]> {
        try {
            const url = courseId ? `${API_URL}/quizzes?courseId=${courseId}` : `${API_URL}/quizzes`;
            const response = await axios.get(url, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching quizzes:', error);
            throw error;
        }
    },

    async getQuiz(id: string): Promise<Quiz> {
        try {
            const response = await axios.get(`${API_URL}/quizzes/${id}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching quiz ${id}:`, error);
            throw error;
        }
    },

    async updateQuiz(id: string, quizData: Partial<CreateQuizDto>): Promise<Quiz> {
        try {
            const response = await axios.patch(`${API_URL}/quizzes/${id}`, quizData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating quiz ${id}:`, error);
            throw error;
        }
    },

    async deleteQuiz(id: string): Promise<void> {
        try {
            await axios.delete(`${API_URL}/quizzes/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error(`Error deleting quiz ${id}:`, error);
            throw error;
        }
    }
};
