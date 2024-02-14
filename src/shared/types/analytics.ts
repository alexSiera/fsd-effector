export enum AnalyticsEventTypes {
  SEARCH_STARTED = "seacrh_started",
  FORM_SHOWN = "form_shown",
}

export type AnalyticsEvent = {
  name: AnalyticsEventTypes;
  payload: Record<string, string | number>;
};
