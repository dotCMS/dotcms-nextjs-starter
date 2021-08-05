import React from 'react';

import Image from 'next/image';

import DotCMSImage from '../../DotCMSImage';
import { BannerWrapper } from '../../../styles/banner/banner.styles';
import { Button } from '../../../styles/shared.styles';
import { Editable } from '../../Editable';

function Banner({ buttonText, image, caption, link, textColor, title, inode }) {
    return (
        <BannerWrapper className="banner-wrapper">
            <div className="banner-wrapper__content">
                <Image
                    alt="Dots SVG"
                    className="banner-wrapper__content--dots"
                    height="175"
                    src="/dots.svg"
                    width="175"
                />
                <Image
                    alt="Dots SVG"
                    className="banner-wrapper__content--dots--bottom"
                    height="175"
                    src="/dots.svg"
                    width="175"
                />

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
