import React from 'react';
import DotCMSApi from '../libs/dotcms.api';
import { Layout } from '../Components/Layout';
import NewsDetail from '../Components/News/NewsDetail';
import PageContext from '../PageContext';
import './NewsDetail.css';

class NewsDetailPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            news:
                props.location.state && props.location.state.news ? props.location.state.news : '',
            language: ''
        };
    }

    getNews() {
        DotCMSApi.esSearch('news', {
            detailedSearchQuery: `+News.urlTitle:${this.props.match.params.slug}`
        })
            .then((response) => response.json())
            .then((newsData) => {
                this.setState((state) => ({ ...state, news: newsData.contentlets[0] }));
            });
    }

    componentDidMount() {
        DotCMSApi.getConfiguration().then(() => {
            const language = DotCMSApi.page.setLanguage(this.props.location.pathname);
            this.setState((state) => ({ ...state, language }));
            if (!this.state.news) {
                this.getNews();
            }
        });
    }

    render() {
        return (
            <PageContext.Provider
                value={{
                    language: this.state.language
                }}
            >
                <Layout
                    {...{ header: true, footer: true }}
                    title={this.state && this.state.news ? this.state.news.title : ''}
                >
                    <NewsDetail {...this.state.news} />
                </Layout>
            </PageContext.Provider>
        );
    }
}

export default NewsDetailPage;
