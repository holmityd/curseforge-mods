// Imports
import {
	ActionButtonsComponent,
	HeaderComponent,
	LoaderSelectComponent,
	ModCardComponent,
	ModsCountComponent,
	SearchComponent,
} from './components';
import { modDetails } from './curseforge';
import { count, loader, version } from './state';
import './style.css';
import { download } from './utils';

// Types
interface AppState {
	renderedMods: Set<number>;
	container: HTMLDivElement;
}

// State
const state: AppState = {
	renderedMods: new Set(),
	container: document.querySelector('#app') as HTMLDivElement,
};

async function addModInfo(modId: number) {
	if (state.renderedMods.has(modId)) return;
	state.renderedMods.add(modId);

	const details = await modDetails(modId);
	state.container.appendChild(ModCardComponent({ details }));

	const dependencies = details.data.latestFiles[0]?.dependencies || [];
	count.value++;
	await handleModDependencies(dependencies);
}

async function handleModDependencies(dependencies: Array<{ modId: number }>) {
	const promises = dependencies.map(({ modId }) => addModInfo(modId));
	await Promise.all(promises);
}

async function onDownloadAll(setLoading: (loading: boolean) => void) {
	setLoading(true);
	download(Array.from(state.renderedMods)).then(() => setLoading(false));
}

function onClearAll() {
	state.container.innerHTML = '';
	state.renderedMods.clear();
	count.value = 0;
}

// App Initialization
async function initializeApp() {
	const modsCount = ModsCountComponent({ count });
	const searchComponent = SearchComponent({ onSubmit: addModInfo });
	const loaderSelect = LoaderSelectComponent({ loader, version });
	const actionButtons = ActionButtonsComponent({ onDownloadAll, onClearAll });
	const headerComponent = HeaderComponent({
		children: [modsCount, searchComponent, loaderSelect, actionButtons],
	});
	document.body.insertBefore(headerComponent, state.container);

	addModInfo(983756);
	addModInfo(890301);
}

initializeApp();
