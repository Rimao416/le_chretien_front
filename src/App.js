import "./main.scss";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/inscription" element={<Register />} />
      <Route path="/connexion" element={<Login />} />
      <Route path="/" element={<Home />} />
    
    </Routes>
  );
}

export default App;
