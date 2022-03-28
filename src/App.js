// css
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

function App() {
  const mode = useSelector((state) => state.changeMode);

  mode === "dark"
    ? (document.body.style.backgroundColor = "#202c37")
    : (document.body.style.backgroundColor = "#fafafa");

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
