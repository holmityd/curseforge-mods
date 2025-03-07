import type { Observer } from '../../utils/observer';
import './mods-count.css';

interface ModsCountProps {
	count: Observer<number>;
}

export function ModsCountComponent({ count }: ModsCountProps) {
	const container = document.createElement('div');
	container.className = 'mods-count';
	count.subscribe((value) => {
		container.textContent = `Mods: ${value}`;
	});
	return container;
}
