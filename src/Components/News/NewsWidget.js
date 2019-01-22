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

    async componentDidMount() {
        const fetchParams = {
            LANGUAGEIDVALUE: this.props.data.languageId,
            SORTBYVALUE: this.props.data.sortResultsBy
                ? this.props.data.sortResultsBy + '_dotraw'
                : 'title_dotraw',
            SORTTYPEVALUE: this.props.data.sortOrder1
                ? this.props.data.sortOrder1
                : 'asc',
            OFFSETVALUE: '0',
            PAGINATION: this.props.data.pagination,
            SIZEPERPAGE: this.props.data.itemsPerPage,
            NUMBEROFRESULTS: this.props.data.numberOfResults
        };

        DotCMSApi.esSearch('news', fetchParams)
            .then(response => response.json())
            .then(newsData => {
                this.setState(state => ({
                    ...state,
                    loading: false,
                    fetchParams: {
                        ...fetchParams,
                        TOTALITEMS: newsData.esresponse[0].hits.total
                    },
                    news: newsData.contentlets
                }));
            });
    }

    pageChange = async pageNumber => {
        const offSet = this.state.fetchParams.SIZEPERPAGE * pageNumber;
        const fetchParams = { ...this.state.fetchParams, OFFSETVALUE: offSet };

        DotCMSApi.esSearch('news', fetchParams)
            .then(response => response.json())
            .then(newsData => {
                this.setState(state => ({
                    ...state,
                    news: newsData.contentlets
                }));
            });
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
                                    totalItems={fetchParams.TOTALITEMS}
                                    pageSize={fetchParams.SIZEPERPAGE}
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
