const API_URL = 'http://localhost:8000/quizzes';

export const fetchQuizzes = async (courseId?: string) => {
  const url = courseId ? `${API_URL}?courseId=${courseId}` : API_URL;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch quizzes');
  }
  return response.json();
};

export const fetchQuizById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch quiz');
  }
  return response.json();
};

export const createQuiz = async (quizData: any) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quizData),
  });
  if (!response.ok) {
    throw new Error('Failed to create quiz');
  }
  return response.json();
};

export const updateQuiz = async (id: string, quizData: any) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quizData),
  });
  if (!response.ok) {
    throw new Error('Failed to update quiz');
  }
  return response.json();
};

export const deleteQuiz = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete quiz');
  }
  return true;
};