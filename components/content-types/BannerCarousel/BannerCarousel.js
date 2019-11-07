import { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap';

class BannerCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
    }

    onExiting = () => {
        this.animating = true;
    };

    onExited = () => {
        this.animating = false;
    };

    next = () => {
        if (this.animating) return;
        const nextIndex =
            this.state.activeIndex === this.props.items.length - 1
                ? 0
                : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    };

    previous = () => {
        if (this.animating) return;
        const nextIndex =
            this.state.activeIndex === 0
                ? this.props.items.length - 1
                : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    };

    goToIndex = newIndex => {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    };

    render() {
        const { activeIndex } = this.state;
        const slides = this.props.items
            ? this.props.items.map(item => {
                  return (
                      <CarouselItem
                          onExiting={this.onExiting}
                          onExited={this.onExited}
                          key={item.identifier}
                      >
                          <div
                              className="banner bg-image-full bg-overlay-30 context-dark"
                              style={{
                                  backgroundImage: `url(${item.image})`
                              }}
                          >
                              <div className="container">
                                  <div className="row justify-content-lg-center">
                                      <div className="col-lg-9 text-center">
                                          <p className="banner-title">
                                              {item.title}
                                          </p>
                                          <h2 className="text-decoration-lines-2">
                                              <span>
                                                  {item.caption}
                                                  <span className="text-decoration-line text-decoration-line-left"></span>
                                                  <span className="text-decoration-line text-decoration-line-right"></span>
                                              </span>
                                          </h2>
                                          {item.buttonText && item.link ? (
                                              <div className="group-lg">
                                                  <a
                                                      className="button button-primary button-leaf"
                                                      href={item.link}
                                                  >
                                                      {item.buttonText}
                                                  </a>
                                              </div>
                                          ) : (
                                              ''
                                          )}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </CarouselItem>
                  );
              })
            : null;

        return (
            <Carousel
                className="carousel-banner"
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
    items: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            caption: PropTypes.string.isRequired,
            buttonText: PropTypes.string,
            link: PropTypes.string
        })
    ).isRequired
};

BannerCarousel.defaultProps = {
    items: []
};

export default BannerCarousel;
