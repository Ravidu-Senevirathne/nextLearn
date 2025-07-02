"use client";

import React, { useState } from 'react';
import { Calendar as CalendarIcon, List, Grid, Filter, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { ScheduleEvent } from '@/Components/Dashboard/student/types';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addWeeks, subWeeks } from 'date-fns';

// Mock schedule data - would be fetched from API in production
const mockScheduleEvents: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Introduction to React',
    course: 'Web Development Fundamentals',
    date: '2023-12-11',
    time: '10:00 AM - 11:30 AM',
    type: 'lesson'
  },
  {
    id: '2',
    title: 'JavaScript Project Submission',
    course: 'Web Development Fundamentals',
    date: '2023-12-12',
    time: '11:59 PM',
    type: 'deadline'
  },
  {
    id: '3',
    title: 'CSS Frameworks Quiz',
    course: 'Web Development Fundamentals',
    date: '2023-12-13',
    time: '2:00 PM - 3:00 PM',
    type: 'quiz'
  },
  {
    id: '4',
    title: 'Data Science Midterm',
    course: 'Data Science Essentials',
    date: '2023-12-14',
    time: '10:00 AM - 12:00 PM',
    type: 'exam'
  },
  {
    id: '5',
    title: 'Machine Learning Q&A Session',
    course: 'Data Science Essentials',
    date: '2023-12-15',
    time: '3:00 PM - 4:00 PM',
    type: 'live'
  },
  {
    id: '6',
    title: 'UX Research Methods',
    course: 'UI/UX Design Principles',
    date: '2023-12-15',
    time: '1:00 PM - 2:30 PM',
    type: 'lesson'
  },
  {
    id: '7',
    title: 'Python Data Analysis',
    course: 'Data Science Essentials',
    date: '2023-12-18',
    time: '11:00 AM - 12:30 PM',
    type: 'lesson'
  },
  {
    id: '8',
    title: 'Final Project Presentation',
    course: 'Web Development Fundamentals',
    date: '2023-12-20',
    time: '2:00 PM - 5:00 PM',
    type: 'deadline'
  },
  {
    id: '9',
    title: 'React Native Basics',
    course: 'Mobile App Development',
    date: '2023-12-11',
    time: '3:30 PM - 5:00 PM',
    type: 'lesson'
  }
];

// Event type options for filtering
const eventTypes = [
  { value: 'all', label: 'All Events' },
  { value: 'lesson', label: 'Lessons' },
  { value: 'deadline', label: 'Deadlines' },
  { value: 'quiz', label: 'Quizzes' },
  { value: 'exam', label: 'Exams' },
  { value: 'live', label: 'Live Sessions' }
];

// Course options based on the mock data
const courses = [
  { value: 'all', label: 'All Courses' },
  { value: 'Web Development Fundamentals', label: 'Web Development Fundamentals' },
  { value: 'Data Science Essentials', label: 'Data Science Essentials' },
  { value: 'UI/UX Design Principles', label: 'UI/UX Design Principles' },
  { value: 'Mobile App Development', label: 'Mobile App Development' }
];

const SchedulePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Navigation functions
  const goToPreviousWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const goToNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  // Get date range for the current week
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Week starts on Monday
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Filter events
  const filteredEvents = mockScheduleEvents.filter(event => {
    const matchesEventType = eventTypeFilter === 'all' || event.type === eventTypeFilter;
    const matchesCourse = courseFilter === 'all' || event.course === courseFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEventType && matchesCourse && matchesSearch;
  });

  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, day);
    });
  };

  // Color mapping for event types
  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'lesson': return 'bg-blue-900/40 text-blue-400 border-blue-500/50';
      case 'deadline': return 'bg-red-900/40 text-red-400 border-red-500/50';
      case 'quiz': return 'bg-purple-900/40 text-purple-400 border-purple-500/50';
      case 'exam': return 'bg-amber-900/40 text-amber-400 border-amber-500/50';
      case 'live': return 'bg-green-900/40 text-green-400 border-green-500/50';
      default: return 'bg-gray-900/40 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2 flex items-center">
        <CalendarIcon className="mr-2 h-6 w-6 text-green-400" />
        My Schedule
      </h1>
      <p className="text-gray-400 mb-6">
        View and manage your upcoming lessons, assignments, and exams
      </p>

      {/* Controls and filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        {/* Date navigation */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={goToPreviousWeek}
            className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={goToToday}
            className="px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300"
          >
            Today
          </button>
          <button 
            onClick={goToNextWeek}
            className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300"
          >
            <ChevronRight size={20} />
          </button>
          <h2 className="text-lg font-medium ml-2 text-white">
            {format(weekStart, 'MMMM d')} - {format(weekEnd, 'MMMM d, yyyy')}
          </h2>
        </div>

        {/* View toggle and filters */}
        <div className="flex flex-wrap gap-3">
          {/* View toggle */}
          <div className="flex bg-gray-800 rounded-md overflow-hidden">
            <button 
              onClick={() => setView('calendar')}
              className={`px-3 py-2 flex items-center ${view === 'calendar' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
            >
              <Grid size={16} className="mr-1" />
              Calendar
            </button>
            <button 
              onClick={() => setView('list')}
              className={`px-3 py-2 flex items-center ${view === 'list' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
            >
              <List size={16} className="mr-1" />
              List
            </button>
          </div>

          {/* Event type filter */}
          <div className="flex items-center relative">
            <Filter size={16} className="absolute left-2.5 text-gray-400" />
            <select
              value={eventTypeFilter}
              onChange={(e) => setEventTypeFilter(e.target.value)}
              className="pl-8 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-md text-white appearance-none cursor-pointer"
            >
              {eventTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Course filter */}
          <div className="flex items-center">
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white appearance-none cursor-pointer"
            >
              {courses.map(course => (
                <option key={course.value} value={course.value}>{course.label}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-2.5 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            />
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="grid grid-cols-7 gap-px bg-gray-800">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="p-3 bg-gray-900 text-center">
                <p className="text-gray-400 text-sm">{format(day, 'EEE')}</p>
                <p className={`text-xl mt-1 font-medium ${isSameDay(day, new Date()) ? 'text-green-400' : 'text-white'}`}>
                  {format(day, 'd')}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px bg-gray-800">
            {daysOfWeek.map((day, dayIndex) => {
              const dayEvents = getEventsForDay(day);
              return (
                <div key={dayIndex} className="bg-gray-900 min-h-[200px] p-2">
                  {dayEvents.length > 0 ? (
                    <div className="space-y-2">
                      {dayEvents.map(event => (
                        <div 
                          key={event.id}
                          className={`p-2 rounded border-l-2 text-xs ${getEventTypeColor(event.type)}`}
                        >
                          <p className="font-medium">{event.title}</p>
                          <p>{event.time}</p>
                          <p className="opacity-75">{event.course}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-600 text-sm">
                      No events
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          {filteredEvents.length > 0 ? (
            <div className="divide-y divide-gray-800">
              {filteredEvents
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map(event => (
                <div key={event.id} className="p-4 hover:bg-gray-800 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium text-white">{event.title}</h4>
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getEventTypeColor(event.type)}`}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{event.course}</p>
                      <div className="flex items-center mt-1 text-gray-500 text-xs">
                        <CalendarIcon size={14} className="mr-1" /> 
                        {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
                        <span className="mx-1">•</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No events match your criteria. Try adjusting your filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
