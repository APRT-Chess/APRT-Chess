/* eslint-disable @typescript-eslint/no-unused-vars */

interface props {
  verticalBox: string[];
  horizontalBox: string[];
}

const Board = ({ verticalBox, horizontalBox }: props) => {
  const  board = [];
  for (let i = 0; i < verticalBox.length; i++) {
    for (let j = horizontalBox.length - 1; j >= 0; j--) {
      const color = i + j;
      board.push(
        <div
          className={`inline-flex w-28 h-28 items-center justify-center ${
            color % 2 === 0 ? "bg-slate-700" : "bg-gray-400"
          }`}
        >
          {verticalBox[i]}
          {horizontalBox[j]}
        </div>
      );
    }
    board.push(<br></br>);
  }
  return (
    <>
      <div>borad</div>
      <div className="wrapper">{board}</div>
    </>
  );
};

export default Board;
