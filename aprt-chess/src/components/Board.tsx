
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useRef, DragEvent, useState } from "react";
import Piece from "./Piece";
import { PieceColor } from "../types/global";
import { validate } from "../utils/validate";
import { setBoardForWhite, setBoardForBlack } from "../utils/setInitialBoard";
import Peer, { DataConnection } from "peerjs";
import { useBoard } from "../contexts/BoardContext";
import { flipBoard } from "../utils/mathFunctions";
import PromotionToast from "./PromotionToast";

type Piece = string;

interface props {
  myPeer: Peer;
  reciverID: string;
  isCaller: boolean;
  currentPlayerColor: PieceColor;
}

export interface PromotionStats{
  set:boolean;
  xcord:number;
  ycord:number;
  color:"black"|"white"
}
const Board = ({ myPeer, reciverID, isCaller, currentPlayerColor }: props) => {
  const { boardState, setBoardState } = useBoard();
  const connectionRef = useRef<DataConnection | null>(null);
  const [promotionStats,setPromotionStats] = useState<PromotionStats>();
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);

  useEffect(() => {
    // listen for incoming data from caller
    if (!isCaller) {
      myPeer.on("connection", (conn: DataConnection) => {
        console.log("connection successful");
        connectionRef.current = conn;
        conn.on("data", (data: any) => {
          try {
            const parsedData = JSON.parse(data);
            if (parsedData?.type === "update_board") {
              const flip = flipBoard(parsedData.boardState);
              setBoardState(flip);
              setIsMyTurn(true)
            }
          } catch {
            console.warn("Error in JSON.parse");
          }
        });
        conn.on("open", () => {
          conn.send("host ready");
        });
      });
    }

    // if is caller is true send connection request to other peer
    else {
      let connection: DataConnection = myPeer.connect(reciverID);
      if (!connection) {
        console.log("connection could not be established");
        return;
      }
      connectionRef.current = connection;
      connection.on("open", () => {
        connection.send("caller ready");
        connection.on("data", (data: any) => {
          try {
            const parsedData = JSON.parse(data);
            if (parsedData?.type === "update_board") {
              const flip = flipBoard(parsedData.boardState);
              setBoardState(flip);
              setIsMyTurn(true);
            }
          } catch {
            console.warn("Error in JSON.parse");
          }
        });
      });
    }
  }, [myPeer, reciverID]);

  useEffect(() => {
    if (currentPlayerColor === "w") {
      setBoardForWhite(setBoardState);
      setIsMyTurn(true);
    } else {
      setBoardForBlack(setBoardState);
    }
  }, []);

  function updateBoard(fromX: number, fromY: number, toX: number, toY: number) {
    const updatedBoard: Piece[][] = [...boardState];
    updatedBoard[toY][toX] = updatedBoard[fromY][fromX];
    updatedBoard[fromY][fromX] = "";
    setBoardState(updatedBoard);
  }

  function onDropHandler(
    e: DragEvent<HTMLDivElement>,
    toX: number,
    toY: number
  ) {
    e.preventDefault();

    // extract initial position and piece name
    const initialCoords = e.dataTransfer.getData("text/plain");
    // eslint-disable-next-line prefer-const
    let [fromX, fromY, pieceName] = initialCoords
      .split("-")
      .map((item): number | string => item);
    fromX = +fromX;
    fromY = +fromY;

    const piece = pieceName.toString();
    console.log("from", fromX, fromY);
    console.log("to", toX, toY);

    // if move is valid update the board state & send it to other player
    if (
       isMyTurn &&
      validate(fromX, fromY, toX, toY, piece, currentPlayerColor, boardState)
    ) {
      console.log("piece:",piece)

      //handle pawn promotion if it happens
      if((piece==='wP'||piece==="bP")&& toY ===0)
      {
        setPromotionStats({
          set:true,
          color:piece==='wP'?"white":"black",
          xcord:toX,
          ycord:toY
        })
      }
      updateBoard(fromX, fromY, toX, toY);
      if (!connectionRef.current) {
        console.log("Disconnected!!");
        return;
      }
      // sending the updated board state to other player
      const updatedBoardMsg = {
        type: "update_board",
        boardState,
      };
      connectionRef.current.send(JSON.stringify(updatedBoardMsg));
      setIsMyTurn(false);
    }
  }

  const boardJSX = [];

  let image = undefined;
  // pushes the JSX for chessboard to board array
  for (let row = 0; row < boardState.length; row++) {
    for (let col = 0; col < boardState[0].length; col++) {
      // if i+j is even box is dark
      // else it is light
      const color = col + row;
      image = boardState[row][col];
      boardJSX.push(
        <div
          key={`${col}-${row}`}
          className={`inline-flex w-28 h-28 items-center justify-center select-none 
              x-coordinate-${col} y-coordinate-${row}  
              ${color % 2 === 0 ? "bg-slate-700" : "bg-gray-400"}`}
          onDrop={(e) => onDropHandler(e, col, row)}
          onDragOver={(e) => e.preventDefault()}
        >
          {image && (
            <Piece image={image} x_coordinate={col} y_coordinate={row}></Piece>
          )}
        </div>
      );
    }
  }

  return (
    <>
      <div className="flex justify-center">
        {promotionStats?.set &&<PromotionToast {...promotionStats}/>}
        <div className="grid grid-cols-8 grid-rows-8 gap-0 max-w-4xl">
          {boardJSX}
        </div>
      </div>
    </>
  );
};

export default Board;
