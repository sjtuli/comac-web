// vite.config.ts

import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from 'unocss/vite';

import { type ConfigEnv, type UserConfig, loadEnv } from 'vite';
import extractorSvelte from '@unocss/extractor-svelte';
import CompressionPlugin from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default function ({ command, mode }: ConfigEnv): UserConfig {
	return {
		server: {
			host: true,
			hmr: true,
		},
		resolve: {
			alias: {
				'@': '/src',
				'/@': '/src',
			},
		},
		plugins: [
			UnoCSS({
				extractors: [extractorSvelte()],
				configFile: 'uno.config.ts',
			}),
			sveltekit(),
			CompressionPlugin({
				algorithm: 'gzip', // 或 'brotli'
				ext: '.gz', // 压缩文件的扩展名
				threshold: 10240, // 文件大小大于等于 10KB 才会被压缩
			}),
			viteImagemin({
				gifsicle: {
					optimizationLevel: 7,
					interlaced: false,
				},
				optipng: {
					optimizationLevel: 7,
				},
				mozjpeg: {
					quality: 20,
				},
				pngquant: {
					quality: [0.8, 0.9],
					speed: 4,
				},
				svgo: {
					plugins: [
						{
							name: 'removeViewBox',
						},
						{
							name: 'removeEmptyAttrs',
							active: false,
						},
					],
				},
			}),
		],
		build: {
			minify: 'terser',
			terserOptions: {
				compress: {
					// 生产环境时移除console
					drop_console: true,
					drop_debugger: true,
				},
			},
			target: 'esnext',
		},
		css: {
			preprocessorOptions: {
				scss: {
					// 配置 nutui 全局 scss 变量
					additionalData: ``,
				},
			},
		},
	};
}
