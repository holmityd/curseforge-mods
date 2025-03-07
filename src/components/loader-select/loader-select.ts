import { Loader } from '../../curseforge';
import type { Observer } from '../../utils';
import './loader-select.css';

interface LoaderSelectProps {
	loader: Observer<Loader>;
	version: Observer<string>;
}

export function LoaderSelectComponent({ loader, version }: LoaderSelectProps) {
	const createLoaderSelect = () => {
		const select = document.createElement('select');
		select.className = 'loader-select';

		for (const loaderType of Object.values(Loader)) {
			const option = document.createElement('option');
			option.value = loaderType;
			option.textContent =
				loaderType.charAt(0).toUpperCase() + loaderType.slice(1).toLowerCase();
			option.selected = loaderType === loader.value;
			select.appendChild(option);
		}

		select.addEventListener('change', (e) => {
			const target = e.target as HTMLSelectElement;
			loader.value = target.value as Loader;
		});

		return select;
	};

	const createVersionInput = () => {
		const input = document.createElement('input');
		input.type = 'text';
		input.className = 'version-input';
		input.value = version.value;
		input.placeholder = 'Game Version';

		input.addEventListener('change', (e) => {
			const target = e.target as HTMLInputElement;
			version.value = target.value;
		});

		return input;
	};

	const container = document.createElement('div');
	container.className = 'loader-select-container';
	container.append(createLoaderSelect(), createVersionInput());

	return container;
}
