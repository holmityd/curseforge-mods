const { VITE_CURSEFORGE_API_KEY } = import.meta.env;

export async function modFiles(
	projectId: number,
	gameVersion: string,
	loader: Loader,
	releaseType: ReleaseType,
): Promise<ModFiles> {
	const cfLoader = curseforgeLoaderFromLoader(loader);
	const url = `https://api.curseforge.com/v1/mods/${projectId}/files?gameVersion=${gameVersion}&modLoaderType=${cfLoader}`;

	const modFiles = await fetch(url, {
		headers: {
			Accept: 'application/json',
			'x-api-key': VITE_CURSEFORGE_API_KEY,
		},
	});
	const { data: files } = (await modFiles.json()) as GetFilesResponse;

	return files.filter((file) => file.releaseType <= releaseType);
}

function curseforgeLoaderFromLoader(loader: Loader) {
	switch (loader) {
		case Loader.CAULDRON:
			return CurseforgeLoader.CAULDRON;
		case Loader.FORGE:
			return CurseforgeLoader.FORGE;
		case Loader.FABRIC:
			return CurseforgeLoader.FABRIC;
		case Loader.QUILT:
			return CurseforgeLoader.QUILT;
		case Loader.NEOFORGE:
			return CurseforgeLoader.NEOFORGE;
		case Loader.LITELOADER:
			return CurseforgeLoader.LITELOADER;
		default:
			throw new Error(loader);
	}
}

export enum Loader {
	BUKKIT = 'bukkit',
	BUNGEECORD = 'bungeecord',
	CAULDRON = 'cauldron',
	DATAPACK = 'datapack',
	FABRIC = 'fabric',
	FOLIA = 'folia',
	FORGE = 'forge',
	LITELOADER = 'liteloader',
	MODLOADER = 'modloader',
	NEOFORGE = 'neoforge',
	PAPER = 'paper',
	PURPUR = 'purpur',
	QUILT = 'quilt',
	RIFT = 'rift',
	SPIGOT = 'spigot',
	SPONGE = 'sponge',
	VELOCITY = 'velocity',
	WATERFALL = 'waterfall',
}

export enum CurseforgeLoader {
	ANY = 0,
	FORGE = 1,
	CAULDRON = 2,
	LITELOADER = 3,
	FABRIC = 4,
	QUILT = 5,
	NEOFORGE = 6,
}

export enum ReleaseType {
	RELEASE = 1,
	BETA = 2,
	ALPHA = 3,
}

interface Hash {
	value: string;
	algo: 1 | 2;
}

interface SortableGameVersion {
	gameVersionName: string;
	gameVersionPadded: string;
	gameVersion: string;
	gameVersionReleaseDate: string;
	gameVersionTypeId: number;
}

interface Module {
	name: string;
	fingerprint: number;
}

interface Dependency {
	modId: number;
	relationType: number;
}

interface ModFile {
	id: number;
	gameId: number;
	modId: number;
	isAvailable: boolean;
	displayName: string;
	fileName: string;
	releaseType: number;
	fileStatus: 4;
	hashes: Hash[];
	fileDate: string;
	fileLength: number;
	downloadCount: number;
	fileSizeOnDisk?: number;
	downloadUrl: string;
	gameVersions: string[];
	sortableGameVersions: SortableGameVersion[];
	dependencies: Dependency[];
	alternateFileId: 0;
	isServerPack: false;
	fileFingerprint: number;
	modules: Module[];
}

export type ModFiles = ModFile[];

interface GetFilesResponse {
	data: ModFiles;
}
