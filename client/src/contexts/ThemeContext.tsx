import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { IThemeContext, TTheme } from '../types/theme';

// Create context
const ThemeContext = createContext<IThemeContext | undefined>(undefined);

// Theme storage key
const THEME_STORAGE_KEY = 'savannah-theme';

// Get initial theme from localStorage or system preference
const getInitialTheme = (): TTheme => {
	// Check localStorage first
	const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as TTheme;
	if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
		return storedTheme;
	}

	// Fall back to system preference
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	}

	return 'light';
};

interface IThemeProviderProps {
	children: ReactNode;
}

/**
 * Theme context provider component
 * Manages theme state and provides theme methods to children
 */
export function ThemeProvider({ children }: IThemeProviderProps) {
	const [theme, setThemeState] = useState<TTheme>(getInitialTheme);

	// Update document attributes when theme changes
	useEffect(() => {
		const root = document.documentElement;
		
		// Remove existing theme classes
		root.classList.remove('light', 'dark');
		
		// Add current theme class
		root.classList.add(theme);
		
		// Update data-theme attribute
		root.setAttribute('data-theme', theme);
		
		// Store in localStorage
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	}, [theme]);

	// Listen for system theme changes
	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		
		const handleChange = (e: MediaQueryListEvent) => {
			// Only update if user hasn't manually set a theme
			const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
			if (!storedTheme) {
				setThemeState(e.matches ? 'dark' : 'light');
			}
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	const toggleTheme = useCallback(() => {
		setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	}, []);

	const setTheme = useCallback((newTheme: TTheme) => {
		setThemeState(newTheme);
	}, []);

	const value: IThemeContext = {
		theme,
		toggleTheme,
		setTheme,
	};

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Custom hook to use the theme context
 * @throws {Error} if used outside of ThemeProvider
 */
export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
} 