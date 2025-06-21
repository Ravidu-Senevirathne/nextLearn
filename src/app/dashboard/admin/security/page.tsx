"use client";

import React, { useState } from 'react';
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Switch } from "@/Components/ui/switch";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Slider } from "@/Components/ui/slider";
import {
    Shield, Lock, UserCog, Key, AlertTriangle, CheckCircle,
    Settings, Users, FileText, Globe, RefreshCw, Fingerprint,
    ShieldAlert, LogIn, BellRing
} from "lucide-react";

export default function SecurityPage() {
    const { theme } = useTheme();
    const [passwordMinLength, setPasswordMinLength] = useState(8);
    const [sessionTimeout, setSessionTimeout] = useState(30);

    const getCardStyle = () => {
        return theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200";
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Security Settings</h1>
                    <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Manage system security and access controls
                    </p>
                </div>
                <Button className="flex items-center gap-2">
                    <RefreshCw size={16} />
                    Security Audit
                </Button>
            </div>

            {/* Security Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className={getCardStyle()}>
                    <CardContent className="p-4 flex items-center">
                        <div className={`p-3 mr-4 rounded-full ${theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"}`}>
                            <Shield size={24} />
                        </div>
                        <div>
                            <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Security Status</p>
                            <div className="flex items-center">
                                <CheckCircle size={16} className="mr-1 text-green-500" />
                                <p className="font-medium">Secure</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={getCardStyle()}>
                    <CardContent className="p-4 flex items-center">
                        <div className={`p-3 mr-4 rounded-full ${theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"}`}>
                            <LogIn size={24} />
                        </div>
                        <div>
                            <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Last Security Audit</p>
                            <p className="font-medium">3 days ago</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className={getCardStyle()}>
                    <CardContent className="p-4 flex items-center">
                        <div className={`p-3 mr-4 rounded-full ${theme === "dark" ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700"}`}>
                            <ShieldAlert size={24} />
                        </div>
                        <div>
                            <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Security Alerts</p>
                            <p className="font-medium">2 active alerts</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="authentication" className="w-full">
                <TabsList className="mb-6">
                    <TabsTrigger value="authentication">Authentication</TabsTrigger>
                    <TabsTrigger value="permissions">Permissions</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                    <TabsTrigger value="audit">Audit Log</TabsTrigger>
                </TabsList>

                <TabsContent value="authentication">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className={getCardStyle()}>
                            <CardHeader>
                                <CardTitle>Password Policy</CardTitle>
                                <CardDescription>Configure password requirements</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label>Minimum Password Length ({passwordMinLength})</Label>
                                    </div>
                                    <Slider
                                        value={[passwordMinLength]}
                                        min={6}
                                        max={16}
                                        step={1}
                                        onValueChange={(value) => setPasswordMinLength(value[0])}
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch id="require-uppercase" defaultChecked />
                                    <Label htmlFor="require-uppercase">Require uppercase letters</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch id="require-numbers" defaultChecked />
                                    <Label htmlFor="require-numbers">Require numbers</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch id="require-symbols" defaultChecked />
                                    <Label htmlFor="require-symbols">Require special characters</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch id="password-expiry" />
                                    <Label htmlFor="password-expiry">Password expires after 90 days</Label>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className={getCardStyle()}>
                            <CardHeader>
                                <CardTitle>Multi-Factor Authentication</CardTitle>
                                <CardDescription>Configure MFA settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Switch id="enable-mfa" defaultChecked />
                                    <Label htmlFor="enable-mfa">Enable MFA for all admin users</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch id="student-mfa" />
                                    <Label htmlFor="student-mfa">Require MFA for students</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch id="instructor-mfa" defaultChecked />
                                    <Label htmlFor="instructor-mfa">Require MFA for instructors</Label>
                                </div>

                                <div className="space-y-2 mt-4">
                                    <Label>MFA Methods</Label>
                                    <div className="pl-4 space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" id="sms-mfa" defaultChecked />
                                            <Label htmlFor="sms-mfa">SMS</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" id="email-mfa" defaultChecked />
                                            <Label htmlFor="email-mfa">Email</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" id="app-mfa" defaultChecked />
                                            <Label htmlFor="app-mfa">Authenticator App</Label>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className={getCardStyle()}>
                            <CardHeader>
                                <CardTitle>Session Security</CardTitle>
                                <CardDescription>Configure user session settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label>Session Timeout ({sessionTimeout} minutes)</Label>
                                    </div>
                                    <Slider
                                        value={[sessionTimeout]}
                                        min={5}
                                        max={120}
                                        step={5}
                                        onValueChange={(value) => setSessionTimeout(value[0])}
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch id="force-logout" defaultChecked />
                                    <Label htmlFor="force-logout">Force logout on browser close</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch id="concurrent-sessions" />
                                    <Label htmlFor="concurrent-sessions">Allow concurrent sessions</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch id="ip-restriction" />
                                    <Label htmlFor="ip-restriction">Restrict admin access by IP</Label>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className={getCardStyle()}>
                            <CardHeader>
                                <CardTitle>Login Protection</CardTitle>
                                <CardDescription>Configure login security features</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Switch id="lockout-policy" defaultChecked />
                                    <Label htmlFor="lockout-policy">Account lockout after 5 failed attempts</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch id="captcha" defaultChecked />
                                    <Label htmlFor="captcha">Enable CAPTCHA after 3 failed attempts</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch id="bruteforce" defaultChecked />
                                    <Label htmlFor="bruteforce">Brute force protection</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch id="login-notification" defaultChecked />
                                    <Label htmlFor="login-notification">Email notification for suspicious logins</Label>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="permissions">
                    <Card className={getCardStyle()}>
                        <CardHeader>
                            <CardTitle>Role Permissions</CardTitle>
                            <CardDescription>Manage role-based access controls</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                                        <tr>
                                            <th className="text-left py-2">Permission</th>
                                            <th className="text-center py-2">Admin</th>
                                            <th className="text-center py-2">Instructor</th>
                                            <th className="text-center py-2">Student</th>
                                            <th className="text-center py-2">Guest</th>
                                        </tr>
                                    </thead>
                                    <tbody className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>
                                        <tr>
                                            <td className="py-2">View course content</td>
                                            <td className="text-center"><CheckCircle size={16} className="mx-auto text-green-500" /></td>
                                            <td className="text-center"><CheckCircle size={16} className="mx-auto text-green-500" /></td>
                                            <td className="text-center"><CheckCircle size={16} className="mx-auto text-green-500" /></td>
                                            <td className="text-center">-</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">Create/edit courses</td>
                                            <td className="text-center"><CheckCircle size={16} className="mx-auto text-green-500" /></td>
                                            <td className="text-center"><CheckCircle size={16} className="mx-auto text-green-500" /></td>
                                            <td className="text-center">-</td>
                                            <td className="text-center">-</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">Manage users</td>
                                            <td className="text-center"><CheckCircle size={16} className="mx-auto text-green-500" /></td>
                                            <td className="text-center">-</td>
                                            <td className="text-center">-</td>
                                            <td className="text-center">-</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">Access admin panel</td>
                                            <td className="text-center"><CheckCircle size={16} className="mx-auto text-green-500" /></td>
                                            <td className="text-center">-</td>
                                            <td className="text-center">-</td>
                                            <td className="text-center">-</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">View reports</td>
                                            <td className="text-center"><CheckCircle size={16} className="mx-auto text-green-500" /></td>
                                            <td className="text-center"><CheckCircle size={16} className="mx-auto text-green-500" /></td>
                                            <td className="text-center">-</td>
                                            <td className="text-center">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <Button className="mt-4">Edit Permissions</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="privacy">
                    <Card className={getCardStyle()}>
                        <CardHeader>
                            <CardTitle>Privacy Settings</CardTitle>
                            <CardDescription>Configure data privacy settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Switch id="data-collection" defaultChecked />
                                <Label htmlFor="data-collection">Enable anonymous usage data collection</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="cookie-consent" defaultChecked />
                                <Label htmlFor="cookie-consent">Require cookie consent</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="data-retention" defaultChecked />
                                <Label htmlFor="data-retention">Auto-delete inactive user data after 2 years</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="personal-data" defaultChecked />
                                <Label htmlFor="personal-data">Allow users to download their personal data</Label>
                            </div>

                            <Button variant="outline" className="mt-2">Update Privacy Policy</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="audit">
                    <Card className={getCardStyle()}>
                        <CardHeader>
                            <CardTitle>Security Audit Log</CardTitle>
                            <CardDescription>Recent security events</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className={`p-3 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <LogIn size={16} className="mr-2 text-blue-500" />
                                            <span className="font-medium">Admin login</span>
                                        </div>
                                        <span className="text-sm text-gray-500">Today, 10:45 AM</span>
                                    </div>
                                    <p className="text-sm mt-1">Admin user login from IP 192.168.1.105</p>
                                </div>

                                <div className={`p-3 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Settings size={16} className="mr-2 text-amber-500" />
                                            <span className="font-medium">Settings changed</span>
                                        </div>
                                        <span className="text-sm text-gray-500">Yesterday, 3:22 PM</span>
                                    </div>
                                    <p className="text-sm mt-1">Password policy updated by admin</p>
                                </div>

                                <div className={`p-3 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <AlertTriangle size={16} className="mr-2 text-red-500" />
                                            <span className="font-medium">Failed login attempts</span>
                                        </div>
                                        <span className="text-sm text-gray-500">2 days ago, 8:15 PM</span>
                                    </div>
                                    <p className="text-sm mt-1">Multiple failed login attempts for user account</p>
                                </div>

                                <div className={`p-3 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <UserCog size={16} className="mr-2 text-green-500" />
                                            <span className="font-medium">User permissions</span>
                                        </div>
                                        <span className="text-sm text-gray-500">3 days ago, 11:30 AM</span>
                                    </div>
                                    <p className="text-sm mt-1">Instructor role permissions updated</p>
                                </div>
                            </div>
                            <Button variant="outline" className="mt-4">View Full Audit Log</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
