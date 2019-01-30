import React from 'react';
import DotCMSApi from '../libs/dotcms.api';
import Layout from '../Components/Layout';
import NewsDetail from '../Components/News/NewsDetail';
import './NewsDetail.css';

class NewsDetailPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        const { news } = props.location.state || {};
        this.state = {
            news: news
        };
    }

    getNews() {
        DotCMSApi.esSearch('news', {
            detailedSearchQuery: `+News.urlTitle:${this.props.match.params.slug}`
        })
            .then(response => response.json())
            .then(newsData => {
                this.setState(state => ({
                    ...state,
                    news: newsData.contentlets[0]
                }));
            });
    }

    componentDidMount() {
        if (!this.state.news) {
            this.getNews();
        }
    }

    render() {
        return (
            <Layout>
                <NewsDetail news={this.state.news} />
            </Layout>
        );
    }
}

export default NewsDetailPage;
