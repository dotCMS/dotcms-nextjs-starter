import React from 'react';
import Flickity from 'react-flickity-component';
import { CarouselContainer } from '../styles/products/product.styles';
import { flickityOptions } from '../config';
import DotCMSImage from '../components/DotCMSImage';

function Carousel({ images, identifier, title }) {
    const renderImages = (images) => {
        let imgs = [];
        for (const image in images) {
            if (typeof images[image] !== 'undefined') {
                imgs.push(
                    <DotCMSImage
                        width={700}
                        height={700}
                        data={{
                            identifier: identifier,
                            name: image
                        }}
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
