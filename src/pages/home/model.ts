import { controls, routes } from "@/shared/routing"
import { swapiPeopleChain } from "@/entities/people"
import { swapiFilmsChain } from "@/entities/film"
import { swapiPlanetsChain } from "@/entities/planet"
import { createEvent, createStore } from "effector"
import { querySync } from "atomic-router"

export const currentRoute = routes.home

export const authRoute = swapiPeopleChain(currentRoute)
export const firstRoute = swapiFilmsChain(authRoute)
export const secondRoute = swapiPlanetsChain(authRoute)

export const searchChanged = createEvent<string>()

export const $search = createStore("").on(searchChanged, (_, value) => value)

querySync({
    route: currentRoute,
    controls,
    source: {
        search: $search,
    },
})
