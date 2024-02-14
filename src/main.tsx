/* eslint-disable react-refresh/only-export-components */
import ReactDOM from "react-dom/client";
import { SearchForm } from "./features/search";

const Application = () => (
  <>
    <SearchForm />
  </>
);

ReactDOM.createRoot(document.getElementById("root")!).render(<Application />);