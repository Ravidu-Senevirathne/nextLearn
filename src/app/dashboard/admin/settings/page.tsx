'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Switch } from '@/Components/ui/switch';
import { Separator } from '@/Components/ui/separator';

export default function SettingsPage() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>Platform Settings</CardTitle>
                            <CardDescription>
                                Manage your platform's general settings.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="platform-name">Platform Name</Label>
                                <Input id="platform-name" defaultValue="NEXTLEARN" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contact-email">Support Email</Label>
                                <Input id="contact-email" type="email" defaultValue="support@nextlearn.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="max-file-size">Maximum Upload Size (MB)</Label>
                                <Input id="max-file-size" type="number" defaultValue="50" />
                            </div>

                            <Separator className="my-4" />

                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium">Maintenance Mode</h3>
                                    <p className="text-sm text-gray-500">
                                        Put the platform in maintenance mode
                                    </p>
                                </div>
                                <Switch />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium">New User Registration</h3>
                                    <p className="text-sm text-gray-500">
                                        Allow new users to register
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <Button className="mt-4">Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance Settings</CardTitle>
                            <CardDescription>
                                Customize how the platform looks
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Theme</Label>
                                    <div className="flex space-x-2">
                                        <Button variant="outline">Light</Button>
                                        <Button variant="outline">Dark</Button>
                                        <Button variant="outline">System</Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Primary Color</Label>
                                    <div className="flex space-x-2">
                                        <div className="w-10 h-10 rounded-full bg-blue-500 cursor-pointer"></div>
                                        <div className="w-10 h-10 rounded-full bg-green-500 cursor-pointer"></div>
                                        <div className="w-10 h-10 rounded-full bg-purple-500 cursor-pointer"></div>
                                        <div className="w-10 h-10 rounded-full bg-red-500 cursor-pointer"></div>
                                    </div>
                                </div>

                                <Button className="mt-4">Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Settings</CardTitle>
                            <CardDescription>
                                Configure how and when notifications are sent
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">New User Notifications</h3>
                                        <p className="text-sm text-gray-500">
                                            Get notified when a new user registers
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">Course Purchase Notifications</h3>
                                        <p className="text-sm text-gray-500">
                                            Get notified for each course purchase
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">Weekly Reports</h3>
                                        <p className="text-sm text-gray-500">
                                            Receive weekly summary reports
                                        </p>
                                    </div>
                                    <Switch />
                                </div>

                                <Button className="mt-4">Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>
                                Manage security preferences for your platform
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">Two-Factor Authentication</h3>
                                        <p className="text-sm text-gray-500">
                                            Require 2FA for administrative accounts
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">Session Timeout</h3>
                                        <p className="text-sm text-gray-500">
                                            Automatically log out inactive users
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="timeout-duration">Timeout Duration (minutes)</Label>
                                    <Input id="timeout-duration" type="number" defaultValue="30" />
                                </div>

                                <Button className="mt-4">Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
