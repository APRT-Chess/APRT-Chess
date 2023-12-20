import "./assets/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Board from "./components/Board";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/board" element={<Board/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
