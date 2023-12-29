import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

const ScreenshotSlider = ({imageUrls}) => {
    return (
        <div className={"container"}>
            <div className={"row"}>
                <Carousel className={"text-center"}>
                    {imageUrls.map((imageUrl, index) => (
                        <Carousel.Item >
                            <div key={index}>
                                <img className={"d-block w-100"} src={imageUrl} alt={`Screenshot ${index + 1}`}/>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>

    );
};

export default ScreenshotSlider;
