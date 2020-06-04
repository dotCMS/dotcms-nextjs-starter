import React from 'react';
import Flickity from 'react-flickity-component';
import { CarouselContainer } from '../styles/products/product-single';

function Carousel({ images, identifier, title }) {
    const flickityOptions = {
        contain: true,
        pageDots: true,
        fullscreen: true
    };

    const renderImages = (images) => {
        let imgs = [];
        for (const image in images) {
            imgs.push(
                <img
                    src={`${process.env.DOTCMS_HOST}/dA/${identifier}/${image}/filter/Resize,Jpeg/resize_w/700/jpeg_q/46`}
                    alt={title}
                />
            );
        }
        return imgs;
    };

    return (
        <CarouselContainer>
            <Flickity
                className={'carousel'}
                elementType={'div'}
                options={flickityOptions}
                disableImagesLoaded={false}
                reloadOnUpdate
                static
            >
                {renderImages(images)}
            </Flickity>
        </CarouselContainer>
    );
}

export default Carousel;
