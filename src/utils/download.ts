import { ReleaseType, modFiles } from '../curseforge';
import { loader, version, downloadFailed } from '../state';

async function getModDownloadUrl(modId: number): Promise<string | undefined> {
	const files = await modFiles(
		modId,
		version.value,
		loader.value,
		ReleaseType.RELEASE,
	);

	// Only return URL if files exist and downloadUrl is not null/undefined
	if (files.length > 0 && files[0]?.downloadUrl) {
		return files[0].downloadUrl;
	}
	return undefined;
}

export async function download(modIds: number[]) {
	downloadFailed.value = new Set();
	return new Promise<void>((resolve, reject) => {
		if (modIds.length === 0) {
			alert('No mods to download');
			resolve();
			return;
		}

		Promise.all(
			modIds.map(async (modId) => {
				try {
					const url = await getModDownloadUrl(modId);
					if (!url) {
						console.warn(`No compatible files found for mod ${modId}`);
						const failedSet = downloadFailed.value;
						failedSet.add(modId);
						downloadFailed.value = failedSet;
					}
					return url;
				} catch (error) {
					console.error(`Failed to get download URL for mod ${modId}:`, error);
					const failedSet = downloadFailed.value;
					failedSet.add(modId);
					downloadFailed.value = failedSet;
					return undefined;
				}
			}),
		)
			.then((downloadUrls) => {
				const validUrls = downloadUrls.filter(
					(url): url is string => typeof url === 'string' && url.length > 0,
				);

				if (validUrls.length === 0) {
					alert('No valid download URLs found');
					resolve();
					return;
				}

				for (const url of validUrls) {
					if (url.includes('null')) {
						console.warn('Skipping invalid URL:', url);
						continue;
					}
					window.open(url, '_blank');
				}
				resolve();
			})
			.catch((error) => {
				console.error('Failed to download mods:', error);
				alert('Failed to download mods. Check console for details.');
				reject(error);
			});
	});
}
