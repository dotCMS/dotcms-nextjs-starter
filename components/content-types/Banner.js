import React from 'react';
import { Button } from '../../styles/shared.styles';
import dots from '../../public/dots.svg';
import { BannerWrapper } from '../../styles/banner/banner.styles';

function Banner({ buttonText, image, hostName, caption, link, textColor, title }) {
    return (
        <BannerWrapper className="banner-wrapper">
            <div className="banner-wrapper__content">
                <img className="banner-wrapper__content--dots" src={dots} alt="Dots SVG" />
                <img className="banner-wrapper__content--dots --bottom" src={dots} alt="Dots SVG" />
                <h1>{title}</h1>
                <p>{caption}</p>
                <Button color={textColor} href={link}>
                    {buttonText}
                </Button>
            </div>
            <div className="banner-wrapper__figure">
                <img
                    src={`https://${hostName}:8443${image}/filter/Resize,Jpeg/resize_w/600/jpeg_q/50`}
                    alt={title}
                />
            </div>
        </BannerWrapper>
    );
}

export default Banner;
