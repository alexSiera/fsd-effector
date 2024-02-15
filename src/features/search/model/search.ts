import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";

/** Gates */
export const SearchFormGate = createGate();

/** Events */
export const searchChanged = createEvent<string>();
export const searchButtonClicked = createEvent();
export const searchReset = createEvent();

/** Effects */
const startSearchFx = createEffect<string, void, Error>({
  handler: (search: string) => {
    console.log("Поиск начался", search);
  },
});

/** Stores */
// Трики момент если newSearch === undefined то его нельзя положить в стор !!!
// Нужно для отстутсвия значения в сторе использовать null,
// если будет undefined то обновление стора не пройдет !!!
export const $search = createStore("");
$search
  .on(searchChanged, (_oldSearch, newSearch) => newSearch)
  .reset(searchReset);

/** Logic */
sample({
  // Когда сделать событие
  clock: searchButtonClicked,
  // Какие данные использовать
  source: $search,
  // Что вызывать (куда передавать данные)
  target: startSearchFx,
});

// sample({
//   source: searchButtonClicked,
//   target: startSearchFx,
// });

sample({
  source: startSearchFx,
  to: searchReset,
});
