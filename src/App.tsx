import { useEffect } from "react";
import "./App.css";
import { getMovieByName } from "./api";

function App() {
  useEffect(() => {
    async function fetchData() {
      const data = await getMovieByName({ query: "отдых" });
      console.log(data);
    }
    fetchData();
  });
  return <div className="App"></div>;
}

export default App;
