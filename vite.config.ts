import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
    },

    plugins: [
        react({
            babel: {
                babelrc: true,
                plugins: [
                    [
                        "effector/babel-plugin",
                        {
                            addLoc: true,
                            debugSids: true,
                            factories: ["patronum"],
                        },
                    ],
                ],
            },
        }),
    ],

    resolve: {
        alias: {
            "@/*": "/src",
            "@/app": "/src/app",
            "@/pages": "/src/pages",
            "@/layouts": "/src/layouts",
            "@/widgets": "/src/widgets",
            "@/features": "/src/features",
            "@/entities": "/src/entities",
            "@/shared": "/src/shared",
        },
    },
})
