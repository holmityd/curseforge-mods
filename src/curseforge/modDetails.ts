const { VITE_CURSEFORGE_API_KEY } = import.meta.env;
export async function modDetails(projectId: number): Promise<ModDetails> {
	const url = `https://api.curseforge.com/v1/mods/${projectId}`;
	const modDetailsRequest = await fetch(url, {
		headers: {
			Accept: 'application/json',
			'x-api-key': VITE_CURSEFORGE_API_KEY,
		},
	});
	return await modDetailsRequest.json();
}

interface Hash {
	value: string;
	algo: number;
}

interface GameVersion {
	gameVersionName: string;
	gameVersionPadded: string;
	gameVersion: string;
	gameVersionReleaseDate: string;
	gameVersionTypeId: number;
}

interface Dependency {
	modId: number;
	relationType: number;
}

interface Module {
	name: string;
	fingerprint: number;
}

interface LatestFile {
	id: number;
	gameId: number;
	modId: number;
	isAvailable: boolean;
	displayName: string;
	fileName: string;
	releaseType: number;
	fileStatus: number;
	hashes: Hash[];
	fileDate: string;
	fileLength: number;
	downloadCount: number;
	downloadUrl: string;
	gameVersions: string[];
	sortableGameVersions: GameVersion[];
	dependencies: Dependency[];
	alternateFileId: number;
	isServerPack: boolean;
	fileFingerprint: number;
	modules: Module[];
	fileSizeOnDisk?: number;
}

interface Category {
	id: number;
	gameId: number;
	name: string;
	slug: string;
	url: string;
	iconUrl: string;
	dateModified: string;
	isClass: boolean;
	classId: number;
	parentCategoryId: number;
}

interface Author {
	id: number;
	name: string;
	url: string;
	avatarUrl: string;
}

interface Logo {
	id: number;
	modId: number;
	title: string;
	description: string;
	thumbnailUrl: string;
	url: string;
}

interface Links {
	websiteUrl: string;
	wikiUrl: string | null;
	issuesUrl: string;
	sourceUrl: string;
}

interface LatestFilesIndex {
	gameVersion: string;
	fileId: number;
	filename: string;
	releaseType: number;
	gameVersionTypeId: number;
	modLoader: number;
}

interface DataType {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	screenshots: any[];
	id: number;
	gameId: number;
	name: string;
	slug: string;
	links: Links;
	summary: string;
	status: number;
	downloadCount: number;
	isFeatured: boolean;
	primaryCategoryId: number;
	categories: Category[];
	classId: number;
	authors: Author[];
	logo: Logo;
	mainFileId: number;
	latestFiles: LatestFile[];
	latestFilesIndexes: LatestFilesIndex[];
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	latestEarlyAccessFilesIndexes: any[];
	dateCreated: string;
	dateModified: string;
	dateReleased: string;
	allowModDistribution: boolean;
	gamePopularityRank: number;
	isAvailable: boolean;
	hasCommentsEnabled: boolean;
	thumbsUpCount: number;
}

export interface ModDetails {
	data: DataType;
}
