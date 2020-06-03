import styled from 'styled-components';

export const ProductContainer = styled.div`
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
    img {
        width: 100%;
        height: 25rem;
        object-fit: cover;
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