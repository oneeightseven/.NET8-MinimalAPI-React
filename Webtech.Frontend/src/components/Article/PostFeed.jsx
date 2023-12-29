import React from 'react';
import Card from "./Card";

const PostFeed = () => {

    const sum = (arg1, arg2) => arg1 + arg2;
    const chet = sum(5, 1)
    console.log(chet)

    return (
            <div className="col-xl-12">

                <Card/>
            </div>
    );
};

export default PostFeed;