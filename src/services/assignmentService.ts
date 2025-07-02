const API_BASE_URL = 'http://localhost:8000';

// DTOs based on the backend controller
export interface CreateAssignmentDto {
    title: string;
    description: string;
    courseId: string;
    dueDate: string;
    totalMarks: number;
    instructions?: string;
    attachments?: string[];
    status: 'draft' | 'published' | 'expired';
}

// Course interface for dropdown
export interface Course {
    id: string;
    title: string;
    description?: string;
    instructor?: string;
}

export interface UpdateAssignmentDto extends Partial<CreateAssignmentDto> { }

export interface AssignmentResponseDto {
    id: string;
    title: string;
    description: string;
    courseId: string;
    dueDate: string;
    totalMarks?: number; // Make optional since backend might use totalPoints
    totalPoints?: number; // Add this field from backend
    instructions?: string;
    attachments?: string[];
    status?: 'draft' | 'published' | 'expired'; // Make optional with default handling
    submissions?: number;
    totalStudents?: number;
    createdAt?: string; // Make optional since backend might not return this
    updatedAt?: string; // Make optional since backend might not return this
    course?: {
        id: string;
        title: string;
    };
}

export type Assignment = AssignmentResponseDto;
export type CreateAssignmentData = CreateAssignmentDto;

export const assignmentService = {
    // Health check for backend connectivity
    async checkBackendHealth(): Promise<boolean> {
        try {
            const response = await fetch(`${API_BASE_URL}/assignments`, {
                method: 'HEAD', // Just check if endpoint is available
            });
            return response.ok;
        } catch (error) {
            console.error('Backend health check failed:', error);
            return false;
        }
    },

    // Get all courses for dropdown
    async getAllCourses(): Promise<Course[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/courses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const courses = await response.json();

            // Ensure courses is an array and has the expected structure
            if (!Array.isArray(courses)) {
                console.warn('Invalid courses response format, using fallback');
                return [];
            }

            // Transform courses to ensure consistent structure
            return courses.map((course: any) => ({
                id: course.id || course._id || String(course.courseId || Math.random()),
                title: course.title || course.name || 'Untitled Course',
                description: course.description || '',
                instructor: course.instructor || course.instructorName || '',
            }));

        } catch (error) {
            console.error('Error fetching courses from API:', error);
            // Return empty array in case of error
            return [];
        }
    },

    // Fallback courses when API is not available


    // Get all assignments
    async getAllAssignments(): Promise<Assignment[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/assignments`);
            if (!response.ok) {
                throw new Error('Failed to fetch assignments');
            }
            const data = await response.json();

            // Transform backend data to match frontend expectations
            return data.map((assignment: any) => ({
                ...assignment,
                status: assignment.status || 'draft', // Default status if missing
                totalMarks: assignment.totalMarks || assignment.totalPoints || 0, // Handle field name differences
                createdAt: assignment.createdAt || new Date().toISOString(), // Default if missing
                updatedAt: assignment.updatedAt || new Date().toISOString(), // Default if missing
            }));
        } catch (error) {
            console.error('Error fetching assignments:', error);
            throw new Error('Failed to connect to server. Please check if the backend is running on port 8000.');
        }
    },

    // Get assignments by course ID
    async getAssignmentsByCourse(courseId: string): Promise<Assignment[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/assignments?courseId=${courseId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch assignments for course');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching assignments by course:', error);
            throw new Error('Failed to fetch assignments for course');
        }
    },

    // Get a single assignment
    async getAssignmentById(id: string): Promise<Assignment> {
        try {
            const response = await fetch(`${API_BASE_URL}/assignments/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch assignment');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching assignment:', error);
            throw new Error('Failed to fetch assignment');
        }
    },

    // Create a new assignment with files - matches your backend controller
    async createAssignment(data: CreateAssignmentData, files?: File[]): Promise<Assignment> {
        try {
            const formData = new FormData();

            // Append assignment data as individual fields
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('courseId', data.courseId);
            formData.append('dueDate', data.dueDate);
            formData.append('totalMarks', data.totalMarks.toString());
            formData.append('status', data.status);

            if (data.instructions) {
                formData.append('instructions', data.instructions);
            }

            // Append files if provided - using 'attachments' field name as expected by your controller
            if (files && files.length > 0) {
                files.forEach((file) => {
                    formData.append('attachments', file);
                });
            }

            const response = await fetch(`${API_BASE_URL}/assignments`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = 'Failed to create assignment';

                try {
                    const errorObj = JSON.parse(errorText);
                    errorMessage = errorObj.message || errorMessage;
                } catch {
                    errorMessage = errorText || errorMessage;
                }

                throw new Error(errorMessage);
            }

            return response.json();
        } catch (error) {
            console.error('Error creating assignment:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to create assignment. Please check your connection and try again.');
        }
    },

    // Update an assignment
    async updateAssignment(id: string, data: UpdateAssignmentDto): Promise<Assignment> {
        try {
            const response = await fetch(`${API_BASE_URL}/assignments/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = 'Failed to update assignment';

                try {
                    const errorObj = JSON.parse(errorText);
                    errorMessage = errorObj.message || errorMessage;
                } catch {
                    errorMessage = errorText || errorMessage;
                }

                throw new Error(errorMessage);
            }

            return response.json();
        } catch (error) {
            console.error('Error updating assignment:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to update assignment');
        }
    },

    // Delete an assignment
    async deleteAssignment(id: string): Promise<void> {
        try {
            const response = await fetch(`${API_BASE_URL}/assignments/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = 'Failed to delete assignment';

                try {
                    const errorObj = JSON.parse(errorText);
                    errorMessage = errorObj.message || errorMessage;
                } catch {
                    errorMessage = errorText || errorMessage;
                }

                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Error deleting assignment:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to delete assignment');
        }
    },

    // Alternative upload endpoint (matches your /upload route)
    async uploadAssignmentFiles(data: CreateAssignmentData, files: File[]): Promise<Assignment> {
        try {
            const formData = new FormData();

            // Append assignment data
            Object.keys(data).forEach(key => {
                const value = data[key as keyof CreateAssignmentData];
                if (value !== undefined && value !== null) {
                    formData.append(key, typeof value === 'string' ? value : value.toString());
                }
            });

            // Append files using 'files' field name as expected by your upload controller
            files.forEach((file) => {
                formData.append('files', file);
            });

            const response = await fetch(`${API_BASE_URL}/assignments/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = 'Failed to upload assignment files';

                try {
                    const errorObj = JSON.parse(errorText);
                    errorMessage = errorObj.message || errorMessage;
                } catch {
                    errorMessage = errorText || errorMessage;
                }

                throw new Error(errorMessage);
            }

            return response.json();
        } catch (error) {
            console.error('Error uploading assignment files:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to upload assignment files');
        }
    },
};
            console.error('Error uploading assignment files:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to upload assignment files');
        }
    },
};
