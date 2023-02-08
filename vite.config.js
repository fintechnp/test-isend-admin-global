import path from "path";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";
import filterReplace from "vite-plugin-filter-replace";

import jsconfigPaths from "vite-jsconfig-paths";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

// const isHotReloading = () => false;

export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return {
        plugins: [
            react(),
            svgrPlugin(),
            jsconfigPaths(),
            filterReplace([
                // {
                //   filter: ["node_modules/redux-form/es/createReduxForm.js"],
                //   replace(path, source) {
                //     return "";
                //   },
                // },
                // {
                //   filter: ["node_modules/redux-form/es/util/isHotReloading.js"],
                //   replace(path, source) {
                //     return isHotReloading;
                //   },
                // },
                // {
                //   filter: ["node_modules/redux-form/es/util/isHotReloading.js"],
                //   replace: {
                //     from: /module/g,
                //     to: undefined,
                //   },
                // },
            ]),
        ],
        envPrefix: "REACT_APP",
        define: {
            ...(process.env.NODE_ENV === "production"
                ? {}
                : {
                      module: undefined,
                  }),
            global: "globalThis",
        },
        server: {
            open: true,
            port: 3001,
            host: true,
        },
        resolve: {
            alias: [
                {
                    find: "./util/isHotReloading",
                    replacement: path.resolve(__dirname, "./src/isHotReloading.js"),
                },
                {
                    find: "./util/isHotReloading",
                    replacement: fileURLToPath(new URL("./src/isHotReloading.js", import.meta.url)),
                },
            ],
        },
        optimizeDeps: {
            esbuildOptions: {
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        process: true,
                        buffer: true,
                    }),
                    NodeModulesPolyfillPlugin(),
                ],
            },
        },
    };
});
