import { defineConfig } from "vite";
import path, { resolve } from "path";
import glob from "fast-glob";

const enableModules = false; // Toggle this to true or false
const getModuleEntries = () => {
	const files = glob.sync("sources/js/modules/**/*.js");
	const entries = {};

	files.forEach((file) => {
		const name = path
			.relative("sources/js", file)
			.replace(/\.js$/, "")
			.replace(/\\/g, "/");
		entries[name] = resolve(__dirname, file);
	});
	return entries;
};

export default defineConfig(() => {
	const isProduction = process.env.NODE_ENV === "production";

	return {
		base: "/",
		build: {
			outDir: "assets/",
			manifest: true,
			emptyOutDir: true,
			minify: isProduction,
			rollupOptions: {
				input: {
					app: resolve(__dirname, "sources/js/script.js"),
					style: resolve(__dirname, "sources/scss/style.scss"),
					...(enableModules ? getModuleEntries() : {}),
				},
				output: {
					entryFileNames: (chunkInfo) => {
						const id = chunkInfo.facadeModuleId || "";
						const relativePath = path
							.relative(resolve(__dirname, "sources/js"), id)
							.replace(/\\/g, "/");

						if (relativePath.startsWith("modules/")) {
							const name = path.basename(chunkInfo.name);
							return `js/modules/${name}.js`;
						}

						return isProduction
							? `js/${chunkInfo.name}.[hash].js`
							: `js/${chunkInfo.name}.js`;
					},
					assetFileNames: (assetInfo) => {
						const fileName = assetInfo.names[0];
						const ext = path.extname(fileName);
						const name = path.basename(fileName, ext);

						if (/\.(css|map)$/.test(fileName)) {
							return isProduction
								? `css/${name}.[hash]${ext}`
								: `css/${name}${ext}`;
						}
						if (/\.(png|jpe?g|gif|svg|webp)$/.test(fileName)) {
							return isProduction
								? `images/${name}.[hash]${ext}`
								: `images/${name}${ext}`;
						}
						if (/\.(woff2?|ttf|eot|otf)$/.test(fileName)) {
							return isProduction
								? `fonts/${name}.[hash]${ext}`
								: `fonts/${name}${ext}`;
						}
						return isProduction
							? `assets/${name}.[hash]${ext}`
							: `assets/${name}${ext}`;
					},
				},
			},
		},
		resolve: {
			alias: {
				"@scripts": resolve(__dirname, "sources/js"),
				"@style": resolve(__dirname, "sources/scss"),
				"@images": resolve(__dirname, "sources/images/"),
				"@fonts": resolve(__dirname, "sources/fonts"),
			},
		},
	};
});
