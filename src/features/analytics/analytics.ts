import { createDomain, sample } from "effector";
import { AnalyticsEvent } from "../../shared/types/analytics";
import { initAnalytics, sendEvent } from "./lib";

const analyticsDomain = createDomain();

const initAnalyticsFx = analyticsDomain.createEffect(initAnalytics);

const sendEventFx = analyticsDomain.createEffect(sendEvent);

const sendDataToAnalytics = analyticsDomain.createEvent<AnalyticsEvent>();

sample({
  source: sendDataToAnalytics,
  target: sendEventFx,
});

export { analyticsDomain, sendDataToAnalytics, initAnalyticsFx, sendEventFx };

export function empty() {}
