import { createContext, useContext, useState, type ReactNode } from 'react';

interface ISidebarContext {
	isOpen: boolean;
	toggleSidebar: () => void;
	closeSidebar: () => void;
	openSidebar: () => void;
}

const SidebarContext = createContext<ISidebarContext | undefined>(undefined);

interface ISidebarProviderProps {
	children: ReactNode;
}

export function SidebarProvider({ children }: ISidebarProviderProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => setIsOpen(!isOpen);
	const closeSidebar = () => setIsOpen(false);
	const openSidebar = () => setIsOpen(true);

	const value: ISidebarContext = {
		isOpen,
		toggleSidebar,
		closeSidebar,
		openSidebar,
	};

	return (
		<SidebarContext.Provider value={value}>
			{children}
		</SidebarContext.Provider>
	);
}

export function useSidebar() {
	const context = useContext(SidebarContext);
	if (context === undefined) {
		throw new Error('useSidebar must be used within a SidebarProvider');
	}
	return context;
} 