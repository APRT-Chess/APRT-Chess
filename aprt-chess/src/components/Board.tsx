/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";
import { blackBishop, blackKing, blackKnight, blackPawn, blackQueen, blackRook, whiteBishop, whiteKing, whiteKnight, whitePawn, whiteQueen, whiteRook } from "../utils/ChessPieces";
import Piece from "./Piece";


type Piece = string

const Board = () => {

  const [boardState,setBoardState] = useState< Piece[][]>([]);


  function setBoard() {
    const pieces:Piece[][] = [
      [blackRook,blackKnight,blackBishop,blackQueen,blackKing,blackBishop,blackKnight,blackRook],
      [blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["","","","","","","",""],
      [whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn],
      [whiteRook,whiteKnight,whiteBishop,whiteKing,whiteQueen,whiteBishop,whiteKnight,whiteRook],
    ];
    setBoardState(pieces)
  }
  

  useEffect(()=>{
    setBoard();
  },[])
  const board = [];
 
      
      let image = undefined;

      for(let row = 0 ;row < boardState.length;row++)
      {
        for(let col = 0 ;col < boardState[0].length;col++)
        {
          let color = col + row;
          image = boardState[row][col]
          board.push(
            <div
              className={`inline-flex w-28 h-28 items-center justify-center select-none 
              x-coordinate-${row} y-coordinate-${col}  
              ${
                color % 2 === 0 ? "bg-slate-700" : "bg-gray-400"
              }`}
            onDrop = {(e)=>console.log("dropped:",e.target)}
            onDragOver={(e)=>e.preventDefault()}
            
            >
              {image && <Piece image={image} x_coordinate={row} y_coordinate={col} boardState = {boardState}></Piece>}
            </div>
          );
        }
      }

   
      
   
  return (
    <>
      <div className="grid grid-cols-8 grid-rows-8 gap-0 max-w-4xl" >
        {board}
      </div>
    </>
  );
};

export default Board;
