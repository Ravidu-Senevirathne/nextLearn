"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    GraduationCap,
    Clock,
    BookOpen,
    Calendar,
    Plus,
    Trash2,
    ArrowLeft,
    Save,
    X,
    ChevronUp,
    ChevronDown,
} from 'lucide-react';

// Sample course data
const courses = [
    { id: '1', title: 'Web Development Fundamentals' },
    { id: '2', title: 'Advanced JavaScript' },
    { id: '3', title: 'Database Management' },
    { id: '4', title: 'Backend Development' },
];

type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';

interface Question {
    id: string;
    type: QuestionType;
    text: string;
    options?: string[];
    correctAnswer?: string | string[];
    points: number;
}

const CreateQuizPage = () => {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState<'details' | 'questions'>('details');

    // Quiz details state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [courseId, setCourseId] = useState('');
    const [duration, setDuration] = useState(30);
    const [dueDate, setDueDate] = useState('');
    const [isTimeLimited, setIsTimeLimited] = useState(true);
    const [passingScore, setPassingScore] = useState(60);
    const [shuffleQuestions, setShuffleQuestions] = useState(false);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(true);
    const [maxAttempts, setMaxAttempts] = useState(1);

    // Questions state
    const [questions, setQuestions] = useState<Question[]>([
        {
            id: '1',
            type: 'multiple-choice',
            text: '',
            options: ['', '', '', ''],
            correctAnswer: [],
            points: 1
        }
    ]);

    const [questionErrors, setQuestionErrors] = useState<{ [key: string]: string }>({});

    // Add a new question
    const addQuestion = (type: QuestionType) => {
        const newQuestion: Question = {
            id: (questions.length + 1).toString(),
            type,
            text: '',
            points: 1,
        };

        if (type === 'multiple-choice') {
            newQuestion.options = ['', '', '', ''];
            newQuestion.correctAnswer = [];
        } else if (type === 'true-false') {
            newQuestion.options = ['True', 'False'];
            newQuestion.correctAnswer = '';
        }

        setQuestions([...questions, newQuestion]);
    };

    // Remove a question
    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
        // Remove any errors for this question
        const newErrors = { ...questionErrors };
        delete newErrors[id];
        setQuestionErrors(newErrors);
    };

    // Update a question
    const updateQuestion = (id: string, field: string, value: any) => {
        setQuestions(questions.map(q => {
            if (q.id === id) {
                return { ...q, [field]: value };
            }
            return q;
        }));

        // Clear error for this field if it exists
        if (questionErrors[`${id}-${field}`]) {
            const newErrors = { ...questionErrors };
            delete newErrors[`${id}-${field}`];
            setQuestionErrors(newErrors);
        }
    };

    // Handle option change for multiple choice questions
    const handleOptionChange = (questionId: string, optionIndex: number, value: string) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId && q.options) {
                const newOptions = [...q.options];
                newOptions[optionIndex] = value;
                return { ...q, options: newOptions };
            }
            return q;
        }));
    };

    // Handle correct answer selection for multiple choice
    const handleCorrectAnswerChange = (questionId: string, optionIndex: number) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId && q.type === 'multiple-choice') {
                let newCorrectAnswer = Array.isArray(q.correctAnswer) ? [...q.correctAnswer] : [];

                if (newCorrectAnswer.includes(optionIndex.toString())) {
                    newCorrectAnswer = newCorrectAnswer.filter(a => a !== optionIndex.toString());
                } else {
                    newCorrectAnswer.push(optionIndex.toString());
                }

                return { ...q, correctAnswer: newCorrectAnswer };
            }
            return q;
        }));
    };

    // Handle true/false answer selection
    const handleTrueFalseChange = (questionId: string, value: string) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId && q.type === 'true-false') {
                return { ...q, correctAnswer: value };
            }
            return q;
        }));
    };

    // Move a question up or down
    const moveQuestion = (id: string, direction: 'up' | 'down') => {
        const index = questions.findIndex(q => q.id === id);
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === questions.length - 1)
        ) {
            return;
        }

        const newQuestions = [...questions];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        [newQuestions[index], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[index]];
        setQuestions(newQuestions);
    };

    // Validate quiz details
    const validateDetails = () => {
        let valid = true;

        if (!title.trim()) {
            alert('Please enter a quiz title');
            valid = false;
        } else if (!courseId) {
            alert('Please select a course');
            valid = false;
        } else if (isTimeLimited && duration <= 0) {
            alert('Please enter a valid duration');
            valid = false;
        } else if (passingScore < 0 || passingScore > 100) {
            alert('Please enter a valid passing score (0-100)');
            valid = false;
        } else if (maxAttempts < 1) {
            alert('Please enter at least 1 for maximum attempts');
            valid = false;
        }

        return valid;
    };

    // Validate questions
    const validateQuestions = () => {
        const errors: { [key: string]: string } = {};
        let valid = true;

        questions.forEach((question, index) => {
            // Validate question text
            if (!question.text.trim()) {
                errors[`${question.id}-text`] = 'Question text is required';
                valid = false;
            }

            // Validate options for multiple choice
            if (question.type === 'multiple-choice' && question.options) {
                const emptyOptions = question.options.filter(opt => !opt.trim()).length;
                if (emptyOptions > 0) {
                    errors[`${question.id}-options`] = 'All options must have content';
                    valid = false;
                }

                if (!question.correctAnswer || (Array.isArray(question.correctAnswer) && question.correctAnswer.length === 0)) {
                    errors[`${question.id}-correctAnswer`] = 'Please select at least one correct answer';
                    valid = false;
                }
            }

            // Validate true/false
            if (question.type === 'true-false' && !question.correctAnswer) {
                errors[`${question.id}-correctAnswer`] = 'Please select the correct answer';
                valid = false;
            }

            // Validate points
            if (question.points <= 0) {
                errors[`${question.id}-points`] = 'Points must be greater than 0';
                valid = false;
            }
        });

        setQuestionErrors(errors);
        return valid;
    };

    // Handle navigation between sections
    const handleNextSection = () => {
        if (activeSection === 'details') {
            if (validateDetails()) {
                setActiveSection('questions');
            }
        }
    };

    // Handle quiz submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateQuestions()) {
            return;
        }

        // Create quiz object
        const quizData = {
            title,
            description,
            courseId,
            duration: isTimeLimited ? duration : null,
            dueDate: dueDate || null,
            passingScore,
            shuffleQuestions,
            showCorrectAnswers,
            maxAttempts,
            questions,
        };

        console.log('Quiz data to be submitted:', quizData);
        // Here you would typically make an API call to save the quiz

        alert('Quiz created successfully!');
        router.push('/dashboard/lecturer/quizzes');
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                    <Link href="/dashboard/lecturer/quizzes">
                        <button className="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            <ArrowLeft size={20} />
                        </button>
                    </Link>
                    <h1 className="text-2xl font-bold flex items-center">
                        <GraduationCap className="mr-2 h-7 w-7 text-purple-500" />
                        Create New Quiz
                    </h1>
                </div>

                <div className="flex space-x-3">
                    <button
                        onClick={() => router.push('/dashboard/lecturer/quizzes')}
                        className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <X size={18} className="mr-1" />
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                        <Save size={18} className="mr-1" />
                        Save Quiz
                    </button>
                </div>
            </div>

            {/* Progress steps */}
            <div className="mb-8">
                <div className="flex items-center">
                    <div
                        className={`flex flex-col items-center ${activeSection === 'details' ? 'opacity-100' : 'opacity-60'}`}
                        onClick={() => setActiveSection('details')}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeSection === 'details' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                            1
                        </div>
                        <div className="mt-1 text-sm font-medium">Quiz Details</div>
                    </div>
                    <div className="flex-1 h-1 mx-4 bg-gray-200 dark:bg-gray-700"></div>
                    <div
                        className={`flex flex-col items-center ${activeSection === 'questions' ? 'opacity-100' : 'opacity-60'}`}
                        onClick={() => validateDetails() && setActiveSection('questions')}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeSection === 'questions' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                            2
                        </div>
                        <div className="mt-1 text-sm font-medium">Questions</div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                {activeSection === 'details' && (
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Quiz Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Quiz Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter quiz title"
                                />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter a description for this quiz"
                                ></textarea>
                            </div>

                            <div>
                                <label htmlFor="course" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Course <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center">
                                    <BookOpen size={18} className="text-gray-400 mr-2" />
                                    <select
                                        id="course"
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                                        value={courseId}
                                        onChange={(e) => setCourseId(e.target.value)}
                                    >
                                        <option value="">Select a course</option>
                                        {courses.map(course => (
                                            <option key={course.id} value={course.id}>{course.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Due Date (Optional)
                                </label>
                                <div className="flex items-center">
                                    <Calendar size={18} className="text-gray-400 mr-2" />
                                    <input
                                        id="dueDate"
                                        type="date"
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <input
                                        type="checkbox"
                                        className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                        checked={isTimeLimited}
                                        onChange={() => setIsTimeLimited(!isTimeLimited)}
                                    />
                                    Time Limited Quiz
                                </label>

                                {isTimeLimited && (
                                    <div className="mt-2 flex items-center">
                                        <Clock size={18} className="text-gray-400 mr-2" />
                                        <input
                                            type="number"
                                            className="w-20 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                                            value={duration}
                                            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                                            min="1"
                                        />
                                        <span className="ml-2 text-gray-600 dark:text-gray-400">minutes</span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="passingScore" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Passing Score (%)
                                </label>
                                <input
                                    id="passingScore"
                                    type="number"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                                    value={passingScore}
                                    onChange={(e) => setPassingScore(parseInt(e.target.value) || 0)}
                                    min="0"
                                    max="100"
                                />
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <input
                                        type="checkbox"
                                        className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                        checked={shuffleQuestions}
                                        onChange={() => setShuffleQuestions(!shuffleQuestions)}
                                    />
                                    Shuffle Questions
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <input
                                        type="checkbox"
                                        className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                        checked={showCorrectAnswers}
                                        onChange={() => setShowCorrectAnswers(!showCorrectAnswers)}
                                    />
                                    Show Correct Answers After Submission
                                </label>
                            </div>

                            <div>
                                <label htmlFor="maxAttempts" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Maximum Attempts
                                </label>
                                <input
                                    id="maxAttempts"
                                    type="number"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                                    value={maxAttempts}
                                    onChange={(e) => setMaxAttempts(parseInt(e.target.value) || 1)}
                                    min="1"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleNextSection}
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                            >
                                Next: Add Questions
                            </button>
                        </div>
                    </div>
                )}

                {activeSection === 'questions' && (
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Questions</h2>

                        {/* Question type selector */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Add Question:
                            </label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => addQuestion('multiple-choice')}
                                    className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800/40 text-sm flex items-center"
                                >
                                    <Plus size={16} className="mr-1" /> Multiple Choice
                                </button>
                                <button
                                    onClick={() => addQuestion('true-false')}
                                    className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-md hover:bg-green-200 dark:hover:bg-green-800/40 text-sm flex items-center"
                                >
                                    <Plus size={16} className="mr-1" /> True/False
                                </button>
                                <button
                                    onClick={() => addQuestion('short-answer')}
                                    className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded-md hover:bg-amber-200 dark:hover:bg-amber-800/40 text-sm flex items-center"
                                >
                                    <Plus size={16} className="mr-1" /> Short Answer
                                </button>
                                <button
                                    onClick={() => addQuestion('essay')}
                                    className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded-md hover:bg-purple-200 dark:hover:bg-purple-800/40 text-sm flex items-center"
                                >
                                    <Plus size={16} className="mr-1" /> Essay
                                </button>
                            </div>
                        </div>

                        {/* Questions list */}
                        <div className="space-y-6">
                            {questions.map((question, index) => (
                                <div
                                    key={question.id}
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-md font-medium">
                                            Question {index + 1}
                                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 font-normal">
                                                ({question.type === 'multiple-choice' ? 'Multiple Choice' :
                                                    question.type === 'true-false' ? 'True/False' :
                                                        question.type === 'short-answer' ? 'Short Answer' : 'Essay'})
                                            </span>
                                        </h3>

                                        <div className="flex space-x-1">
                                            <button
                                                title="Move up"
                                                onClick={() => moveQuestion(question.id, 'up')}
                                                disabled={index === 0}
                                                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 disabled:opacity-30"
                                            >
                                                <ChevronUp size={18} />
                                            </button>
                                            <button
                                                title="Move down"
                                                onClick={() => moveQuestion(question.id, 'down')}
                                                disabled={index === questions.length - 1}
                                                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 disabled:opacity-30"
                                            >
                                                <ChevronDown size={18} />
                                            </button>
                                            <button
                                                title="Remove question"
                                                onClick={() => removeQuestion(question.id)}
                                                className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Question content */}
                                    <div className="space-y-4">
                                        {/* Question text */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Question Text <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                className={`w-full p-2 border ${questionErrors[`${question.id}-text`] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-800`}
                                                rows={2}
                                                value={question.text}
                                                onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                                                placeholder="Enter your question here"
                                            ></textarea>
                                            {questionErrors[`${question.id}-text`] && (
                                                <p className="mt-1 text-sm text-red-500">{questionErrors[`${question.id}-text`]}</p>
                                            )}
                                        </div>

                                        {/* Multiple choice options */}
                                        {question.type === 'multiple-choice' && question.options && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Answer Options <span className="text-red-500">*</span>
                                                </label>
                                                {question.options.map((option, optIndex) => (
                                                    <div key={optIndex} className="flex items-center mb-2">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mr-2"
                                                            checked={Array.isArray(question.correctAnswer) && question.correctAnswer.includes(optIndex.toString())}
                                                            onChange={() => handleCorrectAnswerChange(question.id, optIndex)}
                                                        />
                                                        <input
                                                            type="text"
                                                            className={`flex-grow p-2 border ${questionErrors[`${question.id}-options`] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-800`}
                                                            value={option}
                                                            onChange={(e) => handleOptionChange(question.id, optIndex, e.target.value)}
                                                            placeholder={`Option ${optIndex + 1}`}
                                                        />
                                                    </div>
                                                ))}
                                                {questionErrors[`${question.id}-options`] && (
                                                    <p className="mt-1 text-sm text-red-500">{questionErrors[`${question.id}-options`]}</p>
                                                )}
                                                {questionErrors[`${question.id}-correctAnswer`] && (
                                                    <p className="mt-1 text-sm text-red-500">{questionErrors[`${question.id}-correctAnswer`]}</p>
                                                )}
                                            </div>
                                        )}

                                        {/* True/False options */}
                                        {question.type === 'true-false' && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Correct Answer <span className="text-red-500">*</span>
                                                </label>
                                                <div className="flex space-x-4">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                                                            checked={question.correctAnswer === 'True'}
                                                            onChange={() => handleTrueFalseChange(question.id, 'True')}
                                                        />
                                                        <span className="ml-2">True</span>
                                                    </label>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                                                            checked={question.correctAnswer === 'False'}
                                                            onChange={() => handleTrueFalseChange(question.id, 'False')}
                                                        />
                                                        <span className="ml-2">False</span>
                                                    </label>
                                                </div>
                                                {questionErrors[`${question.id}-correctAnswer`] && (
                                                    <p className="mt-1 text-sm text-red-500">{questionErrors[`${question.id}-correctAnswer`]}</p>
                                                )}
                                            </div>
                                        )}

                                        {/* Short answer */}
                                        {question.type === 'short-answer' && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Sample Answer (Optional)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                                                    value={question.correctAnswer as string || ''}
                                                    onChange={(e) => updateQuestion(question.id, 'correctAnswer', e.target.value)}
                                                    placeholder="Enter sample answer (will be used for auto-grading)"
                                                />
                                            </div>
                                        )}

                                        {/* Essay */}
                                        {question.type === 'essay' && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Grading Notes (Optional)
                                                </label>
                                                <textarea
                                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                                                    rows={2}
                                                    value={question.correctAnswer as string || ''}
                                                    onChange={(e) => updateQuestion(question.id, 'correctAnswer', e.target.value)}
                                                    placeholder="Enter grading notes for yourself (not shown to students)"
                                                ></textarea>
                                            </div>
                                        )}

                                        {/* Points */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Points
                                            </label>
                                            <input
                                                type="number"
                                                className={`w-24 p-2 border ${questionErrors[`${question.id}-points`] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-800`}
                                                value={question.points}
                                                onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value) || 0)}
                                                min="0"
                                            />
                                            {questionErrors[`${question.id}-points`] && (
                                                <p className="mt-1 text-sm text-red-500">{questionErrors[`${question.id}-points`]}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {questions.length === 0 && (
                                <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                                    <p className="text-gray-500 dark:text-gray-400">No questions added yet.</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Use the buttons above to add your first question.</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex justify-between">
                            <button
                                onClick={() => setActiveSection('details')}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                Back to Details
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                                disabled={questions.length === 0}
                            >
                                Save Quiz
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateQuizPage;
