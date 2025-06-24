import { useTheme } from '../../../contexts/ThemeContext';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import styles from './styles.module.scss';

interface IFloatingThemeToggleProps {
	className?: string;
}

export function FloatingThemeToggle({ className = '' }: IFloatingThemeToggleProps) {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className={`${styles.floatingThemeToggle} ${className}`}
			aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
			title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
		>
			{theme === 'light' ? (
				<IoMoonOutline size={60} />
			) : (
				<IoSunnyOutline size={60} />
			)}
		</button>
	);
} 