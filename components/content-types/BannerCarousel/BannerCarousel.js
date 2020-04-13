import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap';

const BannerCarousel = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    let animating = false;

    const onExiting = () => {
        animating = true;
    };

    const onExited = () => {
        animating = false;
    };

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === props.items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? props.items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const slides = props.items
        ? props.items.map((item) => {
              return (
                  <CarouselItem onExiting={onExiting} onExited={onExited} key={item.identifier}>
                      <div
                          className="banner bg-image-full bg-overlay-30 context-dark"
                          style={{
                              backgroundImage: `url(${`https://starter.dotcms.com`}/${item.image}/40q)`
                          }}
                      >
                          <div className="container">
                              <div className="row justify-content-lg-center">
                                  <div className="col-lg-9 text-center">
                                      <p className="banner-title">{item.title}</p>
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
            next={next}
            previous={previous}
        >
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    );
};

export default BannerCarousel;
