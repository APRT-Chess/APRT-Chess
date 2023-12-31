import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { PromotionStats } from './Board';
import { blackBishop, blackKing, blackKnight, blackRook, whiteBishop, whiteKing, whiteKnight, whiteQueen, whiteRook } from '../utils/ChessPieces';
 

const whitePieces = [whiteBishop,whiteKnight,whiteRook,whiteKing]
const blackPieces = [blackBishop,blackKnight,blackRook,blackKing]
const ToastContent = (props:{color:string})=>{
// show white piece toast if the pieces are white
    if(props.color==='white'){
        return(
            <div className='flex flex-col'>
                <p className=' font-bold text-center'>Select a piece to promote pawn</p>
                <div className='flex items-center justify-center'>
                    {whitePieces.map((imgsrc)=>{
                        return(
                            <img src={imgsrc} alt="" className=' w-12 h-12  hover:bg-green-400'  />
                        )
                    })}
                </div>
            </div>
        )
    }
    return(
        <div className='flex flex-col'>
                <p className=' font-bold text-center'>Select a piece to promote pawn</p>
                <div className='flex items-center justify-center'>
                    {blackPieces.map((imgsrc)=>{
                        return(
                            <img src={imgsrc} alt="" className=' w-12 h-12  hover:bg-green-400'  />
                        )
                    })}
                </div>
            </div>
    )
}

const PromotionToast = ({color}:PromotionStats) => {

    const notify = () => {
        toast(<ToastContent color={color}/>, {
            position: toast.POSITION.TOP_CENTER
        });
    }
    useEffect(() => {
        notify()
    }, [])
    return (

        <ToastContainer 
        autoClose={false}
        hideProgressBar={false}
        />
    )
}

export default PromotionToast