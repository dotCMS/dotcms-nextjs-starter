import React, { createRef } from 'react'
import DotCMSImage from '../components/DotCMSImage';

const Slider = ({ images, title, id }) => {
    const keys = Object.keys(images);
    const values = Object.values(images);
    const handleNavigatorClick = (elem) => {
        elem.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    const createRefs = (imgs) => {
        const values = Object.values(imgs).filter(Boolean);
        return values.reduce((acc, value, idx) => {
            acc[idx] = createRef();
            return acc;
        }, {});
    };

    const navigatorRefs = createRefs(images);
    const imageRefs = createRefs(images);

    return (
        <>
            <ol className="carousel__viewport">
                {Object.values(images).map((image, index) => {
                    return (
                        image && (
                            <li
                                id={`carousel__slide${index}`}
                                tabindex="0"
                                className="carousel__slide"
                                ref={imageRefs[index]}
                            >
                                <DotCMSImage
                                    width={700}
                                    height={700}
                                    data={{
                                        identifier: id,
                                        name: keys[index]
                                    }}
                                    alt={title}
                                />
                            </li>
                        )
                    );
                })}
            </ol>
            <aside className="carousel__navigation">
                <ol className="carousel__navigation-list">
                    {values.filter(Boolean).map((item, index) => {
                        return (
                            <li className="carousel__navigation-item">
                                <a
                                    ref={navigatorRefs[index]}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavigatorClick(imageRefs[index].current);
                                    }}
                                    className="carousel__navigation-button"
                                ></a>
                            </li>
                        );
                    })}
                </ol>
            </aside>
        </>
    );
};


export default Slider
