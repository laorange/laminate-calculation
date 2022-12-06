import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver, VantResolver} from 'unplugin-vue-components/resolvers'

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
    ]
})
