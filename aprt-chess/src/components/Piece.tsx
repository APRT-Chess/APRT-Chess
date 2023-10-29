interface props {
  image: string;
  x_coordinate:number;
  y_coordinate:number;
  boardState:any
}

function Piece({ image,x_coordinate,y_coordinate,boardState }: props) {
  console.log(x_coordinate,y_coordinate,boardState[x_coordinate][y_coordinate]);
  return (
    <>
      <img src={image} alt='piece-img' className={`x-${x_coordinate} y-${y_coordinate} w-24 h-24 absolute`} draggable onDrag={()=>{
        console.log("dragging",image)
      }}></img>
    </>
  );
}

export default Piece;
