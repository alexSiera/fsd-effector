import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { AnalyticsEventTypes } from "../../../shared/types/analytics";
import { initAnalytics, sendEvent } from "../../analytics/lib";

/** Gates */
export const SearchFormGate = createGate("SearchFormGate");

/** Events */
const resetSearchStore = createEvent();
export const submitForm = createEvent();
export const searchEvent = createEvent<string>();

/** Effects */
const initAnalyticFx = createEffect(initAnalytics);
const sendEventFx = createEffect(sendEvent);

/** Fabrics */

/** Stores */
export const $searchStore = createStore("");
$searchStore
  .on(searchEvent, (_, payload) => {
    return payload;
  })
  .reset(resetSearchStore);

/** Logic */
sample({
  source: SearchFormGate.open,
  target: initAnalyticFx,
});

sample({
  source: initAnalyticFx.doneData,
  fn: () => {
    const userFormOpenEvent = {
      name: AnalyticsEventTypes.FORM_SHOWN,
      payload: {},
    };

    return userFormOpenEvent;
  },
  target: sendEventFx,
});

sample({
  clock: submitForm,
  source: $searchStore,
  fn: (search) => {
    const userSearchStartedEvent = {
      name: AnalyticsEventTypes.SEARCH_STARTED,
      payload: { search },
    };

    return userSearchStartedEvent;
  },
  target: sendEventFx,
});

sample({
  clock: sendEventFx,
  target: resetSearchStore,
});
