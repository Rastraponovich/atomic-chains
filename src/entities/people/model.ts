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

const peopleGetFx = createEffect(async () => {
    const request = await fetch("https://swapi.dev/api/people", {
        method: "GET",
    })

    return await request.json()
})

export function swapiPeopleChain<Params extends RouteParams>(
    route: RouteInstance<Params>,
    { otherwise }: ChainParams = {}
) {
    const preloadStarted = createEvent<RouteParamsAndQuery<Params>>()
    const preloadFinished = createEvent()

    const cancelOn = createEvent()

    sample({
        clock: preloadStarted,
        target: peopleGetFx,
    })

    sample({
        clock: peopleGetFx.done,
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
        openOn: [preloadFinished],
        cancelOn: [cancelOn],
        beforeOpen: preloadStarted,
    })
}
