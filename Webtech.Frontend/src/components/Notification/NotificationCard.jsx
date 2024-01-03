import React from 'react';

const NotificationCard = ({ isLoading, data }) => {
    return (
        <>
            <h1 className={"offset-xl-8 col-xl-1 text-xl-end"}>Notifications</h1>
            {isLoading ? (
                <span style={{top: '30%', left: '56%'}} className="loader"></span>
            ) : (
                data?.map((item, index) => (
                    <>
                        <div key={index} className="container" style={{backgroundColor: 'white'}}>

                            <h1>{item.userName} Liked article: {item.articleTitle}</h1>

                            <br/>
                            <h5>{item.date}</h5>
                        </div>
                        <br/>
                    </>
                ))
            )}
        </>
    );
};

export default NotificationCard;
