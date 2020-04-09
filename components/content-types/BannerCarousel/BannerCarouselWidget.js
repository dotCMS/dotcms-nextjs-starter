import React, { useState, useEffect } from 'react';
import BannerCarousel from './BannerCarousel';

const BannerCarouselWidget = props => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!items.length) {
            fetch(`${process.env.DOTCMS_HOST}/api/content/id/${props.identifier}/depth/1`)
                .then(response => response.json())
                .then(({ contentlets }) => {
                    if (contentlets) {
                        setItems(contentlets[0].banners);
                        
                    }
                })
                .catch(error => console.error(error));
        }
    });

    return (
        items.length ? <BannerCarousel items={items} /> : ''
    );
};

export default BannerCarouselWidget;
