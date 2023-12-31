import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { PromotionStats } from './Board';
import ToastContent from './ToastContent';
 

const PromotionToast = ({color,xcord,ycord,sendBoardState}:{color:string,xcord:number,ycord:number,sendBoardState:Function}) => {

    const notify = () => {
        toast(<ToastContent color={color} xcord={xcord} ycord={ycord} sendBoardState={sendBoardState} />, {
            position: toast.POSITION.TOP_CENTER
        });
    }
    useEffect(() => {
        notify()
    }, [color])
    return (

        <ToastContainer 
        autoClose={false}
        hideProgressBar={false}
        />
    )
}

export default PromotionToast