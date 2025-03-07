import { ReleaseType, modFiles } from '../curseforge';
import { loader, version } from '../state';

async function getModDownloadUrl(modId: number): Promise<string | undefined> {
	const files = await modFiles(
		modId,
		version.value,
		loader.value,
		ReleaseType.RELEASE,
	);
	return files[0]?.downloadUrl;
}

export async function download(modIds: number[]) {
	return new Promise<void>((resolve, reject) => {
		if (modIds.length === 0) {
			alert('No mods to download');
			resolve();
			return;
		}

		Promise.all(
			modIds.map(async (modId) => {
				try {
					return await getModDownloadUrl(modId);
				} catch (error) {
					console.error(`Failed to get download URL for mod ${modId}:`, error);
					return undefined;
				}
			}),
		)
			.then((downloadUrls) => {
				const validUrls = downloadUrls.filter(
					(url): url is string => url !== undefined,
				);

				if (validUrls.length === 0) {
					alert('No valid download URLs found');
					resolve();
					return;
				}

				for (const url of validUrls) {
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
