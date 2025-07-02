import axios from 'axios';

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Define interfaces matching backend DTOs
export interface ExamQuestionOption {
    id?: string;
    text: string;
    isCorrect: boolean;
}

export interface ExamQuestion {
    id?: string;
    text: string;
    type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
    marks: number;
    order: number;
    options?: ExamQuestionOption[];
}

export interface Exam {
    id?: string;
    title: string;
    description?: string;
    instructions?: string;
    date: Date;
    duration: number;
    passingPercentage: number;
    shuffleQuestions: boolean;
    showResults: boolean;
    status?: 'draft' | 'published';
    courseId: string;
    questions: ExamQuestion[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Course {
    id: string;
    title: string;
    description?: string;
}

export const examService = {
    // Check backend health
   

    // Get all exams
    async getExams(): Promise<Exam[]> {
        try {
            const response = await axios.get(`${API_URL}/exams`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching exams:', error);
            throw new Error('Failed to fetch exams. Please try again later.');
        }
    },

    // Get exams by course ID
    async getExamsByCourse(courseId: string): Promise<Exam[]> {
        try {
            const response = await axios.get(`${API_URL}/exams?courseId=${courseId}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching exams by course:', error);
            throw new Error('Failed to fetch course exams. Please try again later.');
        }
    },

    // Get exam by ID
    async getExamById(id: string): Promise<Exam> {
        try {
            const response = await axios.get(`${API_URL}/exams/${id}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching exam with ID ${id}:`, error);
            throw new Error('Failed to fetch exam details. Please try again later.');
        }
    },

    // Create new exam
    async createExam(exam: Exam): Promise<Exam> {
        try {
            const response = await axios.post(`${API_URL}/exams`, exam, {
                withCredentials: true,
            });
            return response.data;
        } catch (error: any) {
            console.error('Error creating exam:', error);
            if (error.response?.data?.message) {
                throw new Error(`Failed to create exam: ${error.response.data.message}`);
            }
            throw new Error('Failed to create exam. Please check your inputs and try again.');
        }
    },

    // Update exam
    async updateExam(id: string, exam: Partial<Exam>): Promise<Exam> {
        try {
            const response = await axios.patch(`${API_URL}/exams/${id}`, exam, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating exam with ID ${id}:`, error);
            throw new Error('Failed to update exam. Please try again later.');
        }
    },

    // Delete exam
    async deleteExam(id: string): Promise<void> {
        try {
            await axios.delete(`${API_URL}/exams/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error(`Error deleting exam with ID ${id}:`, error);
            throw new Error('Failed to delete exam. Please try again later.');
        }
    },

    // Publish exam
    async publishExam(id: string): Promise<Exam> {
        try {
            const response = await axios.post(`${API_URL}/exams/${id}/publish`, {}, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error(`Error publishing exam with ID ${id}:`, error);
            throw new Error('Failed to publish exam. Please try again later.');
        }
    },

    // Unpublish exam
    async unpublishExam(id: string): Promise<Exam> {
        try {
            const response = await axios.post(`${API_URL}/exams/${id}/unpublish`, {}, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error(`Error unpublishing exam with ID ${id}:`, error);
            throw new Error('Failed to unpublish exam. Please try again later.');
        }
    },

    // Get all courses (for dropdowns)
    async getAllCourses(): Promise<Course[]> {
        try {
            const response = await axios.get(`${API_URL}/courses`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw new Error('Failed to fetch courses. Please try again later.');
        }
    },

    // Calculate total marks for an exam
    async getTotalMarks(id: string): Promise<number> {
        try {
            const response = await axios.get(`${API_URL}/exams/${id}/total-marks`, {
                withCredentials: true,
            });
            return response.data.totalMarks;
        } catch (error) {
            console.error(`Error calculating total marks for exam ${id}:`, error);
            throw new Error('Failed to calculate total marks. Please try again later.');
        }
    }
};
