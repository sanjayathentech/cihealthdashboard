import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function MyToast ({postion,theme}){
    return(
        <>    
        <ToastContainer
position={postion}
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme={theme}
/>
{/* Same as */}
<ToastContainer />
</>
    )
}

export const toastMessage = (type,message) => {
    debugger;
    switch(type){
        case 'success' : successToast(message);
        case 'warning' : warningToast(message);
        case 'error'   : errorToast(message);
    }
   
}

const successToast = (message) => {
    debugger;
    toast.success(message,{position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    })
}

const warningToast = () => {

}

const errorToast = () => {

}