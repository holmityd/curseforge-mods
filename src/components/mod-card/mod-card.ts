import type { ModDetails } from '../../curseforge';
import { download } from '../../utils/download';
import { downloadFailed } from '../../state';
import './mod-card.css';

interface ModCardProps {
	details: ModDetails;
}

export function ModCardComponent({ details: { data } }: ModCardProps) {
	const createLogoSection = () => {
		const link = document.createElement('a');
		const logo = document.createElement('img');

		link.href = data.links.websiteUrl;
		link.target = '_blank';
		link.className = 'mod-logo-link';

		logo.src = data.logo.thumbnailUrl;
		logo.className = 'mod-logo';

		link.appendChild(logo);
		return link;
	};

	const createNameLink = () => {
		const link = document.createElement('a');
		link.href = data.links.websiteUrl;
		link.textContent = data.name;
		link.target = '_blank';
		link.className = 'mod-name';
		return link;
	};

	const createVersionInfo = () => {
		const version = document.createElement('div');
		const file = data.latestFiles.find(
			(file) =>
				file.gameVersions.includes('1.20.1') &&
				file.gameVersions.includes('Fabric'),
		);
		version.textContent = `Latest Version: ${file?.fileName || 'N/A'}`;
		version.className = 'mod-version';
		return version;
	};

	const createUpdateInfo = () => {
		const update = document.createElement('div');
		const updateDate = new Date(data.dateModified).toLocaleDateString();
		update.textContent = `Last Updated: ${updateDate}`;
		update.className = 'mod-update';
		return update;
	};

	const createDownloadButton = () => {
		const button = document.createElement('button');
		button.className = 'mod-download';
		button.innerHTML = /* HTML */ `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3V16M12 16L7 11M12 16L17 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M3 20H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
		button.onclick = async () => {
			try {
				await download([data.id]);
			} catch (error) {
				console.error('Failed to download mod:', error);
			}
		};
		return button;
	};

	const container = document.createElement('div');
	container.className = 'mod-container';

	downloadFailed.subscribe((ids) =>
		container.classList.toggle('failed', ids.has(data.id)),
	);

	container.append(
		createLogoSection(),
		createNameLink(),
		createVersionInfo(),
		createUpdateInfo(),
		createDownloadButton(),
	);

	return container;
}
