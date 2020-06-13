import React from 'react';
import { CarouselContainer } from '../styles/products/product.styles';
import Slider from './Slider'
function Carousel({ images, identifier, title }) {  
    return (
        <CarouselContainer className="carousel" aria-label="Gallery">
            <Slider images={images} title={title} id={identifier} />
        </CarouselContainer>
    );
}

export default Carousel;
