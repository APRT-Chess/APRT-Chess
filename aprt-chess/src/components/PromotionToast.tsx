import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { PromotionStats } from './Board';
import ToastContent from './ToastContent';
 

const PromotionToast = ({color,xcord,ycord}:{color:string,xcord:number,ycord:number}) => {

    const notify = () => {
        toast(<ToastContent color={color} xcord={xcord} ycord={ycord} />, {
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