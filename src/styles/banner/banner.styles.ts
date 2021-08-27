// Dependencies
import styled from 'styled-components'

export const BannerWrapper = styled.div`
  background: white;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  padding-left: 2rem;
  width: 100%;

  .banner-wrapper__figure {
    position: relative;
    flex: 2 1 20rem;

    @media screen and (max-width: 767px) {
      margin-left: -2rem;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
      position: relative;
    }
  }

  .banner-wrapper__content {
    margin: 5rem 0;
    padding-right: 2rem;
    flex: 1 1 20rem;
    position: relative;

    p {
      margin-bottom: 1.6rem;
    }
  }

  .banner-wrapper__content--dots {
    position: absolute;
    top: -100px;
    right: -50px;
    z-index: 0;
  }

  .banner-wrapper__content--dots--bottom {
    top: 75px;
  }
`
