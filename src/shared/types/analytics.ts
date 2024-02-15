export enum AnalyticsEventTypes {
  SEARCH_STARTED = "seacrh_started",
  FORM_SHOWN = "form_shown",
  SEARCH_BUTTON_CLICKED = "search_button_clicked",
}

export type AnalyticsEvent = {
  name: AnalyticsEventTypes;
  payload: Record<string, string | number>;
};
