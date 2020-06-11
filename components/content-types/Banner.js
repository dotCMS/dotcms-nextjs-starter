import React from 'react';
import { Button } from '../../styles/shared.styles';
import dots from '../../public/dots.svg';
import { BannerWrapper } from '../../styles/banner/banner.styles';
import DotCMSImage from '../DotCMSImage';

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
                <DotCMSImage width={900} alt={title} data={{
                    path: image
                }} />
            </div>
        </BannerWrapper>
    );
}

export default Banner;
