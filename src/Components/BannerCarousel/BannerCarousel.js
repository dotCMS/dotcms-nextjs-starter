import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap';

class BannerCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex =
            this.state.activeIndex === this.props.items.length - 1
                ? 0
                : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex =
            this.state.activeIndex === 0
                ? this.props.items.length - 1
                : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const displayedFields = this.props.fieldsToDisplay.split(',');
        const { activeIndex } = this.state;
        const slides = this.props.items.map(item => {
            const showTitle = displayedFields.includes('title');
            const showCaption = displayedFields.includes('caption1');
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img src={item.src} alt={item.altText} />
                    {showTitle || showCaption ? (
                        <div className="carousel-caption d-none d-md-block">
                            {showTitle ? <h1>{item.title}</h1> : ''}
                            {showCaption ? Parser(item.caption) : ''}
                        </div>
                    ) : (
                        ''
                    )}
                </CarouselItem>
            );
        });

        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                {slides}
                <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={this.previous}
                />
                <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={this.next}
                />
            </Carousel>
        );
    }
}

BannerCarousel.propTypes = {
    fieldsToDisplay: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};

export default BannerCarousel;
