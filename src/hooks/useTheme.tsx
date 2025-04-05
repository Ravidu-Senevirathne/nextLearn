import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeType>('dark');

    // Initialize theme from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') as ThemeType || 'dark';
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    // Update localStorage and document attribute when theme changes
    const handleThemeChange = (newTheme: ThemeType) => {
        setTheme(newTheme);
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};
