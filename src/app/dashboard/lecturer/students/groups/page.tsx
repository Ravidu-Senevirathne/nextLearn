"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Filter,
    PlusCircle,
    Users,
    User,
    MoreHorizontal,
    UserPlus,
    Trash2,
    Edit,
    CalendarClock,
    FileText
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

// Define Group interface
interface Group {
    id: number;
    name: string;
    description: string;
    course: string;
    members: number;
    status: 'active' | 'completed';
    createdAt: string;
}

// Mock course data for group creation
const mockCourses = [
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Research Methods' },
    { id: 3, name: 'Mobile App Development' },
    { id: 4, name: 'Advanced Research Topics' },
    { id: 5, name: 'AI & Machine Learning' },
];

const mockGroups: Group[] = [
    {
        id: 1,
        name: 'React Study Group',
        description: 'Advanced React concepts and hooks',
        course: 'Web Development',
        members: 8,
        status: 'active',
        createdAt: '2024-01-15T10:00:00Z'
    },
    {
        id: 2,
        name: 'Research Team Alpha',
        description: 'AI and machine learning research',
        course: 'AI & Machine Learning',
        members: 6,
        status: 'active',
        createdAt: '2024-01-10T10:00:00Z'
    },
    {
        id: 3,
        name: 'Mobile Dev Workshop',
        description: 'Flutter and React Native development',
        course: 'Mobile App Development',
        members: 12,
        status: 'completed',
        createdAt: '2024-01-05T10:00:00Z'
    }
];

export default function GroupsPage() {
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [groups, setGroups] = useState<Group[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newGroup, setNewGroup] = useState({
        name: '',
        description: '',
        course: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const groupsPerPage = 10;

    // Fetch groups from API
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8000/groups', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    // Use mock data if API is not available
                    console.warn('API not available, using mock data');
                    setGroups(mockGroups);
                    return;
                }

                const data = await response.json();

                // Validate and filter data to ensure it's groups, not courses
                const isValidGroup = (item: any): item is Group => {
                    return item &&
                        typeof item === 'object' &&
                        typeof item.id === 'number' &&
                        typeof item.name === 'string' &&
                        typeof item.description === 'string' &&
                        typeof item.course === 'string' &&
                        typeof item.members === 'number' &&
                        (item.status === 'active' || item.status === 'completed') &&
                        typeof item.createdAt === 'string' &&
                        // Ensure it's not a course object
                        !item.hasOwnProperty('title') &&
                        !item.hasOwnProperty('category') &&
                        !item.hasOwnProperty('level') &&
                        !item.hasOwnProperty('duration') &&
                        !item.hasOwnProperty('price') &&
                        !item.hasOwnProperty('imageUrl');
                };

                let groupsData: Group[] = [];

                if (Array.isArray(data)) {
                    groupsData = data.filter(isValidGroup);
                } else if (data && Array.isArray(data.groups)) {
                    groupsData = data.groups.filter(isValidGroup);
                } else {
                    console.warn('Unexpected data format, using mock data:', data);
                    groupsData = mockGroups;
                }

                // If no valid groups found, use mock data
                if (groupsData.length === 0) {
                    console.warn('No valid groups found in API response, using mock data');
                    groupsData = mockGroups;
                }

                setGroups(groupsData);
            } catch (err: any) {
                console.error("Error fetching groups:", err);
                // Use mock data on error
                setGroups(mockGroups);
                setError(''); // Clear error since we're using mock data
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    // Filter groups based on search query and status
    const filteredGroups = useMemo(() => {
        // Ensure groups is an array and each group has the expected properties
        if (!Array.isArray(groups)) {
            return [];
        }

        return groups.filter((group: Group) => {
            // Add safety checks for group properties
            if (!group || typeof group !== 'object') {
                return false;
            }

            const groupName = group.name || '';
            const groupDescription = group.description || '';
            const groupCourse = group.course || '';

            const matchesSearch =
                groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                groupDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                groupCourse.toLowerCase().includes(searchQuery.toLowerCase());

            let matchesStatus = true;
            if (statusFilter !== 'all') {
                matchesStatus = group.status === statusFilter;
            }

            return matchesSearch && matchesStatus;
        });
    }, [searchQuery, statusFilter, groups]);

    // Get current groups for pagination
    const indexOfLastGroup = currentPage * groupsPerPage;
    const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
    const currentGroups = filteredGroups.slice(indexOfFirstGroup, indexOfLastGroup);
    const totalPages = Math.ceil(filteredGroups.length / groupsPerPage);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Handle creating a new group
    const handleCreateGroup = async () => {
        try {
            const response = await fetch('http://localhost:8000/lecturer/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGroup),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
            }

            const createdGroup: Group = await response.json();
            setGroups([...groups, createdGroup]);
            setNewGroup({ name: '', description: '', course: '' });
            setIsCreateDialogOpen(false);
        } catch (err: any) {
            console.error("Error creating group:", err);
            alert(err.message || 'Failed to create group');
        }
    };

    // Handle deleting a group
    const handleDeleteGroup = async (groupId: number) => {
        if (confirm('Are you sure you want to delete this group?')) {
            try {
                const response = await fetch(`http://localhost:8000/lecturer/groups/${groupId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                setGroups(groups.filter((group: Group) => group.id !== groupId));
            } catch (err: any) {
                console.error("Error deleting group:", err);
                alert(err.message || 'Failed to delete group');
            }
        }
    };

    // Show loading state
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center h-[60vh]">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-black'}`}>
                        Student Groups
                    </h1>
                    <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                        Create and manage student groups for collaborative work
                    </p>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className={
                                theme === 'dark'
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                            }
                        >
                            <PlusCircle size={16} className="mr-2" /> Create Group
                        </Button>
                    </DialogTrigger>
                    <DialogContent className={theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}>
                        <DialogHeader>
                            <DialogTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Create New Group</DialogTitle>
                            <DialogDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                                Add details for the new student group
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Group Name</Label>
                                <Input
                                    id="name"
                                    value={newGroup.name}
                                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                                    className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}
                                    placeholder="Enter group name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description" className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Description</Label>
                                <Input
                                    id="description"
                                    value={newGroup.description}
                                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                                    className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}
                                    placeholder="Enter group description"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="course" className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Course</Label>
                                <select
                                    id="course"
                                    value={newGroup.course}
                                    onChange={(e) => setNewGroup({ ...newGroup, course: e.target.value })}
                                    className={`w-full p-2 rounded-md border ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                        } focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-teal-500'}`}
                                >
                                    <option value="">Select a course</option>
                                    {mockCourses.map(course => (
                                        <option key={course.id} value={course.name}>{course.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={() => setIsCreateDialogOpen(false)}
                                variant="outline"
                                className={theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : ''}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreateGroup}
                                className={
                                    theme === 'dark'
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-teal-600 hover:bg-teal-700 text-white'
                                }
                                disabled={!newGroup.name || !newGroup.course}
                            >
                                Create Group
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats Summary */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-6`}>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                            <Users size={20} />
                        </div>
                        <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Total Groups</div>
                            <div className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {Array.isArray(groups) ? groups.length : 0}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-600'}`}>
                            <Users size={20} />
                        </div>
                        <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Active Groups</div>
                            <div className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {Array.isArray(groups) ? groups.filter(g => g && g.status === 'active').length : 0}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'dark' ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-100 text-amber-600'}`}>
                            <User size={20} />
                        </div>
                        <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Total Students in Groups</div>
                            <div className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {Array.isArray(groups) ? groups.reduce((acc, group) => acc + (group?.members || 0), 0) : 0}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className={`relative flex-1 max-w-md ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                    </div>
                    <input
                        type="text"
                        className={`pl-10 pr-4 py-2 w-full rounded-md border ${theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
                            } focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-teal-500'}`}
                        placeholder="Search groups..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                        <Filter size={16} className={`mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Status:</span>
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className={`py-2 px-3 rounded-md border ${theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                            } focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-teal-500'
                            } [&>option]:text-black ${theme === 'dark' && '[&>option]:bg-gray-700 [&>option]:text-white'}`}
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Groups Table */}
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className={theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}>
                        <tr>
                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                                Group Name
                            </th>
                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                                Course
                            </th>
                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                                Members
                            </th>
                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                                Created
                            </th>
                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                                Status
                            </th>
                            <th scope="col" className={`px-6 py-3 text-right text-xs font-medium ${theme === 'dark' ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className={`${theme === 'dark' ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'}`}>
                        {currentGroups.length > 0 ? (
                            currentGroups.map((group) => (
                                <tr
                                    key={group.id}
                                    className={theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}
                                >
                                    <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        <div className="flex items-center">
                                            <div className={`h-10 w-10 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'} flex items-center justify-center`}>
                                                <Users size={16} />
                                            </div>
                                            <div className="ml-4">
                                                <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                    {group.name}
                                                </div>
                                                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {group.description}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                        {group.course}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                        <div className="flex items-center">
                                            <Users size={14} className="mr-2" />
                                            {group.members}
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                        <div className="flex items-center">
                                            <CalendarClock size={14} className="mr-2" />
                                            {new Date(group.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap`}>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                            ${group.status === 'active'
                                                ? theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                                                : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`
                                        }>
                                            {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                                                >
                                                    <MoreHorizontal size={16} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className={
                                                theme === 'dark'
                                                    ? 'bg-gray-800 border-gray-700 text-white'
                                                    : 'bg-white border-gray-200'
                                            }>
                                                <Link href={`/dashboard/lecturer/students/groups/${group.id}`}>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Users size={14} className="mr-2" />
                                                        View Group
                                                    </DropdownMenuItem>
                                                </Link>
                                                <Link href={`/dashboard/lecturer/students/groups/${group.id}/edit`}>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Edit size={14} className="mr-2" />
                                                        Edit Group
                                                    </DropdownMenuItem>
                                                </Link>
                                                <Link href={`/dashboard/lecturer/students/groups/${group.id}/add-members`}>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <UserPlus size={14} className="mr-2" />
                                                        Add Members
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuItem
                                                    className="cursor-pointer text-red-500"
                                                    onClick={() => handleDeleteGroup(group.id)}
                                                >
                                                    <Trash2 size={14} className="mr-2" />
                                                    Delete Group
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className={`px-6 py-12 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                                >
                                    <div className="flex flex-col items-center">
                                        <Users size={40} className="mb-2 opacity-40" />
                                        <p>No groups found matching your criteria</p>
                                        {searchQuery && (
                                            <p className="mt-1">
                                                Try adjusting your search or filter
                                            </p>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className={`flex items-center justify-between py-3`}>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Showing <span className="font-medium">{indexOfFirstGroup + 1}</span> to{" "}
                        <span className="font-medium">
                            {indexOfLastGroup > filteredGroups.length ? filteredGroups.length : indexOfLastGroup}
                        </span>{" "}
                        of <span className="font-medium">{filteredGroups.length}</span> groups
                    </div>
                    <div className="flex space-x-1">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                            disabled={currentPage === 1}
                            className={
                                currentPage === 1
                                    ? `${theme === 'dark' ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                                    : `${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'}`
                            }
                        >
                            Previous
                        </Button>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <Button
                                key={index}
                                variant={currentPage === index + 1 ? "default" : "outline"}
                                size="sm"
                                onClick={() => paginate(index + 1)}
                                className={
                                    currentPage === index + 1
                                        ? `${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-teal-600 text-white'}`
                                        : `${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'}`
                                }
                            >
                                {index + 1}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                            disabled={currentPage === totalPages}
                            className={
                                currentPage === totalPages
                                    ? `${theme === 'dark' ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                                    : `${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'}`
                            }
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}

            {/* Help section */}
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
                <div className="flex items-center">
                    <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'} mr-3`}>
                        <FileText size={16} />
                    </div>
                    <div>
                        <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Effective Group Management
                        </h3>
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Learn how to create effective student groups in our{' '}
                            <Link
                                href="/support/group-management"
                                className={theme === 'dark' ? 'text-blue-400' : 'text-teal-600'}
                            >
                                Group Learning Guide
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
