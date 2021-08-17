import React from 'react';

import Image from 'next/image';

import DotCMSImage from '../../DotCMSImage';
import { LocalImage } from '../../LocalImage';
import { BannerWrapper } from '../../../styles/banner/banner.styles';
import { Button } from '../../../styles/shared.styles';
import { Editable } from '../../Editable';

function Banner({ buttonText, image, caption, link, textColor, title, inode }) {
    return (
        <BannerWrapper className="banner-wrapper">
            <div className="banner-wrapper__content">
              <div className="banner-wrapper__content--dots">
                    <LocalImage
                        alt="Dots SVG"
                        height="175"
                        src="/dots.svg"
                        width="175"
                    />
                </div>
                <div className="banner-wrapper__content--dots banner-wrapper__content--dots--bottom">
                    <LocalImage
                        alt="Dots SVG"
                        height="175"
                        src="/dots.svg"
                        width="175"
                    />
                </div>

                {title && (
                    <Editable
                        element={<h1>{title}</h1>}
                        field="title"
                        inode={inode}
                        lang="1"
                        mode="minimal"
                    />
                )}
                {caption && <p>{caption}</p>}

                {buttonText && (
                    <Editable
                        element={<Button>{buttonText}</Button>}
                        field="buttonText"
                        href={link}
                        inode={inode}
                        lang="1"
                        mode="minimal"
                        textColor={textColor}
                    />
                )}
            </div>
            <div className="banner-wrapper__figure">
                <DotCMSImage alt={title} path={image} />
            </div>
        </BannerWrapper>
    );
}

export default Banner;
