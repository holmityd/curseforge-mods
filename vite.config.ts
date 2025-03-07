import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	base: '/curseforge-mods/',
	build: {
		modulePreload: false,
		outDir: 'docs',
	},
	plugins: [
		viteSingleFile({ removeViteModuleLoader: true }),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'CurseForge Mods Manager',
				short_name: 'CF Mods',
				description:
					'A tool to manage and download Minecraft mods from CurseForge',
				theme_color: '#171717',
				background_color: '#171717',
				display: 'standalone',
				id: '/curseforge-mods/',
				start_url: '/curseforge-mods/',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
				categories: ['utilities', 'games'],
				orientation: 'any',
			},
		}),
	],
});
