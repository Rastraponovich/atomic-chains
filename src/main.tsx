import "./app/styles.css"
import { RouterProvider } from "atomic-router-react"
import { allSettled, fork } from "effector"
import { Provider } from "effector-react"
import { createRoot } from "react-dom/client"

import { Application } from "./app/application"
import { appStarted } from "@/shared/init"
import { router } from "@/shared/routing"

const scope = fork()
allSettled(appStarted, { scope }).catch(() => console.warn("совсем все плохо"))

const root = document.querySelector("#root")!
createRoot(root).render(
    <Provider value={scope}>
        <RouterProvider router={router}>
            <Application />
        </RouterProvider>
    </Provider>
)
