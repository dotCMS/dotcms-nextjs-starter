import { Component } from 'react';
import PropTypes from 'prop-types';
import BannerCarousel from './BannerCarousel';

class BannerCarouselWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    state = {
        items: []
    };

    componentDidMount() {
        fetch(`/api/content/id/${this.props.identifier}/depth/1`)
            .then(response => response.json())
            .then(({ contentlets }) => {
                this.setState({
                    ...this.state,
                    items: contentlets ? contentlets[0].banners : []
                });
            })
            .catch(error => console.error(error));
    }

    render() {
        return this.state.items ? <BannerCarousel {...this.state} /> : '';
    }
}

BannerCarouselWidget.propTypes = {
    identifier: PropTypes.string.isRequired
};

BannerCarouselWidget.defaultProps = {
    identifier: ''
};

export default BannerCarouselWidget;
