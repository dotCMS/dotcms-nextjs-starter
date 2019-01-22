import React from "react";
import { Spinner } from "reactstrap";
import NewsList from "./NewsList";
import NoResults from "../Shared/NoResults";
import Pagination from "../Shared/Pagination";
import DotCMSApi from "../../libs/dotcms.api";
import "./NewsWidget.css";

class NewsWidget extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      news: [],
      query: `{ 
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
      url: "/api/es/search"
    };

    this.pageChange = this.pageChange.bind(this);
  }

  async getNewsData(query) {
    return DotCMSApi.request({
      url: this.state.url,
      method: "POST",
      body: query
    }).then(response => response.json());
  }

  fillQuery(fetchParams) {
    let query = this.state.query
      .replace("CONFHOSTVALUE", fetchParams.CONFHOSTVALUE)
      .replace("SORTBYVALUE", fetchParams.SORTBYVALUE)
      .replace("SORTTYPEVALUE", fetchParams.SORTTYPEVALUE)
      .replace("OFFSETVALUE", fetchParams.OFFSETVALUE)
      .replace("SIZEPERPAGE", fetchParams.SIZEPERPAGE);
    return query;
  }

  async componentDidMount() {
    const currentSite = await DotCMSApi.sites.getCurrentSite();
    const fetchParams = {
      CONFHOSTVALUE: currentSite.identifier,
      SORTBYVALUE: this.props.data.sortResultsBy ? this.props.data.sortResultsBy + "_dotraw" : "title_dotraw",
      SORTTYPEVALUE: this.props.data.sortOrder1 ? this.props.data.sortOrder1 : "asc",
      OFFSETVALUE: "0",
      SIZEPERPAGE: this.props.data.pagination ? this.props.data.itemsPerPage : this.props.data.numberOfResults
    };

    const query = this.fillQuery(fetchParams);
    const newsData = await this.getNewsData(query);

    this.setState(state => ({
      ...state,
      loading: false,
      fetchParams: {
        ...fetchParams,
        TOTALITEMS: newsData.esresponse[0].hits.total
      },
      news: newsData.contentlets
    }));
  }

  async pageChange(pageNumber) {
    const offSet = this.state.fetchParams.SIZEPERPAGE * pageNumber;
    const fetchParams = { ...this.state.fetchParams, OFFSETVALUE: offSet };
    const query = this.fillQuery(fetchParams);
    const newsData = await this.getNewsData(query);

    this.setState(state => ({
      ...state,
      news: newsData.contentlets
    }));
  }

  render() {
    const { loading, news, fetchParams } = this.state;
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
                  pageSize={fetchParams.SIZEPERPAGE}
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

export default NewsWidget;
