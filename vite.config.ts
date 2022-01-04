import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import userPluginImporter from 'vite-plugin-importer'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [ 
    userPluginImporter({
      "libraryName": "tezign-ui",
        "libraryDirectory": "lib",
         "style": "module.css" // `style: "css"` 会加载 css 文件
    }),
    react(),
     tsconfigPaths()],
     css: {
       modules: {
         scopeBehaviour: 'global'
       }
     }
});
