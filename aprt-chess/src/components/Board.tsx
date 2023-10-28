/* eslint-disable @typescript-eslint/no-unused-vars */

import Piece from "./Piece";

interface props {
  verticalBox: string[];
  horizontalBox: string[];
}

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];

function setBoard() {
  const path = "/public/pieces/";
  //  setting up pawns in loop
  for (let i = 0; i < 8; i++)
    pieces.push({ image: `${path}wP.svg`, x: i, y: 1 });
  for (let i = 0; i < 8; i++)
    pieces.push({ image: `${path}bP.svg`, x: i, y: 6 });
  //  other pieces from left to right
  pieces.push({ image: `${path}wR.svg`, x: 7, y: 0 });
  pieces.push({ image: `${path}bR.svg`, x: 7, y: 7 });
  pieces.push({ image: `${path}wN.svg`, x: 6, y: 0 });
  pieces.push({ image: `${path}bN.svg`, x: 6, y: 7 });
  pieces.push({ image: `${path}wB.svg`, x: 5, y: 0 });
  pieces.push({ image: `${path}bB.svg`, x: 5, y: 7 });
  pieces.push({ image: `${path}wQ.svg`, x: 4, y: 0 });
  pieces.push({ image: `${path}bQ.svg`, x: 4, y: 7 });
  pieces.push({ image: `${path}wK.svg`, x: 3, y: 0 });
  pieces.push({ image: `${path}bK.svg`, x: 3, y: 7 });
  pieces.push({ image: `${path}wB.svg`, x: 2, y: 0 });
  pieces.push({ image: `${path}bB.svg`, x: 2, y: 7 });
  pieces.push({ image: `${path}wN.svg`, x: 1, y: 0 });
  pieces.push({ image: `${path}bN.svg`, x: 1, y: 7 });
  pieces.push({ image: `${path}wR.svg`, x: 0, y: 0 });
  pieces.push({ image: `${path}bR.svg`, x: 0, y: 7 });
}
setBoard();

const Board = ({ verticalBox, horizontalBox }: props) => {
  const board = [];
  for (let i = 0; i < verticalBox.length; i++) {
    for (let j = horizontalBox.length - 1; j >= 0; j--) {
      // if i+j is even box is dark
      // else it is light
      const color = i + j;
      let image = undefined;
      pieces.forEach((p) => {
        if (p.x === j && p.y === i) image = p.image;
      });
      board.push(
        <div
          className={`inline-flex w-28 h-28 items-center justify-center select-none ${
            color % 2 === 0 ? "bg-slate-700" : "bg-gray-400"
          }`}
        >
          {image && <Piece image={image}></Piece>}
        </div>
      );
    }
  }
  return (
    <>
      <div className="grid grid-cols-8 grid-rows-8 gap-0 max-w-4xl">
        {board}
      </div>
    </>
  );
};

export default Board;
