import { useGate, useUnit } from "effector-react";
import {
  $searchStore,
  SearchFormGate,
  searchEvent,
  submitForm,
} from "../model/search";

export const useSearchModel = () => {
  useGate(SearchFormGate);

  const model = useUnit({
    search: $searchStore,
    handleSearch: searchEvent,
    handleSubmitForm: submitForm,
  });

  return model;
};
