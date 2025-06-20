import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import type { IThemeContext, TTheme } from "../types/theme";

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

const THEME_STORAGE_KEY = "savannah-theme";

const getInitialTheme = (): TTheme => {
  //   const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as TTheme;
  //   if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
  //     return storedTheme;
  //   }

  //   if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //     return "dark";
  //   }

  return "light";
};

interface IThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: IThemeProviderProps) {
  const [theme, setThemeState] = useState<TTheme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (!storedTheme) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const setTheme = useCallback((newTheme: TTheme) => {
    setThemeState(newTheme);
  }, []);

  const value: IThemeContext = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Custom hook to use the theme context
 * @throws {Error} if used outside of ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
