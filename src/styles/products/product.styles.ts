// Dependencies
import styled from 'styled-components'

export const SingleProductContainer = styled.div`
  margin-bottom: var(--primary-spacing);

  .meta {
    margin-top: 1rem;

    &__category,
    &__title {
      margin-bottom: 1rem;
    }
    &__category {
      a {
        text-decoration: none;
        color: var(--dotcms-purple);
        &:hover {
          color: var(--primary-black);
        }
      }
      text-transform: uppercase;
      font-size: 0.825rem;
    }
    &__title {
      font-size: 1.2rem;
      line-height: 1.6rem;
      a {
        text-decoration: none;
      }
    }
    &__price--strikethrough {
      color: #666;
      text-decoration: line-through;
      font-style: italic;
      margin-right: 0.5rem;
    }
  }

  .image__link {
    display: block;
    background: #fff;
    padding: 1rem;
    position: relative;
    min-height: 300px;

    img {
      object-fit: contain;
    }
  }
`

export const ProductGrid = styled.div<{ width?: number }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.width
      ? `repeat(auto-fill, minmax(${props.width}px, 1fr))`
      : `repeat(auto-fill, minmax(250px, 1fr))`};
  flex: 1 0 80%;
  margin-top: var(--primary-spacing);
  gap: var(--primary-spacing);
`

export const StatusIndicator = styled.h3`
  margin: 1rem 0;
`

export const CarouselContainer = styled.section`
  position: relative;
  padding-top: 75%;

  .carousel__viewport {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    overflow-x: scroll;
    counter-reset: item;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    list-style: none;
  }

  .carousel__slide {
    position: relative;
    flex: 0 0 100%;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      background-color: white;
      object-fit: contain;
    }
  }

  .carousel__snapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    scroll-snap-align: center;
  }

  @media (hover: hover) {
    .carousel__snapper {
      animation-name: tonext, snap;
      animation-timing-function: ease;
      animation-duration: 4s;
      animation-iteration-count: infinite;
    }

    .carousel__slide:last-child .carousel__snapper {
      animation-name: tostart, snap;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .carousel__snapper {
      animation-name: none;
    }
  }

  .carousel:hover .carousel__snapper,
  .carousel:focus-within .carousel__snapper {
    animation-name: none;
  }

  .carousel__navigation {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
  }

  .carousel__navigation-list,
  .carousel__navigation-item {
    display: inline-block;
  }

  .carousel__navigation-button {
    cursor: pointer;
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #333;
    background-clip: content-box;
    border: 0.25rem solid transparent;
    border-radius: 50%;
    font-size: 0;
    transition: transform 0.1s;
  }

  .carousel::before,
  .carousel::after,
  .carousel__prev,
  .carousel__next {
    position: absolute;
    top: 0;
    margin-top: 37.5%;
    width: 4rem;
    height: 4rem;
    transform: translateY(-50%);
    border-radius: 50%;
    font-size: 0;
    outline: 0;
  }

  .carousel::before,
  .carousel__prev {
    left: -1rem;
  }

  .carousel::after,
  .carousel__next {
    right: -1rem;
  }
`

export const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--primary-spacing);
  margin-bottom: 5rem;
`

export const ProductDetailContainer = styled.div`
  .meta {
    &__category {
      text-transform: uppercase;
      font-size: 0.825rem;
      margin-bottom: 0.5rem;
      a {
        text-decoration: none;
        color: var(--dotcms-purple);
        &:hover {
          color: var(--primary-black);
        }
      }
    }
    &__title {
      line-height: 2rem;
    }
    &__price {
      font-size: 1.25rem;
      margin-bottom: 1.6rem;
      display: inline-block;
    }
    &__price--strikethrough {
      font-size: 1.25rem;
      color: #666;
      text-decoration: line-through;
      font-style: italic;
      margin-right: 0.5rem;
    }
  }
  ul {
    margin-left: 1.6rem;
    margin-bottom: 1.6rem;
  }
`

export const Price = styled.span<{ small?: boolean; salePrice?: boolean }>`
  font-size: ${(props) => (props.small ? '1rem' : '1.25rem')};
  margin-bottom: 1.6rem;
  display: inline-block;
  text-decoration: ${(props) => (props.salePrice ? 'line-through' : 'none')};
  color: ${(props) => (props.salePrice ? '#666' : 'inherit')};
  font-style: ${(props) => (props.salePrice ? 'italic' : 'normal')};
  margin-right: ${(props) => (props.salePrice ? '0.5rem' : '0rem')};
`

export const Quantity = styled.input`
  background: #f1f3f4;
  padding: 0.5rem 0rem;
  border: none;
  border-bottom: 2px solid grey;
  font-size: 18px;
  width: 11%;
  margin-right: 1rem;
  text-align: center;
`
