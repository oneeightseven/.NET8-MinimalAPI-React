import {toast} from "react-toastify";

class FeedbackNotify{
    static newAlert(){
        return toast.success('You have received a new notification', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    }
}

export default FeedbackNotify