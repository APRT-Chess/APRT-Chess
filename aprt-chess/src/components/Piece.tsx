import * as React from "react";

interface props {
  image: string;
  x_coordinate: number;
  y_coordinate: number;
  // boardState: string[][];
}

function Piece({ image, x_coordinate, y_coordinate }: props) {

  function handleDrag(e: React.DragEvent<HTMLImageElement>) {
    let pathString = image.split("/");
    let imageString = pathString[pathString.length-1];
    let pieceName = imageString.split('.')[0];
    e.dataTransfer.setData("text/plain", `${x_coordinate}-${y_coordinate}-${pieceName}`);
  }

  return (
    <img
      src={image}
      alt="piece-img"
      className={`x-${x_coordinate} y-${y_coordinate} w-24 h-24 absolute`}
      draggable
      onDragStart={(e) => handleDrag(e)}
    />
  );
}

export default Piece;
