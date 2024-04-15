import type { RouteRecord } from "atomic-router-react"
import { createRoutesView } from "atomic-router-react"

const pages = import.meta.glob<
    true,
    string,
    { default: RouteRecord<object, object> }
>("./**/index.ts", { eager: true })

const routes = Object.values(pages).reduce((acc, page) => {
    acc.push(page.default)
    return acc
}, [] as RouteRecord<object, object>[])

export const RoutesView = createRoutesView({ routes })
