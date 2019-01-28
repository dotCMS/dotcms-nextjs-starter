import React from 'react';
import DotCMSApi from '../../libs/dotcms.api';
import { Spinner } from 'reactstrap';
import NoResults from '../Shared/NoResults';
import BannerCarousel from './BannerCarousel';

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

    getBannersItems(fetchParams) {
        DotCMSApi.esSearch('banner', fetchParams)
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
        console.log('---this.props.data', this.props.data);
        this.getBannersItems(this.props.data);
    }

    render() {
        const { loading, banners } = this.state;
        if (loading) {
            return <Spinner color="primary" />;
        } else {
            return (
                <>
                    {banners && banners.length ? (
                        <>
                            <BannerCarousel
                                items={banners}
                                fieldsToDisplay={
                                    this.props.data.fieldsToDisplay || ''
                                }
                            />
                        </>
                    ) : (
                        <NoResults />
                    )}
                </>
            );
        }
    }
}

export default BannerCarouselWidgets;
