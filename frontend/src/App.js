import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Register from "./components/register";
import Details from "./components/details";
import Edit from "./components/edit";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/navlink" element={<Home />} />
        <Route path="/home/edit/:id" element={<Edit />} />
        <Route path="/home/view/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/view/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
