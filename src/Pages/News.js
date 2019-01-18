import React from "react";
import { Spinner } from "reactstrap";
import NewsList from "../Components/News/NewsList";
import NoResults from "../Components/Shared/NoResults";
import Pagination from "../Components/Shared/Pagination";
import "./News.css";

class NewsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true,
      news: [],
      query:
        `{ 
            "query": {
                "bool": {
                    "must": {
                        "query_string" : {
                            "query" : "+contentType:news +languageId:1 +conHost:CONFHOSTVALUE"
                        }
                    }
                }
            },
            "sort" : [
                { "SORTBYVALUE" : {"order" : "SORTTYPEVALUE"}}
            ],
            "from": OFFSETVALUE,
            "size": SIZEPERPAGE
        }}`,
        url: '/api/es/search'
    };

    this.pageChange = this.pageChange.bind(this);
  }

  async getCurrentSite() {
    return fetch("/api/v1/site/currentSite", {
      headers: {
        DOTAUTH: Buffer.from(
          `${process.env.REACT_APP_USER_EMAIL}:${
            process.env.REACT_APP_USER_PASSWORD
          }`
        ).toString("base64")
      }
    })
      .then(response => response.json())
      .then(data => data.entity);
  }

  async getNewsData(query) {
    return fetch(this.state.url, {
      method: 'post',
      headers: {
        "Content-type": "application/json",
        DOTAUTH: Buffer.from(
          `${process.env.REACT_APP_USER_EMAIL}:${
            process.env.REACT_APP_USER_PASSWORD
          }`
        ).toString("base64")
      },
      body: query
    })
      .then(response => response.json());
  }

  fillQuery(fetchParams) {
    let query = this.state.query.replace("CONFHOSTVALUE", fetchParams.CONFHOSTVALUE)
        .replace("SORTBYVALUE", fetchParams.SORTBYVALUE)
        .replace("SORTTYPEVALUE", fetchParams.SORTTYPEVALUE)
        .replace("OFFSETVALUE", fetchParams.OFFSETVALUE)
        .replace("SIZEPERPAGE", fetchParams.SIZEPERPAGE);
    return query;
  }

  async componentDidMount() {
    const currentSite = await this.getCurrentSite();
    console.log('---kk', currentSite)
    const fetchParams = {
        CONFHOSTVALUE: currentSite.identifier,
        SORTBYVALUE: this.props.data.sortResultsBy ? this.props.data.sortResultsBy + '_dotraw' : "title_dotraw",
        SORTTYPEVALUE: this.props.data.sortOrder1 ? this.props.data.sortOrder1 : "asc",
        OFFSETVALUE: '0',
        SIZEPERPAGE: this.props.data.pagination ? this.props.data.itemsPerPage : this.props.data.numberOfResults
    };

    const query = this.fillQuery(fetchParams);
    const newsData = await this.getNewsData(query);
    const newsList = newsData.contentlets;

    this.setState(state => ({
      ...state,
      loading: false,
      fetchParams: {
          ...fetchParams, TOTALITEMS: newsData.esresponse[0].hits.total },
      news: newsList

    }));
  }

  async pageChange(pageNumber) {
    const offSet = this.state.fetchParams.SIZEPERPAGE * pageNumber;
    const fetchParams = { ...this.state.fetchParams, OFFSETVALUE: offSet};
    const query = this.fillQuery(fetchParams);
    const newsData = await this.getNewsData(query);

    this.setState(state => ({
      ...state,
      news: newsData.contentlets
    }));
  }

  render() {
    const {loading, news, fetchParams} = this.state;
    if (loading) {
        return <Spinner color="primary" />;
    } else {
        return (
            <>
              {news && news.length ? (
                <>
                  <NewsList news={news} configuration={this.props.data} />
                  {this.props.data.pagination ? (
                    <Pagination
                        totalItems={fetchParams.TOTALITEMS}
                        sizePerPage={fetchParams.SIZEPERPAGE}
                        onPageChange={this.pageChange}
                    />
                  ) : (
                    ""
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

export default NewsPage;
