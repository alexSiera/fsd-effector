import { createEffect, sample } from "effector";
import { searchChanged } from "../../search/model/search";
import { initAnalytics, sendEvent } from "../../analytics/lib";
import { AnalyticsEventTypes } from "../../../shared/types/analytics";
import { SearchFormGate } from "./search";

searchChanged.watch((search) => {
  const userSearchStartedEvent = {
    name: AnalyticsEventTypes.SEARCH_STARTED,
    payload: { search },
  };
  sendEventFx(userSearchStartedEvent);
});

/** Events */
/** Effects */
const initAnalyticFx = createEffect(initAnalytics);
const sendEventFx = createEffect(sendEvent);

/** Stores */

/** Logic */
sample({
  clock: SearchFormGate.open,
  target: initAnalyticFx,
});
