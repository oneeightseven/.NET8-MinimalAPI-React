import {toast} from "react-toastify";

class ArticleNotify{
    static addArticleSuccess() {
        return toast.success('Article added successfully', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    }

    static addArticleError(){
        return toast.error('Article not added, try again later', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });
    }

}

export default ArticleNotify