import React from 'react';
import DotCMSImage from '../../DotCMSImage';
import { BannerWrapper } from '../../../styles/banner/banner.styles';
import { Button } from '../../../styles/shared.styles';
import dots from '../../../public/dots.svg';
import {withEditable} from '../../../utilities/dotcms/widthEditable';

function Banner({ buttonText, image, caption, link, textColor, title, inode }) {
    const TitleEditable = withEditable((props) => {
        return <h1 {...props}>{title}</h1>;
    });
    const ButtonEditable = withEditable((props) => {
        return <Button {...props}>{buttonText}</Button>;
    });
    return (
        <BannerWrapper className="banner-wrapper">
            <div className="banner-wrapper__content">
                <img className="banner-wrapper__content--dots" src={dots} alt="Dots SVG" />
                <img className="banner-wrapper__content--dots --bottom" src={dots} alt="Dots SVG" />
                {title && <TitleEditable name="title" lang="1" mode="minimal" inode={inode} />}
                {caption && <p>{caption}</p>}
                {buttonText && (
                    <ButtonEditable
                        color={textColor}
                        href={link}
                        name="buttonText"
                        lang="1"
                        mode="minimal"
                        inode={inode}
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
