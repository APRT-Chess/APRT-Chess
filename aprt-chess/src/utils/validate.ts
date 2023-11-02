export function validate(fromX: number, fromY: number, toX: number, toY: number,pieceName:string):boolean{

   switch (pieceName) {
    case "wP":
        console.log("its a white pawn");
        break;
    case "wK":
        console.log("its a white king");
        break;
    case "wQ":
        console.log("its a white queen");
        break;
    case "wN":
        console.log("its a white knight");
        break;
    case "wR":
        console.log("its a white rook");
        break;
    case "wB":
        console.log("its a white bishop");
        break;
    case "bP":
        console.log("its a black pawn");
        break;
    case "bK":
        console.log("its a black king");
        break;
    case "bQ":
        console.log("its a black queen");
        break;
    case "bN":
        console.log("its a black knight");
        break;
    case "bR":
        console.log("its a black rook");
        break;
    case "bB":
        console.log("its a black bishop");
        break;
 
   
    default:
        break;
   }


    return true;
}