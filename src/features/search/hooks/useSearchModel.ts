import { useUnit } from "effector-react";
import { $search, searchButtonClicked, searchChanged } from "../model/search";

export const useSearchModel = () => {
  const model = useUnit({
    search: $search,
    handleSearch: searchChanged,
    handleSubmitForm: searchButtonClicked,
  });

  return model;
};
