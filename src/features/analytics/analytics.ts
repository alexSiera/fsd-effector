import { createDomain, sample } from "effector";
import { AnalyticsEvent } from "../../shared/types/analytics";
import { initAnalytics, sendEvent } from "./lib";

const analyticsDomain = createDomain();

const initAnalyticsFx = analyticsDomain.createEffect(initAnalytics);
const sendEventFx = analyticsDomain.createEffect(sendEvent);
const sendManyEventsFx = analyticsDomain.createEffect(
  (events: AnalyticsEvent[]) => {
    const promiseEvents = Promise.all(events.map(sendEventFx));
    // Мой approach
    // delayedEventsSent();
    return promiseEvents;
  }
);

const sendDataToAnalytics = analyticsDomain.createEvent<AnalyticsEvent>();
const sendEventToQueue = analyticsDomain.createEvent<AnalyticsEvent>();
const delayedEventsSent = analyticsDomain.createEvent();

const $inited = analyticsDomain
  .createStore(false)
  .on(initAnalyticsFx.done, () => true);

const $notInited = $inited.map((inited) => !inited);

const $delayedEvents = analyticsDomain
  .createStore<AnalyticsEvent[]>([])
  .on(sendEventToQueue, (events, newEvent) => {
    return [...events, newEvent];
  })
  .reset(delayedEventsSent);

sample({
  source: sendDataToAnalytics,
  filter: $inited,
  target: sendEventFx,
});

sample({
  source: sendDataToAnalytics,
  filter: $notInited,
  target: sendEventToQueue,
});

sample({
  clock: initAnalyticsFx.done,
  source: $delayedEvents,
  target: [sendManyEventsFx, delayedEventsSent],
});

export { analyticsDomain, sendDataToAnalytics, initAnalyticsFx, sendEventFx };

export function empty() {}
