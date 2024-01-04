import React from 'react';

const NotificationCard = ({isLoading, data}) => {
    return (
        <>
            <br/>
            {isLoading ? (
                <span style={{top: '30%', left: '56%'}} className="loader"></span>
            ) : (
                data?.map((item) => (
                    <>
                        {item.checked ?
                            (
                                <>
                                    <div className={"container"}>
                                        <div className={"offset-xl-3 col-xl-6"}>
                                            <div key={item.index} className={"container"}
                                                 style={{backgroundColor: '#2C4251'}}>
                                                <div className={"col-xl-12"}>
                                                    <div className={"row text-white"}>
                                                        <div className={"col-xl-12 mt-xl-2 px-4"}>
                                                            <h5>{item.userName} Liked article: {item.articleTitle}</h5>
                                                        </div>
                                                        <div className={"col-xl-6 mt-xl-3 text-start mb-xl-1 px-4"}>
                                                            <h6>{item.date}</h6>
                                                        </div>
                                                        <div className={"offset-xl-4 col-xl-2 mt-xl-3 text-end"}>
                                                            <h6 style={{fontStyle: "italic"}}>Viewed</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                </>
                            ) :
                            (
                                <>
                                    <div className={"container"}>
                                        <div className={"offset-xl-2 col-xl-8"}>
                                            <div key={item.index} className={"container"}
                                                 style={{backgroundColor: 'white'}}>
                                                <div className={"col-xl-12"}>
                                                    <div className={"row"}>
                                                        <div className={"col-xl-12 mt-xl-2 px-4"}>
                                                            <h4>{item.userName} Liked article: {item.articleTitle}</h4>
                                                        </div>
                                                        <div className={"col-xl-6 mt-xl-3 text-start mb-xl-1 px-4"}>
                                                            <h5>{item.date}</h5>
                                                        </div>
                                                        <div className={"offset-xl-4 col-xl-2 mt-xl-3 text-end"}>
                                                            <h5 style={{
                                                                color: "indianred",
                                                                fontWeight: "bold"
                                                            }}>New*</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                </>
                            )}
                    </>
                ))
            )}
        </>
    );
};

export default NotificationCard;
