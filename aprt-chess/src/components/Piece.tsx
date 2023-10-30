import * as React from "react";

interface props {
  image: string;
  x_coordinate:number;
  y_coordinate:number;
  boardState:any
}

function Piece({ image,x_coordinate,y_coordinate,boardState }: props) {
  
 

  function handleDrag(){
    console.log("dragging",image,x_coordinate,y_coordinate)
  }
 
 
  return (
    
      <img src={image} 
      alt='piece-img'
      className={`x-${x_coordinate} y-${y_coordinate} w-24 h-24 absolute`} 

      draggable 
      onDragStart={handleDrag}
      
      
      
      />
        
    
  );
}

export default Piece;
