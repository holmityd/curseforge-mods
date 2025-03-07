import './search.css';

interface SearchComponentProps {
	onSubmit: (modId: number) => Promise<void>;
}

export function SearchComponent({ onSubmit }: SearchComponentProps) {
	// .input-container
	const createContainer = () => {
		const container = document.createElement('div');
		container.className = 'search-container';
		return container;
	};

	// .input-container > input.mod-input
	const createInput = () => {
		const input = document.createElement('input');
		input.type = 'number';
		input.placeholder = 'Enter mod ID';
		input.className = 'mod-input';
		return input;
	};

	// .input-container > button.add-button
	const createButton = () => {
		const button = document.createElement('button');
		button.textContent = 'Add Mod';
		button.className = 'add-button';
		return button;
	};

	const input = createInput();
	const button = createButton();
	const container = createContainer();

	const handleModIdSubmit = () => {
		const modId = Number.parseInt(input.value);
		if (!modId) return;

		onSubmit(modId);
		input.value = '';
	};

	// Add event listeners
	input.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			handleModIdSubmit();
		}
	});
	button.onclick = handleModIdSubmit;

	// Append elements
	container.appendChild(input);
	container.appendChild(button);

	return container;
}
