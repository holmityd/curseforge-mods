import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
    build: {
        modulePreload: false,
        outDir: 'docs'
    },
    plugins: [viteSingleFile({ removeViteModuleLoader: true })],
});
