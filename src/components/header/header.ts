import './header.css';

interface HeaderProps {
	children: HTMLElement[];
}

export function HeaderComponent({ children }: HeaderProps) {
	const container = document.createElement('div');
	container.className = 'header-container';
	container.append(...children);
	return container;
}
