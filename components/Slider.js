import React, { createRef, useRef, useState, useEffect } from 'react';
import DotCMSImage from '../components/DotCMSImage';

const Slider = ({ images, title, id }) => {
    const keys = Object.keys(images);
    const values = Object.values(images).filter(Boolean);

    const handleNavigatorClick = (elem) => {
        elem.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    const createRefs = (imgs) => {
        const values = Object.values(imgs);
        return values.reduce((acc, value, idx) => {
            acc[idx] = createRef();
            return acc;
        }, []);
    };

    const navigatorRefs = createRefs(images);
    const slideRefs = createRefs(images);

    return (
        <>
            {images && (
                <ul className="carousel__viewport">
                    {Object.values(images).map((image, index) => {
                        const data = {
                            identifier: id,
                            name: keys[index],
                            width: 700,
                            height: 700,
                            alt: title
                        };

                        return (
                            image && (
                                <li
                                    id={`carousel__slide${index}`}
                                    tabIndex="0"
                                    className="carousel__slide"
                                    ref={slideRefs[index]}
                                    key={index}
                                    data-slide={index}
                                >
                                    <DotCMSImage loading="lazy" {...data} />
                                </li>
                            )
                        );
                    })}
                </ul>
            )}
            <aside className="carousel__navigation">
                <ul className="carousel__navigation-list">
                    {values.length > 1 &&
                        values.map((_item, index) => {
                            return (
                                <li key={index} className="carousel__navigation-item active">
                                    <a
                                        ref={navigatorRefs[index]}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavigatorClick(slideRefs[index].current);
                                        }}
                                        className="carousel__navigation-button"
                                    />
                                </li>
                            );
                        })}
                </ul>
            </aside>
        </>
    );
};

export default Slider;
