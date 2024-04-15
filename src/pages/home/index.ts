import { createRouteView } from "atomic-router-react"

import { authRoute, currentRoute } from "./model"
import { Page } from "./page"

const StatisticPage = createRouteView({
    view: Page,
    route: authRoute,
})

const page = {
    view: StatisticPage,
    route: currentRoute,
}

export default page
