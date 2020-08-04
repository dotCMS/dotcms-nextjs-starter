import React from 'react';
import htmlParser from '../../../utilities/htmlParser';
import { processNodes } from 'react-html-parser';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import styled from 'styled-components'

const CarouselContainer = styled.div`
  .carousel-inner {
    position: relative;
    height: 300px;
    width: 100%;
  }

  .banner.bg-image-full {
    background-repeat: no-repeat;
    width: 100%;
    background-size: cover;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .row.justify-content-lg-center {
    display: flex;
    justify-content: center;
  }

  .banner-title {
    font-size: 2.25rem;
    line-height: 4rem;
    font-weight: bold;
    margin-bottom: 0;
  }

  .banner-title,
  .text-decoration-lines-2 {
    color: white;
  }

  .text-decoration-lines-2 {
    font-size: 1.2rem;
    line-height: 1.6rem;
  }
  .bg-overlay-30::before {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    content: "";
  }
`;

function BannerCarousel({ rendered }) {
    const transform = (node) => {
        const { class: className } = node.attribs;

        if (className === 'carousel-inner') {
            return <Carousel showThumbs={false}>{processNodes(node.children)}</Carousel>;
        }

        if (className === 'carousel-control-prev' || className === 'carousel-control-next') {
            return null;
        }
    };

return <CarouselContainer>{htmlParser({ content: rendered, transform })}</CarouselContainer>;
}

export default BannerCarousel;
