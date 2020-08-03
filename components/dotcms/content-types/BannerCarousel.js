import React from 'react';
import htmlParser from '../../../utilities/htmlParser';
import { processNodes } from 'react-html-parser';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

function BannerCarousel({ rendered }) {
    const transform = (node) => {
        if (node.type === 'tag') {
            if (node.attribs.class === 'carousel-inner') {
                return <Carousel>{processNodes(node.children)}</Carousel>;
            }

            if (node.attribs.class === 'carousel-control-prev') {
                return null;
            }

            if(node.attribs.class === "carousel-control-next") {
              return null;
            }      
        }
    };

    return htmlParser({ content: rendered, transform });
}

export default BannerCarousel;
