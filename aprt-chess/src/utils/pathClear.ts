// returns true if path is clear
// NOTE it will only work for straight & diagonal paths
// else it will return false
export function isPathClear(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    boardState: string[][]
  ): boolean {
    // if path is vertical
    if (toX - fromX === 0) {
      const verticalDist = Math.abs(toY - fromY);
      for (let i = 1; i < verticalDist; i++) {
        const multiplier = toY < fromY ? -1 : 1;
        const passedTile = fromY + i * multiplier;
        if (boardState[passedTile][fromX]) {
          console.log("blocked by other piece");
          return false;
        }
      }
      return true;
    }
    // if path is horizontal
    else if (toY - fromY === 0) {
      const horizontalDist = Math.abs(toX - fromX);
      for (let i = 1; i < horizontalDist; i++) {
        const multiplier = toX < fromX ? -1 : 1;
        const passedTile = fromX + i * multiplier;
        if (boardState[fromY][passedTile]) {
          console.log("blocked by other piece");
          return false;
        }
      }
      return true;
    }
    // if path is diagonal
  
    // else if (Math.abs(toY - fromY - toX + fromX) === 0) {
    //   console.log("implement on you own lol");
    // }
  
  
    //upper right diagonal
    else if(fromX < toX && fromY > toY)
    {
      if(toX - fromX == fromY - toY) //to confirm its a valid move in the top right direction
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

 