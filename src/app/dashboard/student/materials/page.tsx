"use client";

import React, { useState } from 'react';
import { Book, List, Grid, Filter, Search, FileText, Video, Download, ExternalLink, File } from 'lucide-react';

// Define material types
type MaterialType = 'pdf' | 'video' | 'link' | 'document' | 'assignment';

interface CourseMaterial {
  id: string;
  title: string;
  course: string;
  type: MaterialType;
  description: string;
  dateAdded: string;
  fileSize?: string; // Optional for files
  duration?: string; // Optional for videos
  url: string;
}

// Mock course materials data
const mockCourseMaterials: CourseMaterial[] = [
  {
    id: '1',
    title: 'React Fundamentals',
    course: 'Web Development Fundamentals',
    type: 'pdf',
    description: 'Introduction to React components and JSX syntax',
    dateAdded: '2023-11-15',
    fileSize: '2.4 MB',
    url: '/materials/react-fundamentals.pdf'
  },
  {
    id: '2',
    title: 'JavaScript ES6 Features',
    course: 'Web Development Fundamentals',
    type: 'document',
    description: 'Overview of modern JavaScript features',
    dateAdded: '2023-11-10',
    fileSize: '1.8 MB',
    url: '/materials/js-es6.docx'
  },
  {
    id: '3',
    title: 'CSS Grid Tutorial',
    course: 'Web Development Fundamentals',
    type: 'video',
    description: 'Learn how to create responsive layouts with CSS Grid',
    dateAdded: '2023-11-05',
    duration: '45:12',
    url: '/materials/css-grid-tutorial.mp4'
  },
  {
    id: '4',
    title: 'Python Data Analysis',
    course: 'Data Science Essentials',
    type: 'pdf',
    description: 'Using pandas and numpy for data manipulation',
    dateAdded: '2023-11-20',
    fileSize: '3.7 MB',
    url: '/materials/python-data-analysis.pdf'
  },
  {
    id: '5',
    title: 'Machine Learning Algorithms',
    course: 'Data Science Essentials',
    type: 'document',
    description: 'Overview of common ML algorithms and their applications',
    dateAdded: '2023-11-18',
    fileSize: '4.2 MB',
    url: '/materials/ml-algorithms.docx'
  },
  {
    id: '6',
    title: 'Data Visualization with Matplotlib',
    course: 'Data Science Essentials',
    type: 'video',
    description: 'Creating effective data visualizations in Python',
    dateAdded: '2023-11-12',
    duration: '38:45',
    url: '/materials/matplotlib-tutorial.mp4'
  },
  {
    id: '7',
    title: 'User Research Methods',
    course: 'UI/UX Design Principles',
    type: 'pdf',
    description: 'Techniques for gathering user feedback and insights',
    dateAdded: '2023-11-08',
    fileSize: '2.1 MB',
    url: '/materials/user-research.pdf'
  },
  {
    id: '8',
    title: 'Design System Documentation',
    course: 'UI/UX Design Principles',
    type: 'link',
    description: 'External resource for design system best practices',
    dateAdded: '2023-11-03',
    url: 'https://designsystem.example.com'
  },
  {
    id: '9',
    title: 'Mobile App Prototyping Assignment',
    course: 'Mobile App Development',
    type: 'assignment',
    description: 'Create a prototype for a mobile app using Figma',
    dateAdded: '2023-11-25',
    fileSize: '1.5 MB',
    url: '/materials/mobile-app-assignment.pdf'
  }
];

// Material type options for filtering
const materialTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'pdf', label: 'PDF Documents' },
  { value: 'video', label: 'Videos' },
  { value: 'document', label: 'Documents' },
  { value: 'link', label: 'External Links' },
  { value: 'assignment', label: 'Assignments' }
];

// Course options based on the mock data
const courses = [
  { value: 'all', label: 'All Courses' },
  { value: 'Web Development Fundamentals', label: 'Web Development Fundamentals' },
  { value: 'Data Science Essentials', label: 'Data Science Essentials' },
  { value: 'UI/UX Design Principles', label: 'UI/UX Design Principles' },
  { value: 'Mobile App Development', label: 'Mobile App Development' }
];

const MaterialsPage = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [materialTypeFilter, setMaterialTypeFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter materials
  const filteredMaterials = mockCourseMaterials.filter(material => {
    const matchesType = materialTypeFilter === 'all' || material.type === materialTypeFilter;
    const matchesCourse = courseFilter === 'all' || material.course === courseFilter;
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          material.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesCourse && matchesSearch;
  });

  // Get material type icon
  const getMaterialTypeIcon = (type: MaterialType) => {
    switch(type) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-400" />;
      case 'video': return <Video className="h-5 w-5 text-blue-400" />;
      case 'link': return <ExternalLink className="h-5 w-5 text-green-400" />;
      case 'document': return <File className="h-5 w-5 text-amber-400" />;
      case 'assignment': return <Download className="h-5 w-5 text-purple-400" />;
      default: return <File className="h-5 w-5 text-gray-400" />;
    }
  };

  // Get material type label
  const getMaterialTypeLabel = (type: MaterialType) => {
    const typeObj = materialTypes.find(t => t.value === type);
    return typeObj ? typeObj.label.replace(' Documents', '').replace('s', '') : type;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2 flex items-center">
        <Book className="mr-2 h-6 w-6 text-blue-400" />
        Course Materials
      </h1>
      <p className="text-gray-400 mb-6">
        Access all your course materials, readings, and assignments
      </p>

      {/* Controls and filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="lg:w-1/4">
          <p className="text-white">{filteredMaterials.length} materials found</p>
        </div>

        {/* View toggle and filters */}
        <div className="flex flex-wrap gap-3">
          {/* View toggle */}
          <div className="flex bg-gray-800 rounded-md overflow-hidden">
            <button 
              onClick={() => setView('grid')}
              className={`px-3 py-2 flex items-center ${view === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
            >
              <Grid size={16} className="mr-1" />
              Grid
            </button>
            <button 
              onClick={() => setView('list')}
              className={`px-3 py-2 flex items-center ${view === 'list' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
            >
              <List size={16} className="mr-1" />
              List
            </button>
          </div>

          {/* Material type filter */}
          <div className="flex items-center relative">
            <Filter size={16} className="absolute left-2.5 text-gray-400" />
            <select
              value={materialTypeFilter}
              onChange={(e) => setMaterialTypeFilter(e.target.value)}
              className="pl-8 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-md text-white appearance-none cursor-pointer"
            >
              {materialTypes.map(type => (
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
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            />
          </div>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.length > 0 ? filteredMaterials.map(material => (
            <div key={material.id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    {getMaterialTypeIcon(material.type)}
                    <span className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">
                      {getMaterialTypeLabel(material.type)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{material.dateAdded}</span>
                </div>
                <h3 className="mt-3 text-lg font-medium text-white">{material.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{material.course}</p>
                <p className="text-sm text-gray-500 mt-2">{material.description}</p>
                <div className="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {material.fileSize && `Size: ${material.fileSize}`}
                    {material.duration && `Duration: ${material.duration}`}
                    {material.type === 'link' && 'External Resource'}
                  </span>
                  <a 
                    href={material.url} 
                    target={material.type === 'link' ? "_blank" : "_self"}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center"
                  >
                    {material.type === 'link' ? 'Visit' : 'Download'}
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full p-8 text-center text-gray-500 bg-gray-900 border border-gray-800 rounded-lg">
              No materials match your criteria. Try adjusting your filters.
            </div>
          )}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          {filteredMaterials.length > 0 ? (
            <div className="divide-y divide-gray-800">
              {filteredMaterials.map(material => (
                <div key={material.id} className="p-4 hover:bg-gray-800 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3">
                        {getMaterialTypeIcon(material.type)}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{material.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{material.course}</p>
                        <p className="text-sm text-gray-500 mt-1">{material.description}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <span>Added: {material.dateAdded}</span>
                          {material.fileSize && (
                            <span className="ml-3">Size: {material.fileSize}</span>
                          )}
                          {material.duration && (
                            <span className="ml-3">Duration: {material.duration}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <a 
                      href={material.url} 
                      target={material.type === 'link' ? "_blank" : "_self"}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center ml-4 shrink-0"
                    >
                      {material.type === 'link' ? 'Visit' : 'Download'}
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No materials match your criteria. Try adjusting your filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MaterialsPage;
