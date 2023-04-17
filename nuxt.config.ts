import postcssNormalize from 'postcss-normalize'
import {fileURLToPath} from "url";
// https://nuxt.com/docs/api/configuration/nuxt-config
const getScssAdditionalData = (names: string[]) => {
	return names.reduce((acc, name) => {
		return  `${acc}\n@import "@/assets/scss/${name}";`
	},'')
}
const getPath = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url))

export default defineNuxtConfig({
	css: ["@/assets/scss/main.scss", "sanitize.css"],
	vite: {
		css: {
			postcss: {
				plugins: [postcssNormalize()],
			},
			preprocessorOptions: {
				scss: {
					additionalData: getScssAdditionalData(["_variables.scss", "_mixins.scss",
						"_layout.scss", "_utils.scss"])
				}
			}
		}
	},
	srcDir: "./src",
	alias: {
		components: getPath('components'),
		pages: getPath('pages'),
		utils: getPath('utils'),
	},
	dir: {
		assets: getPath('assets'),
		pages: getPath('pages'),
		plugins: getPath('plugins'),
		middleware: getPath('middleware')
	}
})
