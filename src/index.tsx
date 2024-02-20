import ReactDOM from "react-dom/client";
import { SearchForm } from "./features/search";
import { initAnalyticsFx } from "./features/analytics";

initAnalyticsFx();

const Application = () => {
  return (
    <>
      <SearchForm />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Application />);
