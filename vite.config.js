import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import Components from "unplugin-vue-components/vite";

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
    plugins: [
        vue(),
        WindiCSS(),
        Components({
            dirs: ['src/components', 'src/components/layout'],
        })
    ],
});
