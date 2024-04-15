import { createRoute, type UnmappedRouteObject } from "atomic-router"

export const routes = {
    home: createRoute(),
}

export const notFoundRoute = createRoute()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const routesMap: UnmappedRouteObject<any>[] = [
    { path: "/", route: routes.home },
]
