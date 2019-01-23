import React from 'react';
import { Spinner } from 'reactstrap';
import NewsList from './NewsList';
import NoResults from '../Shared/NoResults';
import Pagination from '../Shared/Pagination';
import DotCMSApi from '../../libs/dotcms.api';
import './NewsWidget.css';

class NewsWidget extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            news: []
        };
    }

    getNewsItems(fetchParams) {
        DotCMSApi.esSearch('news', fetchParams)
            .then(response => response.json())
            .then(newsData => {
                this.setState(state => ({
                    ...state,
                    loading: false,
                    fetchParams: {
                        ...fetchParams,
                        totalItems: newsData.esresponse[0].hits.total
                    },
                    news: newsData.contentlets
                }));
            });
    }

    componentDidMount() {
        this.getNewsItems(this.props.data);
    }

    pageChange = pageNumber => {
        const offSet = this.state.fetchParams.itemsPerPage * pageNumber;
        const fetchParams = { ...this.state.fetchParams, offSet: offSet };
        this.getNewsItems(fetchParams);
    };

    render() {
        const { loading, news, fetchParams } = this.state;
        if (loading) {
            return <Spinner color="primary" />;
        } else {
            return (
                <>
                    {news && news.length ? (
                        <>
                            <NewsList
                                news={news}
                                fieldsToDisplay={
                                    this.props.data.fieldsToDisplay
                                }
                            />
                            {this.props.data.pagination ? (
                                <Pagination
                                    totalItems={fetchParams.totalItems}
                                    pageSize={fetchParams.itemsPerPage}
                                    onPageChange={this.pageChange}
                                />
                            ) : (
                                ''
                            )}
                        </>
                    ) : (
                        <NoResults />
                    )}
                </>
            );
        }
    }
}

export default NewsWidget;
