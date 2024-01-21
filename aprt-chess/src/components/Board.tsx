import { useEffect, DragEvent, useState } from "react";
import Piece from "./Piece";
import { PieceColor } from "../types/global";
import { validate } from "../utils/validate";
import { setBoardForWhite, setBoardForBlack } from "../utils/setInitialBoard";
import { useBoard } from "../contexts/BoardContext";
import { socket } from "../utils/socket/socket";
import { flipBoard } from "../utils/mathFunctions";
import PromotionToast from "./PromotionToast";

type Piece = string;

interface props {
  currentPlayerColor: PieceColor;
  hostID: string | undefined;
}
export interface PromotionStats {
  set: boolean;
  xcord: number;
  ycord: number;
  color: "black" | "white";
}

const Board = ({ currentPlayerColor, hostID }: props) => {
  const { boardState, setBoardState, isConnected, setIsConnected } = useBoard();
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const [promotionStats, setPromotionStats] = useState<PromotionStats>();
  const [uuid, setUuid] = useState<string | null>("");

  useEffect(() => {
    if (currentPlayerColor === "w") {
      setBoardForWhite(setBoardState);
      setIsMyTurn(true);
    } else {
      setBoardForBlack(setBoardState);
    }

    setUuid(localStorage.getItem("uuid"));
  }, []);

  // useEFfect for handling socket connections
  useEffect(() => {
    function onConnect() {
      console.log("socket is connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("recieve-updated-board", (updatedBoard) => {
      const flippedBoard = flipBoard(updatedBoard);
      setBoardState(flippedBoard);
      setIsMyTurn(true);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
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
    // console.log("piece:", piece);
    console.log("to", toX, toY);

    console.log("piece:", piece);

    //handle pawn promotion if it happens
    if ((piece === "wP" || piece === "bP") && toY === 0) {
      setPromotionStats({
        set: true,
        color: piece === "wP" ? "white" : "black",
        xcord: toX,
        ycord: toY,
      });
    }
    // if move is valid update the board state
    if (
      isMyTurn &&
      validate(fromX, fromY, toX, toY, piece, currentPlayerColor, boardState)
    ) {
      updateBoard(fromX, fromY, toX, toY);
      console.log("hostid", hostID);

      socket.emit("update-board", { boardState, hostID });
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
        {promotionStats?.set && (
          <PromotionToast
            color={promotionStats.color}
            xcord={promotionStats.xcord}
            ycord={promotionStats.ycord}
          />
        )}
        <div className="grid grid-cols-8 grid-rows-8 gap-0 max-w-4xl">
          {boardJSX}
        </div>
      </div>
    </>
  );
};

export default Board;
