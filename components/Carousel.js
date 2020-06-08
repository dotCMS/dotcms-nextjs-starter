import React from 'react';
import Flickity from 'react-flickity-component';
import { CarouselContainer } from '../styles/products/product.styles';
import { flickityOptions } from '../config';

function Carousel({ images, identifier, title }) {
    const renderImages = (images) => {
        let imgs = [];
        for (const image in images) {
            if (typeof(images[image]) !== "undefined") {
                 imgs.push(
                     <img
                         key={`${identifier}+${image}`}
                         src={`${process.env.DOTCMS_HOST}/dA/${identifier}/${image}/filter/Resize,Jpeg/resize_w/700/jpeg_q/46`}
                         alt={title}
                     />
                 );
            }
               
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
