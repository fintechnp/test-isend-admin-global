import path from "path";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";
import filterReplace from "vite-plugin-filter-replace";

import jsconfigPaths from "vite-jsconfig-paths";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

import rollupNodePolyFill from "rollup-plugin-node-polyfills";

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
        test: {
            globals: true,
            environment: "jsdom",
            setupFiles: "./src/tests/setup.js",
        },
        envPrefix: "REACT_APP",
        define: {
            ...(process.env.NODE_ENV === "production"
                ? {}
                : {
                      module: undefined,
                  }),
        },
        server: {
            open: true,
            port: 3001,
            host: true,
        },
        resolve: {
            // alias: [
            //     {
            //         find: "./util/isHotReloading",
            //         replacement: path.resolve(__dirname, "./src/isHotReloading.js"),
            //     },
            //     {
            //         find: "./util/isHotReloading",
            //         replacement: fileURLToPath(new URL("./src/isHotReloading.js", import.meta.url)),
            //     },
            // ],
            alias: {
                "redux-form": "redux-form/dist/redux-form",
                // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
                // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
                // process and buffer are excluded because already managed
                // by node-globals-polyfill
                util: "rollup-plugin-node-polyfills/polyfills/util",
                sys: "util",
                events: "rollup-plugin-node-polyfills/polyfills/events",
                stream: "rollup-plugin-node-polyfills/polyfills/stream",
                path: "rollup-plugin-node-polyfills/polyfills/path",
                querystring: "rollup-plugin-node-polyfills/polyfills/qs",
                punycode: "rollup-plugin-node-polyfills/polyfills/punycode",
                url: "rollup-plugin-node-polyfills/polyfills/url",
                string_decoder: "rollup-plugin-node-polyfills/polyfills/string-decoder",
                http: "rollup-plugin-node-polyfills/polyfills/http",
                https: "rollup-plugin-node-polyfills/polyfills/http",
                os: "rollup-plugin-node-polyfills/polyfills/os",
                assert: "rollup-plugin-node-polyfills/polyfills/assert",
                constants: "rollup-plugin-node-polyfills/polyfills/constants",
                _stream_duplex: "rollup-plugin-node-polyfills/polyfills/readable-stream/duplex",
                _stream_passthrough: "rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough",
                _stream_readable: "rollup-plugin-node-polyfills/polyfills/readable-stream/readable",
                _stream_writable: "rollup-plugin-node-polyfills/polyfills/readable-stream/writable",
                _stream_transform: "rollup-plugin-node-polyfills/polyfills/readable-stream/transform",
                timers: "rollup-plugin-node-polyfills/polyfills/timers",
                console: "rollup-plugin-node-polyfills/polyfills/console",
                vm: "rollup-plugin-node-polyfills/polyfills/vm",
                zlib: "rollup-plugin-node-polyfills/polyfills/zlib",
                tty: "rollup-plugin-node-polyfills/polyfills/tty",
                domain: "rollup-plugin-node-polyfills/polyfills/domain",
                buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
                process: "rollup-plugin-node-polyfills/polyfills/process-es6",
            },
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
        build: {
            rollupOptions: {
                plugins: [rollupNodePolyFill()],
            },
        },
    };
});
