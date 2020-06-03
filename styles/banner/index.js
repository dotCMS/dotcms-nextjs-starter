import styled from 'styled-components';

export const BannerWrapper = styled.div`
    background: white;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-left: 2rem;
    overflow: hidden;
    .banner-wrapper {
        &__figure {
            flex: 2 1 20rem;
        }
        &__content {
            margin: 5rem 0;
            padding-right: 2rem;
            flex: 1 1 20rem;
            position: relative;
            p {
                margin-bottom: 1.6rem;
            }
            &--dots {
                position: absolute;
                top: -100px;
                right: -50px;
                z-index: 0;
                &.--bottom {
                    top: 75px;
                }
            }
        }
        &__figure img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1;
            position: relative;
        }
    }
`;
