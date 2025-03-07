import './action-buttons.css';
import { count } from '../../state';

interface ActionButtonsProps {
	onDownloadAll: (setLoading: (loading: boolean) => void) => Promise<void>;
	onClearAll: () => void;
}

export function ActionButtonsComponent({
	onDownloadAll,
	onClearAll,
}: ActionButtonsProps) {
	const createDownloadButton = () => {
		const button = document.createElement('button');
		button.textContent = 'Download All';
		button.className = 'action-button download';

		button.onclick = async () => {
			const setLoading = (loading: boolean) => {
				button.disabled = loading;
				button.textContent = loading ? 'Downloading...' : 'Download All';
			};
			await onDownloadAll(setLoading);
		};

		return button;
	};

	const createClearButton = () => {
		const button = document.createElement('button');
		button.textContent = 'Clear All';
		button.className = 'action-button clear';
		button.onclick = onClearAll;

		return button;
	};

	const setupButtonStates = (
		downloadButton: HTMLButtonElement,
		clearButton: HTMLButtonElement,
	) => {
		count.subscribe((value) => {
			downloadButton.disabled = value === 0;
			clearButton.disabled = value === 0;
		});
	};

	const container = document.createElement('div');
	container.className = 'action-buttons';

	const downloadButton = createDownloadButton();
	const clearButton = createClearButton();

	setupButtonStates(downloadButton, clearButton);
	container.append(downloadButton, clearButton);

	return container;
}
