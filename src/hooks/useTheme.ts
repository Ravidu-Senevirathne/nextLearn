import { useState, useEffect } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
            setTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        // Listen for theme changes from other components
        const handleStorageChange = () => {
            if (typeof window !== 'undefined') {
                const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
                setTheme(storedTheme);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return { theme };
};
