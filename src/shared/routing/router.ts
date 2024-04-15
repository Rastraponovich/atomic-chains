import { createHistoryRouter, createRouterControls } from "atomic-router"
import { createStore, sample } from "effector"
import { createBrowserHistory } from "history"

import { notFoundRoute, routesMap } from "./routes"
import { appStarted } from "@/shared/init"

export const controls = createRouterControls()

export const router = createHistoryRouter({
    controls,
    notFoundRoute,
    routes: routesMap,
})

const NavsMap = new Map([
    // ['/osmu', 'ОМСУ'],
    ["/", "Статистика"],
    ["/auth", "Авторизация"],
    ["/users", "Пользователи"],
    ["/administrators", "Администраторы"],
])

const $currentPage = router.$path.map((state) => state)
const $title = createStore("")

sample({
    clock: $currentPage,
    fn: (currentPage) => {
        let path = "Статистика"

        NavsMap.forEach((value, key) => {
            if (currentPage.includes(key)) {
                path = value
            }
        })

        window.document.title = path

        return currentPage
    },
    target: $title,
})

sample({
    clock: appStarted,
    fn: () => createBrowserHistory(),
    target: router.setHistory,
})
