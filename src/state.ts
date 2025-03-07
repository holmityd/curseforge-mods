import { Loader } from './curseforge';
import { observer } from './utils';

export const count = observer(0);
export const loader = observer(Loader.FABRIC);
export const version = observer('1.20.1');
export const downloadFailed = observer(new Set<number>());
