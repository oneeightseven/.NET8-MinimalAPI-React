import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Posts from "./pages/Article/Posts";
import PostBody from "./pages/Article/PostBody";
import AddingArticle from "./pages/Article/AddingArticle";
import Authrorize from "./pages/Auth/Authrorize";
import PersonalArea from "./pages/Auth/PersonalArea";
import Registration from "./pages/Auth/Registration";
import { ToastContainer, toast } from 'react-toastify';
import Notifications from "./components/Auth/Notifications";

function App() {
    return (
       <>
           <BrowserRouter>
               <Routes>
                   <Route path={"/"} element={<Posts />} />
                   <Route path={"/addingArticle"} element={<AddingArticle />} />
                   <Route path={"/post/:postId"} element={<PostBody />} />
                   <Route path={"/login"} element={<Authrorize />}/>
                   <Route path={"/registration"} element={<Registration />}/>
                   <Route path={"/personalArea"} element={<PersonalArea/>}/>
                   <Route path={"/noti"} element={<Notifications/>}/>
               </Routes>
           </BrowserRouter>
           <ToastContainer/>

       </>
    );
}

export default App;
