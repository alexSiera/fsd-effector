import ReactDOM from "react-dom/client";
import { SearchForm } from "./features/search";

const Application = () => {
  return (
    <>
      <SearchForm />
    </>
  );
};
ReactDOM.createRoot(document.getElementById("root")!).render(<Application />);
