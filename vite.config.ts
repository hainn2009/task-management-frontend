import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // checker({
        //     eslint: {
        //         lintCommand: "eslint .",
        //         useFlatConfig: true,
        //     },
        // }),
        checker({
            typescript: {
                tsconfigPath: "tsconfig.app.json",
            },
        }),
    ],
    server: {
        host: "0.0.0.0", // Listen on all network interfaces (important for Docker)
        port: 3000, // This should match the container port
        proxy: {
            "/api": "http://localhost:3001",
            // "/api": {
            //     target: "http://jsonplaceholder.typicode.com",
            //     changeOrigin: true,
            //     secure: false,
            // },
        },
    },
});
