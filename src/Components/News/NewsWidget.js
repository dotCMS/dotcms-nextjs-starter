import React from 'react';
import { Spinner } from 'reactstrap';
import NewsList from './NewsList';
import NoResults from '../Shared/NoResults';
import Pagination from '../Shared/Pagination';
import DotCMSApi from '../../libs/dotcms.api';

const sortResultsByMap = {
    title: 'title_dotraw',
    date: 'news.syspublishdate',
    comments: 'news.commentscount'
};

class NewsWidget extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            news: [],
            pagination: {
                offset: 0,
                totalItems: 0
            }
        };
    }

    getNewsItems(pagination) {
        const defaultEsParams = {
            itemsPerPage: this.props.data.itemsPerPage,
            languageId: this.props.data.languageId,
            numberOfResults: this.props.data.numberOfResults,
            pagination: this.props.data.pagination,
            sortOrder1: this.props.data.sortOrder1,
            sortResultsBy: sortResultsByMap[this.props.data.sortResultsBy]
        };

        DotCMSApi.esSearch('news', {
            ...pagination,
            ...defaultEsParams
        })
            .then(response => response.json())
            .then(newsData => {
                this.setState(state => ({
                    ...state,
                    loading: false,
                    pagination: {
                        ...pagination,
                        totalItems: newsData.esresponse[0].hits.total
                    },
                    news: newsData.contentlets
                }));
            });
    }

    componentDidMount() {
        this.getNewsItems(this.state.pagination);
    }

    pageChange = pageNumber => {
        const offset = this.props.data.itemsPerPage * pageNumber;
        const pagination = { ...this.state.pagination, offset };
        this.getNewsItems(pagination);
    };

    render() {
        const { loading, news, pagination } = this.state;
        const { fieldsToDisplay, itemsPerPage, pagination: showPagination } = this.props.data;

        if (loading) {
            return <Spinner color="primary" />;
        } else {
            return (
                <>
                    {news && news.length ? (
                        <>
                            <NewsList news={news} fieldsToDisplay={fieldsToDisplay} />
                            {showPagination ? (
                                <Pagination
                                    totalItems={pagination.totalItems}
                                    pageSize={itemsPerPage}
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
