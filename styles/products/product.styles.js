import styled from 'styled-components';

export const SingleProductContainer = styled.div`
    .meta {
        margin-top: var(--primary-spacing);

        &__category,
        &__title {
            margin-bottom: 1rem;
        }
        &__category {
            a {
                text-decoration: none;
                color: var(--primary-purple);
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
    }

    img {
        width: 100%;
        object-fit: contain;
        display: block;
    }
`;

export const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    flex: 1 0 80%;
    margin-top: var(--primary-spacing);
    gap: var(--primary-spacing);
`;

export const CarouselContainer = styled.div`
    img {
        object-fit: cover;
    }
    .carousel-cell {
        width: 100%; /* full width */
        height: 160px; /* height of carousel */
        margin-right: 10px;
    }
`;

export const ProductContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--primary-spacing);
    margin-bottom: 5rem;
`;

export const ProductDetail = styled.div`
    .meta {
        &__category {
            text-transform: uppercase;
            font-size: 0.825rem;
            margin-bottom: 0.5rem;
            a {
                text-decoration: none;
                color: var(--primary-purple);
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
`;

export const Price = styled.span`
    font-size: ${(props) => (props.small ? '1rem' : '1.25rem')};
    margin-bottom: 1.6rem;
    display: inline-block;
    text-decoration: ${(props) => (props.salePrice ? 'line-through' : 'none')};
    color: ${(props) => (props.salePrice ? '#666' : 'inherit')};
    font-style: ${(props) => (props.salePrice ? 'italic' : 'normal')};
    margin-right: ${(props) => (props.salePrice ? '0.5rem' : '0rem')};
`;

export const Quantity = styled.input`
    background: #f1f3f4;
    padding: 0.5rem 0rem;
    border: none;
    border-bottom: 2px solid grey;
    font-size: 18px;
    width: 11%;
    margin-right: 1rem;
    text-align: center;
`;
