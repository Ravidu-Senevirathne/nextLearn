"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Clock,
    Calendar,
    CheckCircle,
    HelpCircle,
    Info,
    FileText,
    Users,
    Plus,
    Trash2
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/Components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Checkbox } from '@/Components/ui/checkbox';
import { Switch } from '@/Components/ui/switch';
import { Label } from '@/Components/ui/label';
import { Separator } from '@/Components/ui/separator';

// Sample courses data for the dropdown
const courses = [
    { id: "1", title: "Web Development Fundamentals" },
    { id: "2", title: "Advanced JavaScript" },
    { id: "3", title: "Backend Development" },
    { id: "4", title: "UI/UX Design Principles" }
];

// Question types
const questionTypes = [
    { value: "multiple_choice", label: "Multiple Choice" },
    { value: "true_false", label: "True/False" },
    { value: "short_answer", label: "Short Answer" },
    { value: "essay", label: "Essay Question" }
];

interface Question {
    id: string;
    type: string;
    text: string;
    options?: { id: string; text: string; isCorrect: boolean }[];
    marks: number;
}

const CreateExamPage = () => {
    const { theme } = useTheme();
    const router = useRouter();

    // Basic exam details
    const [examData, setExamData] = useState({
        title: '',
        courseId: '',
        description: '',
        instructions: '',
        duration: 60,
        date: '',
        time: '',
        totalMarks: 100,
        passingPercentage: 60,
        shuffleQuestions: false,
        showResults: true,
        status: 'draft' as 'draft' | 'published'
    });

    // Questions management
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question>({
        id: '1',
        type: 'multiple_choice',
        text: '',
        options: [
            { id: '1', text: '', isCorrect: false },
            { id: '2', text: '', isCorrect: false }
        ],
        marks: 10
    });

    const addQuestion = () => {
        // Add current question to the list and create a new empty one
        setQuestions([...questions, currentQuestion]);

        // Generate new IDs
        const newQuestionId = (questions.length + 2).toString();

        setCurrentQuestion({
            id: newQuestionId,
            type: 'multiple_choice',
            text: '',
            options: [
                { id: '1', text: '', isCorrect: false },
                { id: '2', text: '', isCorrect: false }
            ],
            marks: 10
        });
    };

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const updateQuestionText = (text: string) => {
        setCurrentQuestion({
            ...currentQuestion,
            text
        });
    };

    const updateQuestionType = (type: string) => {
        let options;

        if (type === 'multiple_choice') {
            options = currentQuestion.options?.length ?
                currentQuestion.options :
                [
                    { id: '1', text: '', isCorrect: false },
                    { id: '2', text: '', isCorrect: false }
                ];
        } else if (type === 'true_false') {
            options = [
                { id: '1', text: 'True', isCorrect: false },
                { id: '2', text: 'False', isCorrect: false }
            ];
        } else {
            options = [];
        }

        setCurrentQuestion({
            ...currentQuestion,
            type,
            options
        });
    };

    const addOption = () => {
        if (currentQuestion.options) {
            const newOptionId = (currentQuestion.options.length + 1).toString();
            setCurrentQuestion({
                ...currentQuestion,
                options: [
                    ...currentQuestion.options,
                    { id: newOptionId, text: '', isCorrect: false }
                ]
            });
        }
    };

    const removeOption = (optionId: string) => {
        if (currentQuestion.options) {
            setCurrentQuestion({
                ...currentQuestion,
                options: currentQuestion.options.filter(opt => opt.id !== optionId)
            });
        }
    };

    const updateOptionText = (optionId: string, text: string) => {
        if (currentQuestion.options) {
            setCurrentQuestion({
                ...currentQuestion,
                options: currentQuestion.options.map(opt =>
                    opt.id === optionId ? { ...opt, text } : opt
                )
            });
        }
    };

    const toggleOptionCorrect = (optionId: string) => {
        if (currentQuestion.options) {
            if (currentQuestion.type === 'true_false' || currentQuestion.type === 'multiple_choice') {
                // For single answer questions, only one option can be correct
                setCurrentQuestion({
                    ...currentQuestion,
                    options: currentQuestion.options.map(opt =>
                        ({ ...opt, isCorrect: opt.id === optionId })
                    )
                });
            } else {
                // For multiple answer questions, toggle the current option
                setCurrentQuestion({
                    ...currentQuestion,
                    options: currentQuestion.options.map(opt =>
                        opt.id === optionId ? { ...opt, isCorrect: !opt.isCorrect } : opt
                    )
                });
            }
        }
    };

    const updateMarks = (marks: number) => {
        setCurrentQuestion({
            ...currentQuestion,
            marks
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setExamData({
            ...examData,
            [name]: value
        });
    };

    const handleToggleChange = (name: string, checked: boolean) => {
        setExamData({
            ...examData,
            [name]: checked
        });
    };

    const calculateTotalMarks = () => {
        return questions.reduce((sum, question) => sum + question.marks, 0) + currentQuestion.marks;
    };

    const saveExam = (status: 'draft' | 'published') => {
        // Include the current question if it has content
        const allQuestions = currentQuestion.text.trim() !== '' ?
            [...questions, currentQuestion] : questions;

        const finalExamData = {
            ...examData,
            status,
            questions: allQuestions,
            totalMarks: calculateTotalMarks()
        };

        console.log('Saving exam:', finalExamData);
        // Here you would call your API to save the exam
        // For now we'll just redirect back to the exams list
        router.push('/dashboard/lecturer/exams');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Button
                    variant="outline"
                    className={`mb-4 ${theme === 'dark' ? 'text-gray-300 border-gray-600' : ''}`}
                    onClick={() => router.back()}
                >
                    <ArrowLeft size={16} className="mr-2" /> Back to Exams
                </Button>

                <h1 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    Create New Exam
                </h1>
                <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    Set up your exam details and add questions
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main content area - 2/3 width on desktop */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="details" className="w-full">
                        <TabsList className={`grid w-full grid-cols-3 ${theme === 'dark' ? 'bg-gray-700' : ''}`}>
                            <TabsTrigger value="details">Exam Details</TabsTrigger>
                            <TabsTrigger value="questions">Questions</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>

                        {/* Exam Details Tab */}
                        <TabsContent value="details">
                            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : ''}>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                    <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                                        Enter the general details for your exam
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <Label htmlFor="title" className={theme === 'dark' ? 'text-gray-200' : ''}>
                                                Exam Title*
                                            </Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                placeholder="e.g. Midterm Examination"
                                                value={examData.title}
                                                onChange={handleInputChange}
                                                className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : ''}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="courseId" className={theme === 'dark' ? 'text-gray-200' : ''}>
                                                Course*
                                            </Label>
                                            <Select onValueChange={(value) => setExamData({ ...examData, courseId: value })}>
                                                <SelectTrigger
                                                    className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : ''}
                                                >
                                                    <SelectValue placeholder="Select a course" />
                                                </SelectTrigger>
                                                <SelectContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : ''}>
                                                    {courses.map(course => (
                                                        <SelectItem key={course.id} value={course.id}>
                                                            {course.title}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="description" className={theme === 'dark' ? 'text-gray-200' : ''}>
                                                Description
                                            </Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                placeholder="Provide a brief description of the exam"
                                                value={examData.description}
                                                onChange={handleInputChange}
                                                className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : ''}
                                                rows={3}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="instructions" className={theme === 'dark' ? 'text-gray-200' : ''}>
                                                Instructions for Students
                                            </Label>
                                            <Textarea
                                                id="instructions"
                                                name="instructions"
                                                placeholder="Enter detailed instructions for students"
                                                value={examData.instructions}
                                                onChange={handleInputChange}
                                                className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : ''}
                                                rows={5}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <Label htmlFor="date" className={theme === 'dark' ? 'text-gray-200' : ''}>
                                                    Date*
                                                </Label>
                                                <div className="flex items-center">
                                                    <Calendar size={16} className="mr-2 text-gray-500" />
                                                    <Input
                                                        id="date"
                                                        name="date"
                                                        type="date"
                                                        value={examData.date}
                                                        onChange={handleInputChange}
                                                        className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : ''}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="time" className={theme === 'dark' ? 'text-gray-200' : ''}>
                                                    Time*
                                                </Label>
                                                <div className="flex items-center">
                                                    <Clock size={16} className="mr-2 text-gray-500" />
                                                    <Input
                                                        id="time"
                                                        name="time"
                                                        type="time"
                                                        value={examData.time}
                                                        onChange={handleInputChange}
                                                        className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : ''}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="duration" className={theme === 'dark' ? 'text-gray-200' : ''}>
                                                    Duration (minutes)*
                                                </Label>
                                                <Input
                                                    id="duration"
                                                    name="duration"
                                                    type="number"
                                                    min="5"
                                                    step="5"
                                                    value={examData.duration}
                                                    onChange={handleInputChange}
                                                    className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Questions Tab */}
                        <TabsContent value="questions">
                            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : ''}>
                                <CardHeader>
                                    <CardTitle className="flex justify-between">
                                        <span>Exam Questions</span>
                                        <span className={`text-sm font-normal ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Total Marks: {calculateTotalMarks()}
                                        </span>
                                    </CardTitle>
                                    <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                                        Add and manage questions for your exam
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* Previously added questions */}
                                    {questions.length > 0 && (
                                        <div className="mb-6 space-y-4">
                                            <h3 className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                                                Added Questions ({questions.length})
                                            </h3>

                                            {questions.map((question, index) => (
                                                <div
                                                    key={question.id}
                                                    className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex items-center">
                                                            <span className={`w-6 h-6 rounded-full ${theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                                                                } flex items-center justify-center text-sm mr-3`}>
                                                                {index + 1}
                                                            </span>
                                                            <div>
                                                                <p className={theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>
                                                                    {question.text}
                                                                </p>
                                                                <div className="flex items-center mt-1 text-xs">
                                                                    <span className={`rounded-md px-2 py-0.5 ${theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                                                                        }`}>
                                                                        {questionTypes.find(t => t.value === question.type)?.label || question.type}
                                                                    </span>
                                                                    <span className={`ml-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                                        {question.marks} marks
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeQuestion(question.id)}
                                                            className={`text-red-500 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-100'}`}
                                                        >
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                            <Separator className={theme === 'dark' ? 'bg-gray-700' : ''} />
                                        </div>
                                    )}

                                    {/* Current question being edited */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                                                {questions.length > 0 ? 'Add Another Question' : 'Add Question'}
                                            </h3>
                                            <div className="flex items-center space-x-2">
                                                <Label htmlFor="marks" className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                                    Marks:
                                                </Label>
                                                <Input
                                                    id="marks"
                                                    type="number"
                                                    min="1"
                                                    value={currentQuestion.marks}
                                                    onChange={(e) => updateMarks(parseInt(e.target.value) || 0)}
                                                    className={`w-16 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : ''}`}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="questionType" className={theme === 'dark' ? 'text-gray-200' : ''}>
                                                Question Type
                                            </Label>
                                            <Select
                                                value={currentQuestion.type}
                                                onValueChange={updateQuestionType}
                                            >
                                                <SelectTrigger
                                                    className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : ''}
                                                >
                                                    <SelectValue placeholder="Select question type" />
                                                </SelectTrigger>
                                                <SelectContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : ''}>
                                                    {questionTypes.map(type => (
                                                        <SelectItem key={type.value} value={type.value}>
                                                            {type.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="questionText" className={theme === 'dark' ? 'text-gray-200' : ''}>
                                                Question Text
                                            </Label>
                                            <Textarea
                                                id="questionText"
                                                value={currentQuestion.text}
                                                onChange={(e) => updateQuestionText(e.target.value)}
                                                placeholder="Enter your question here"
                                                className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : ''}
                                                rows={3}
                                            />
                                        </div>

                                        {/* Options for multiple choice / true-false questions */}
                                        {['multiple_choice', 'true_false'].includes(currentQuestion.type) && currentQuestion.options && (
                                            <div className="space-y-3">
                                                <Label className={theme === 'dark' ? 'text-gray-200' : ''}>
                                                    Options (select the correct answer)
                                                </Label>

                                                {currentQuestion.options.map(option => (
                                                    <div key={option.id} className="flex items-center space-x-3">
                                                        <Checkbox
                                                            id={`option-${option.id}`}
                                                            checked={option.isCorrect}
                                                            onCheckedChange={() => toggleOptionCorrect(option.id)}
                                                            className={theme === 'dark' ? 'border-gray-500 data-[state=checked]:bg-blue-600' : ''}
                                                        />
                                                        <div className="flex-1">
                                                            <Input
                                                                value={option.text}
                                                                onChange={(e) => updateOptionText(option.id, e.target.value)}
                                                                placeholder="Option text"
                                                                className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : ''}
                                                                disabled={currentQuestion.type === 'true_false'}
                                                            />
                                                        </div>
                                                        {currentQuestion.type !== 'true_false' && currentQuestion.options.length > 2 && (
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => removeOption(option.id)}
                                                                className={`text-red-500 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-100'}`}
                                                            >
                                                                <Trash2 size={14} />
                                                            </Button>
                                                        )}
                                                    </div>
                                                ))}

                                                {currentQuestion.type === 'multiple_choice' && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={addOption}
                                                        className={theme === 'dark' ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : ''}
                                                    >
                                                        <Plus size={14} className="mr-1" /> Add Option
                                                    </Button>
                                                )}
                                            </div>
                                        )}

                                        {/* Short answer and essay questions don't have options */}
                                        {['short_answer', 'essay'].includes(currentQuestion.type) && (
                                            <div className={`p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700 border border-gray-600 text-gray-300' : 'bg-gray-50 border border-gray-200 text-gray-500'
                                                }`}>
                                                <div className="flex items-center">
                                                    <Info size={14} className="mr-2" />
                                                    <p className="text-sm">
                                                        {currentQuestion.type === 'short_answer' ?
                                                            "Students will provide a brief text answer for this question." :
                                                            "Students will write a longer response for this essay question."
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="pt-2">
                                            <Button
                                                onClick={addQuestion}
                                                className={theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-teal-600 hover:bg-teal-700'}
                                            >
                                                <Plus size={16} className="mr-2" />
                                                Add Question
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Settings Tab */}
                        <TabsContent value="settings">
                            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : ''}>
                                <CardHeader>
                                    <CardTitle>Exam Settings</CardTitle>
                                    <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                                        Configure how the exam will be presented to students
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="passingPercentage" className={theme === 'dark' ? 'text-gray-200' : ''}>
                                                Passing Percentage
                                            </Label>
                                            <div className="flex items-center">
                                                <Input
                                                    id="passingPercentage"
                                                    name="passingPercentage"
                                                    type="number"
                                                    min="1"
                                                    max="100"
                                                    value={examData.passingPercentage}
                                                    onChange={handleInputChange}
                                                    className={`w-20 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : ''}`}
                                                />
                                                <span className={`ml-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label
                                                    htmlFor="shuffleQuestions"
                                                    className={`block font-medium ${theme === 'dark' ? 'text-gray-200' : ''}`}
                                                >
                                                    Shuffle Questions
                                                </Label>
                                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    Present questions in random order for each student
                                                </p>
                                            </div>
                                            <Switch
                                                id="shuffleQuestions"
                                                checked={examData.shuffleQuestions}
                                                onCheckedChange={(checked) => handleToggleChange('shuffleQuestions', checked)}
                                                className={theme === 'dark' ? 'data-[state=checked]:bg-blue-600' : ''}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label
                                                    htmlFor="showResults"
                                                    className={`block font-medium ${theme === 'dark' ? 'text-gray-200' : ''}`}
                                                >
                                                    Show Results After Completion
                                                </Label>
                                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    Allow students to see their results immediately
                                                </p>
                                            </div>
                                            <Switch
                                                id="showResults"
                                                checked={examData.showResults}
                                                onCheckedChange={(checked) => handleToggleChange('showResults', checked)}
                                                className={theme === 'dark' ? 'data-[state=checked]:bg-blue-600' : ''}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar area - 1/3 width on desktop */}
                <div className="space-y-6">
                    {/* Save/Publish Card */}
                    <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : ''}>
                        <CardHeader>
                            <CardTitle>Publish Exam</CardTitle>
                            <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                                Save as draft or publish to students
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className={`p-3 rounded-md ${theme === 'dark' ? 'bg-amber-900/20 border border-amber-800/30' : 'bg-amber-50 border border-amber-100'
                                }`}>
                                <div className="flex">
                                    <Info size={16} className={theme === 'dark' ? 'text-amber-400' : 'text-amber-600'} />
                                    <div className="ml-2">
                                        <p className={`text-sm ${theme === 'dark' ? 'text-amber-200' : 'text-amber-800'}`}>
                                            Drafts are only visible to you
                                        </p>
                                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-amber-300/80' : 'text-amber-700'}`}>
                                            Publishing will make the exam available to enrolled students
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col space-y-2">
                            <Button
                                className={`w-full ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-teal-600 hover:bg-teal-700'
                                    }`}
                                disabled={!examData.title || !examData.courseId || !examData.date || !examData.time || questions.length === 0}
                                onClick={() => saveExam('published')}
                            >
                                <CheckCircle size={16} className="mr-2" /> Publish Exam
                            </Button>

                            <Button
                                variant="outline"
                                className={`w-full ${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}`}
                                onClick={() => saveExam('draft')}
                            >
                                Save as Draft
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Summary Card */}
                    <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : ''}>
                        <CardHeader>
                            <CardTitle className="text-base">Exam Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Total Questions</span>
                                    <span className="font-medium">{questions.length + (currentQuestion.text ? 1 : 0)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Total Marks</span>
                                    <span className="font-medium">{calculateTotalMarks()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Duration</span>
                                    <span className="font-medium">{examData.duration} minutes</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Passing Score</span>
                                    <span className="font-medium">{examData.passingPercentage}%</span>
                                </div>
                            </div>

                            <Separator className={`my-3 ${theme === 'dark' ? 'bg-gray-700' : ''}`} />

                            <div className="flex justify-between items-center">
                                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Status</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                                    }`}>
                                    Draft
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Help Card */}
                    <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : ''}>
                        <CardHeader>
                            <CardTitle className="text-base">Need Help?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={`p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50 border border-gray-200'
                                }`}>
                                <div className="flex">
                                    <HelpCircle size={16} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                                    <div className="ml-2">
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Creating Effective Exams
                                        </p>
                                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Check our{' '}
                                            <Link
                                                href="/support/exam-guide"
                                                className={theme === 'dark' ? 'text-blue-400 underline' : 'text-blue-600 underline'}
                                            >
                                                examination best practices
                                            </Link>{' '}
                                            for tips on creating effective assessments.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateExamPage;