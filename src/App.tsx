import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";

const App = () => {
  useEffect(() => {
    const theme =
      localStorage.getItem("theme");

    if (theme === "dark") {
      document.documentElement.classList.add(
        "dark"
      );
    }
  }, []);

  return <Dashboard />;
};

export default App;