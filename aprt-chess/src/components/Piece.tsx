import { DragEvent } from "react";

interface props {
  image: string;
  x_coordinate: number;
  y_coordinate: number;
}

function Piece({ image, x_coordinate, y_coordinate }: props) {
  
  function handleDrag(e: DragEvent<HTMLImageElement>) {
    // extracting the piece name(eg wK) from image url
    const pathString = image.split("/");
    const imageString = pathString[pathString.length - 1];
    const pieceName = imageString.split(".")[0];

    // setting drag data to retirve later in onDropHandler function
    e.dataTransfer.setData(
      "text/plain",
      `${x_coordinate}-${y_coordinate}-${pieceName}`
    );
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
