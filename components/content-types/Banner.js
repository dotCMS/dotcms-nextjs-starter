import React from 'react';

import DotCMSImage from '../DotCMSImage';
import { BannerWrapper } from '../../styles/banner/banner.styles';
import { Button } from '../../styles/shared.styles';

import dots from '../../public/dots.svg';

function Banner({ buttonText, image, caption, link, textColor, title }) {
    return (
        <BannerWrapper className="banner-wrapper">
            <div className="banner-wrapper__content">
                <img className="banner-wrapper__content--dots" src={dots} alt="Dots SVG" />
                <img className="banner-wrapper__content--dots --bottom" src={dots} alt="Dots SVG" />

                {title && <h1>{title}</h1>}
                {caption && <p>{caption}</p>}
                {buttonText && (
                    <Button color={textColor} href={link}>
                        {buttonText}
                    </Button>
                )}
            </div>
            <div className="banner-wrapper__figure">
                <DotCMSImage
                    size={900}
                    alt={title}
                    path={image}
                />
            </div>
        </BannerWrapper>
    );
}

export default Banner;
