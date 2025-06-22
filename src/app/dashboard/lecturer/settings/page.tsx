"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import {
  User,
  Bell,
  Save,
  Globe,
  CreditCard,
  Shield,
  Monitor,
  RefreshCw,
  Check,
  LogOut
} from 'lucide-react';

export default function SettingsPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8000/lecturer/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        console.error("Error fetching user data:", err);
        setError(err.message || 'Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Helper functions for theme-specific styling
  const getCardStyle = () => {
    return theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  };

  const getInputStyle = () => {
    return theme === 'dark'
      ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500'
      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500';
  };

  const getTabStyle = (tabName: string) => {
    return activeTab === tabName
      ? theme === 'dark'
        ? 'border-blue-500 text-blue-500 bg-gray-800'
        : 'border-blue-600 text-blue-600 bg-blue-50'
      : theme === 'dark'
        ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleNotificationChange = (setting: keyof typeof userData.emailNotifications) => {
    setUserData({
      ...userData,
      emailNotifications: {
        ...userData.emailNotifications,
        [setting]: !userData.emailNotifications[setting]
      }
    });
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);

    try {
      const response = await fetch('http://localhost:8000/lecturer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Show success message
      setSaveSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      console.error("Error saving user data:", err);
      alert(err.message || 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  // Show loading state
  if (isLoading) {
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

  // Return null if userData is not loaded yet
  if (!userData) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Settings
        </h1>

        {saveSuccess && (
          <div className="flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-4 py-2 rounded-md">
            <Check size={16} className="mr-2" />
            Settings saved successfully
          </div>
        )}

        <button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className={`px-4 py-2 rounded-md inline-flex items-center ${theme === 'dark'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-medium`}
        >
          {isSaving ? (
            <>
              <RefreshCw size={16} className="mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar with tabs */}
        <div className="md:w-64">
          <div className={`rounded-lg border ${getCardStyle()}`}>
            <div className="p-4 border-b dark:border-gray-700">
              <h2 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Settings
              </h2>
            </div>
            <div className="p-2">
              <nav className="flex flex-col space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center px-3 py-2 text-sm rounded-md ${getTabStyle('profile')}`}
                >
                  <User size={16} className="mr-2" />
                  Profile Settings
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`flex items-center px-3 py-2 text-sm rounded-md ${getTabStyle('account')}`}
                >
                  <CreditCard size={16} className="mr-2" />
                  Account Settings
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center px-3 py-2 text-sm rounded-md ${getTabStyle('notifications')}`}
                >
                  <Bell size={16} className="mr-2" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center px-3 py-2 text-sm rounded-md ${getTabStyle('security')}`}
                >
                  <Shield size={16} className="mr-2" />
                  Security
                </button>
              </nav>
            </div>
          </div>

          {/* Log out card */}
          <div className={`mt-4 rounded-lg border ${getCardStyle()}`}>
            <div className="p-4">
              <button
                className={`w-full flex items-center justify-center px-4 py-2 rounded-md ${theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
              >
                <LogOut size={16} className="mr-2" />
                Log Out
              </button>
            </div>
          </div>
        </div>

        {/* Right content area */}
        <div className="flex-1">
          {/* Profile Settings Tab */}
          {activeTab === 'profile' && (
            <div className={`rounded-lg border ${getCardStyle()}`}>
              <div className="p-4 border-b dark:border-gray-700">
                <h2 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Profile Settings
                </h2>
                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Update your personal information and public profile details
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${getInputStyle()}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${getInputStyle()}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${getInputStyle()}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Profile Visibility
                    </label>
                    <select
                      name="profileVisibility"
                      value={userData.profileVisibility}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${getInputStyle()}`}
                    >
                      <option value="public">Public</option>
                      <option value="students">Students Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={userData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-md ${getInputStyle()}`}
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Account Settings Tab */}
          {activeTab === 'account' && (
            <div className={`rounded-lg border ${getCardStyle()}`}>
              <div className="p-4 border-b dark:border-gray-700">
                <h2 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Account Settings
                </h2>
                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Manage your account preferences and regional settings
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Language
                    </label>
                    <div className="flex items-center">
                      <Globe size={18} className="mr-2 text-gray-400" />
                      <select
                        name="language"
                        value={userData.language}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md ${getInputStyle()}`}
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Chinese">Chinese</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Time Zone
                    </label>
                    <select
                      name="timezone"
                      value={userData.timezone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${getInputStyle()}`}
                    >
                      <option value="GMT-8 (Pacific Time)">GMT-8 (Pacific Time)</option>
                      <option value="GMT-7 (Mountain Time)">GMT-7 (Mountain Time)</option>
                      <option value="GMT-6 (Central Time)">GMT-6 (Central Time)</option>
                      <option value="GMT-5 (Eastern Time)">GMT-5 (Eastern Time)</option>
                      <option value="GMT+0 (UTC)">GMT+0 (UTC)</option>
                      <option value="GMT+1 (Central European Time)">GMT+1 (Central European Time)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t dark:border-gray-700">
                  <h3 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Connected Accounts
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Google</div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {userData.connectedAccounts.google ? 'Connected' : 'Not connected'}
                          </div>
                        </div>
                      </div>
                      <button
                        className={`px-3 py-1 text-xs rounded-md ${userData.connectedAccounts.google
                            ? theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                            : theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                          }`}
                      >
                        {userData.connectedAccounts.google ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>GitHub</div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {userData.connectedAccounts.github ? 'Connected' : 'Not connected'}
                          </div>
                        </div>
                      </div>
                      <button
                        className={`px-3 py-1 text-xs rounded-md ${userData.connectedAccounts.github
                            ? theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                            : theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                          }`}
                      >
                        {userData.connectedAccounts.github ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>LinkedIn</div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {userData.connectedAccounts.linkedin ? 'Connected' : 'Not connected'}
                          </div>
                        </div>
                      </div>
                      <button
                        className={`px-3 py-1 text-xs rounded-md ${userData.connectedAccounts.linkedin
                            ? theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                            : theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                          }`}
                      >
                        {userData.connectedAccounts.linkedin ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className={`rounded-lg border ${getCardStyle()}`}>
              <div className="p-4 border-b dark:border-gray-700">
                <h2 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Notification Settings
                </h2>
                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Configure how you receive notifications
                </p>
              </div>
              <div className="p-6 space-y-6">
                <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Email Notifications
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Course Updates
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Receive notifications when your courses are updated
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('courseUpdates')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${userData.emailNotifications.courseUpdates
                          ? 'bg-blue-600'
                          : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${userData.emailNotifications.courseUpdates ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Student Messages
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Receive notifications when students send you messages
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('studentMessages')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${userData.emailNotifications.studentMessages
                          ? 'bg-blue-600'
                          : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${userData.emailNotifications.studentMessages ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Student Submissions
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Receive notifications when students submit assignments
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('studentSubmissions')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${userData.emailNotifications.studentSubmissions
                          ? 'bg-blue-600'
                          : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${userData.emailNotifications.studentSubmissions ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Platform Announcements
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Receive important announcements about the platform
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('platformAnnouncements')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${userData.emailNotifications.platformAnnouncements
                          ? 'bg-blue-600'
                          : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${userData.emailNotifications.platformAnnouncements ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Marketing Emails
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Receive promotional material and newsletters
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('marketingEmails')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${userData.emailNotifications.marketingEmails
                          ? 'bg-blue-600'
                          : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${userData.emailNotifications.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className={`rounded-lg border ${getCardStyle()}`}>
              <div className="p-4 border-b dark:border-gray-700">
                <h2 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Security Settings
                </h2>
                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Manage your password and account security
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className={`text-sm font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className={`w-full px-3 py-2 border rounded-md ${getInputStyle()}`}
                        placeholder="Enter your current password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        className={`w-full px-3 py-2 border rounded-md ${getInputStyle()}`}
                        placeholder="Enter your new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className={`w-full px-3 py-2 border rounded-md ${getInputStyle()}`}
                        placeholder="Confirm your new password"
                      />
                    </div>
                    <div>
                      <button className={`px-4 py-2 rounded-md ${theme === 'dark'
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                        } text-white font-medium`}>
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Two-Factor Authentication
                      </h3>
                      <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {userData.twoFactorEnabled
                          ? 'Two-factor authentication is currently enabled'
                          : 'Add an extra layer of security to your account'}
                      </p>
                    </div>
                    <button
                      className={`px-3 py-1 rounded-md text-sm ${userData.twoFactorEnabled
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        }`}
                    >
                      {userData.twoFactorEnabled ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Sessions
                      </h3>
                      <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Manage your active sessions
                      </p>
                    </div>
                    <button className={`px-3 py-1 rounded-md text-sm ${theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}>
                      Sign Out All Devices
                    </button>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className={`p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Monitor size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                          <div className="ml-3">
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              Current Session
                            </p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                              Windows • Chrome • United States
                            </p>
                          </div>
                        </div>
                        <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                          Active Now
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t dark:border-gray-700">
                  <h3 className={`text-sm font-medium text-red-600 dark:text-red-400`}>
                    Danger Zone
                  </h3>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    These actions are irreversible
                  </p>

                  <div className="mt-4">
                    <button className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
