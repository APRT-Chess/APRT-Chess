   //upper right diagonal
export function rightDiagonalUpCheck(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    boardState: string[][]):boolean
    {
        if(fromX < toX && fromY > toY)
    {
      if(toX - fromX == fromY - toY) //to confirm its a valid move in the upward right direction
      {
        let i = fromX+1;
        let j = fromY-1;
        while(i<=toX && j >=toY)
        {
          if(boardState[j][i])
          {
            console.log("trmove blocked by a piece at x:",i,",y:",j)
            return false;
          }
          
          i++;j--;
        }
  
        //if the control comes here, means no piece blocking the move;
        return true;
      }
      return false;
    }
  
  
    // if the move doesn't fit in any of these it is invalid so return false;
    return false;

    }