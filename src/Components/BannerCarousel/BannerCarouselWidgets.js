import React from 'react';
import DotCMSApi from '../../libs/dotcms.api';
import { Spinner } from 'reactstrap';
import NoResults from '../Shared/NoResults';
import BannerCarousel from './BannerCarousel';

const sortResultsByMap = {
    title: 'title_dotraw',
    modDate: 'modDate'
};

class BannerCarouselWidgets extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            banners: []
        };
    }

    formatBannersData(banners) {
        return banners.map(banner => {
            return {
                src: banner.imageVersion,
                altText: banner.title,
                title: banner.title,
                caption: banner.caption1
            };
        });
    }

    getBannersItems() {
        const defaultEsParams = {
            languageId: this.props.data.languageId,
            numberOfResults: this.props.data.numberOfResults,
            sortOrder1: this.props.data.sortOrder1,
            sortResultsBy: sortResultsByMap[this.props.data.sortResultsBy]
        };

        DotCMSApi.esSearch('banner', defaultEsParams)
            .then(response => response.json())
            .then(bannerData => {
                this.setState(state => ({
                    ...state,
                    loading: false,
                    banners: this.formatBannersData(bannerData.contentlets)
                }));
            });
    }

    componentDidMount() {
        this.getBannersItems();
    }

    render() {
        const { loading, banners } = this.state;
        if (loading) {
            return <Spinner color="primary" />;
        } else {
            return banners && banners.length ? (
                <BannerCarousel
                    items={banners}
                    fieldsToDisplay={this.props.data.fieldsToDisplay}
                />
            ) : (
                <NoResults />
            );
        }
    }
}

export default BannerCarouselWidgets;
