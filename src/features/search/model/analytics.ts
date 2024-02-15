import { createEffect } from "effector";
import { searchButtonClicked, searchChanged } from "../../search/model/search";
import { initAnalytics, sendEvent } from "../../analytics/lib";
import { AnalyticsEventTypes } from "../../../shared/types/analytics";
import { SearchFormGate } from "./search";
import {
  searchButtonClickedEvent,
  userFormOpenEvent,
} from "../../../shared/consts/events";

SearchFormGate.open.watch(() => {
  sendEvent(userFormOpenEvent);
});

searchChanged.watch((search) => {
  const userSearchStartedEvent = {
    name: AnalyticsEventTypes.SEARCH_STARTED,
    payload: { search },
  };
  sendEventFx(userSearchStartedEvent);
});

searchButtonClicked.watch(() => sendEvent(searchButtonClickedEvent));

/** Events */
/** Effects */
const initAnalyticFx = createEffect(initAnalytics);
const sendEventFx = createEffect(sendEvent);

/** Stores */

/** Logic */
// sample({
//   clock: SearchFormGate.open,
//   target: initAnalyticFx,
// });
