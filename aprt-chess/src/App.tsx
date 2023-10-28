import "./assets/App.css";
import Board from "./components/Board";

function App() {
  const verticalBox = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const horizontalBox = ["a", "b", "c", "d", "e", "f", "g", "h"];

  return (
    <>
      <Board verticalBox={verticalBox} horizontalBox={horizontalBox} />
    </>
  );
}

export default App;
