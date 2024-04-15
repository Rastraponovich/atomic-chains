import {
    RouteParams,
    RouteInstance,
    RouteParamsAndQuery,
    chainRoute,
} from "atomic-router"
import { createEvent, sample, Effect, Event, createEffect } from "effector"

interface ChainParams {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    otherwise?: Event<void> | Effect<void, any, any>
}

const filmsGetFx = createEffect(async () => {
    const request = await fetch("https://swapi.dev/api/films", {
        method: "GET",
    })

    return await request.json()
})

export function swapiFilmsChain<Params extends RouteParams>(
    route: RouteInstance<Params>,
    { otherwise }: ChainParams = {}
) {
    const preloadStarted = createEvent<RouteParamsAndQuery<Params>>()
    const preloadFinished = createEvent()

    const cancelOn = createEvent()

    sample({
        clock: preloadStarted,
        target: filmsGetFx,
    })

    sample({
        clock: filmsGetFx.done,
        target: preloadFinished,
    })

    if (otherwise) {
        sample({
            clock: cancelOn,
            filter: route.$isOpened,
            target: otherwise as Effect<void, void>,
        })
    }

    return chainRoute({
        route,
        cancelOn: [cancelOn],
        openOn: [preloadFinished],
        beforeOpen: preloadStarted,
    })
}
