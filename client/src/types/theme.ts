export type TTheme = 'light' | 'dark';

export interface IThemeContext {
	theme: TTheme;
	toggleTheme: () => void;
	setTheme: (theme: TTheme) => void;
}

export interface IThemeState {
	theme: TTheme;
} 