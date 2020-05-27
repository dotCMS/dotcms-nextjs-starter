import React from 'react';
import styled from 'styled-components';
import { Container, Button } from '../styles/shared.styles';
import dots from '../public/dots.svg';
const BannerWrapper = styled.div`
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
`

function Banner(props) {
	return (
		<Container>
			<BannerWrapper className="banner-wrapper">
				<div className="banner-wrapper__content">
					<img className="banner-wrapper__content--dots" src={dots} alt="Dots SVG"/>
					<img className="banner-wrapper__content--dots --bottom" src={dots} alt="Dots SVG"/>
					<h1>Medium length display headline</h1>
					<p>Separated they live in Bookmarks right at the coast of the famous Semantics, large language ocean Separated they live in Bookmarks right </p>
					<Button href="#">Buy Now</Button>
				</div>
				<div className="banner-wrapper__figure">
					<img src="https://images.unsplash.com/photo-1588257207572-f5baae14f932?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" alt=""/>
				</div>
			</BannerWrapper>
		</Container>
	);
}

export default Banner;
