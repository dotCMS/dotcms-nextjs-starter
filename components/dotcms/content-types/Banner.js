import React from 'react';
import DotCMSImage from '../../DotCMSImage';
import { BannerWrapper } from '../../../styles/banner/banner.styles';
import { Button } from '../../../styles/shared.styles';
import dots from '../../../public/dots.svg';
import { Editable } from '../../Editable';

function Banner({ buttonText, image, caption, link, textColor, title, inode }) {


    return (
        <BannerWrapper className="banner-wrapper">
            <div className="banner-wrapper__content">
                <img className="banner-wrapper__content--dots" src={dots} alt="Dots SVG" />
                <img className="banner-wrapper__content--dots --bottom" src={dots} alt="Dots SVG" />

                {title && (
                    <Editable
                        element={<h1>{title}</h1>}
                        field="title"
                        lang="1"
                        mode="minimal"
                        inode={inode}
                    />
                )}
                {caption && <p>{caption}</p>}

                {buttonText && (
                    <Editable
                        element={<Button>{buttonText}</Button>}
                        href={link}
                        inode={inode}
                        lang="1"
                        mode="minimal"
                        field="buttonText"
                        textColor={textColor}
                    />
                )}
            </div>
            <div className="banner-wrapper__figure">
                <DotCMSImage size={900} alt={title} path={image} />
            </div>
        </BannerWrapper>
    );
}

export default Banner;
