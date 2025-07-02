"use client";

import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { ChevronRight, GraduationCap, Users } from "lucide-react";

export default function StudentsPage() {
    const { theme } = useTheme();
    const router = useRouter();

    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Student Management</h1>
            </div>

            <Tabs defaultValue="overview">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-bold">Total Students</CardTitle>
                                <Users className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">247</div>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                                    +12% from last month
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-bold">Active Enrollments</CardTitle>
                                <GraduationCap className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">189</div>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                                    +4% from last month
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Enrollments</CardTitle>
                                <CardDescription>Latest students enrolled in your courses</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="flex items-center justify-between p-2 rounded-lg border">
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    {String.fromCharCode(64 + i)}
                                                </div>
                                                <div>
                                                    <p className="font-medium">Student {i}</p>
                                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        Enrolled on Course {i}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full mt-4"
                                    onClick={() => router.push('/dashboard/lecturer/students/enrollments')}
                                >
                                    View All Enrollments
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="enrollments" className="mt-6">
                    <Button
                        variant="default"
                        onClick={() => router.push('/dashboard/lecturer/students/enrollments')}
                    >
                        Manage Enrollments
                    </Button>
                </TabsContent>
            </Tabs>
        </div>
    );
}
