// Dependencies
import styled from 'styled-components'

export const CarouselContainer = styled.div`
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
    content: '';
  }
`
