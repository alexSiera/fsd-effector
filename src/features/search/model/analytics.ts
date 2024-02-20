import { sample } from "effector";
import {
  $search,
  searchButtonClicked,
  searchChanged,
} from "../../search/model/search";
import { AnalyticsEventTypes } from "../../../shared/types/analytics";
import { SearchFormGate } from "./search";
import { userFormOpenEvent } from "../../../shared/consts/events";
import { sendDataToAnalytics } from "../../analytics";

sample({
  source: SearchFormGate.open,
  fn: () => {
    return userFormOpenEvent;
  },
  to: sendDataToAnalytics,
});

// Можно так но это плохой вариант !!!
// SearchFormGate.open.watch(() => {
//   sendEvent(userFormOpenEvent);
// });

sample({
  source: searchChanged,
  fn: (search) => {
    const userSearchStartedEvent = {
      name: AnalyticsEventTypes.SEARCH_STARTED,
      payload: { search },
    };

    return userSearchStartedEvent;
  },
  target: sendDataToAnalytics,
});

// Можно и так но сверху лучший варианты
// searchChanged.watch((search) => {
//   const userSearchStartedEvent = {
//     name: AnalyticsEventTypes.SEARCH_STARTED,
//     payload: { search },
//   };
//   sendEventFx(userSearchStartedEvent);
// });

sample({
  clock: searchButtonClicked,
  source: $search,
  fn: (search) => {
    return {
      name: AnalyticsEventTypes.SEARCH_STARTED,
      payload: {
        search,
      },
    };
  },
  target: sendDataToAnalytics,
});

// Сверху вариант лучше
// searchButtonClicked.watch(() => sendEvent(searchButtonClickedEvent));
