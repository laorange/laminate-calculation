import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {NaiveUiResolver, VantResolver} from "unplugin-vue-components/resolvers";
import {viteSingleFile} from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        AutoImport({
            resolvers: [NaiveUiResolver(), VantResolver()],
        }),
        Components({
            resolvers: [NaiveUiResolver(), VantResolver()],
        }),
        vue(),
        viteSingleFile(),
    ],
    server: {
        port: 51717,
        strictPort: true,
        watch: {
            // 3. tell vite to ignore watching `src-tauri`
            ignored: ["**/src-tauri/**"],
        },
    },
});
