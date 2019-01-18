import React from "react";
import { shallow } from "enzyme";
import wait from "waait";
import { Link } from "react-router-dom";
import DotCMSApi from "../../libs/dotcms.api";
import Pagination from "../../Components/Shared/Pagination";

import News from "../../Pages/News";

function fillQuery(query, fetchParams) {
  query = query
    .replace("CONFHOSTVALUE", fetchParams.CONFHOSTVALUE)
    .replace("SORTBYVALUE", fetchParams.SORTBYVALUE)
    .replace("SORTTYPEVALUE", fetchParams.SORTTYPEVALUE)
    .replace("OFFSETVALUE", fetchParams.OFFSETVALUE)
    .replace("SIZEPERPAGE", fetchParams.SIZEPERPAGE);
  return query;
}

async function pageChange() {}

describe("<News />", () => {
  let wrapper;
  const conHostId = "48190c8c-42c4-46af-8d1a-0cd5db894797";
  let newsPageData;
  let newsSearchData;

  beforeEach(async () => {
    DotCMSApi.sites.getCurrentSite = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          identifier: conHostId
        });
      });
    });

    newsSearchData = {
      contentlets: [
        {
          title: "news1"
        },
        {
          title: "news2"
        },
        {
          title: "news3"
        }
      ],
      esresponse: [
        {
          hits: {
            total: 25
          }
        }
      ]
    };

    DotCMSApi.request = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          status: 200,
          json: () =>
            new Promise((resolve, reject) => {
              resolve(newsSearchData);
            })
        });
      });
    });

    newsPageData = {
      sortResultsBy: "title",
      sortOrder1: "asc",
      pagination: true,
      itemsPerPage: 30,
      numberOfResults: 9
    };
  });

  it("should render NewsList & Pagination components", async () => {
    wrapper = shallow(<News data={newsPageData} />);
    await wait();
    expect(DotCMSApi.sites.getCurrentSite).toHaveBeenCalled();

    const fetchParams = {
      CONFHOSTVALUE: conHostId,
      SORTBYVALUE: newsPageData.sortResultsBy + "_dotraw",
      SORTTYPEVALUE: newsPageData.sortOrder1,
      OFFSETVALUE: "0",
      SIZEPERPAGE: newsPageData.pagination
        ? newsPageData.itemsPerPage
        : newsPageData.numberOfResults
    };

    const query = fillQuery(wrapper.state().query, fetchParams);

    const params = {
      body: query,
      method: "POST",
      url: wrapper.state().url
    };
    expect(DotCMSApi.request).toHaveBeenCalledWith(params);

    expect(wrapper.find("NoResults").exists()).toBeFalsy();

    const newsList = wrapper.find("NewsList");
    expect(newsList.props()).toEqual({
      configuration: newsPageData,
      news: newsSearchData.contentlets
    });

    const pagination = wrapper.find(Pagination);
    expect(pagination.prop("sizePerPage")).toEqual(fetchParams.SIZEPERPAGE);
    expect(pagination.prop("totalItems")).toEqual(
      newsSearchData.esresponse[0].hits.total
    );
  });

  it("should render NewsList & NO Pagination components", async () => {
    newsPageData = { ...newsPageData, pagination: false };
    wrapper = shallow(<News data={newsPageData} />);
    await wait();

    expect(wrapper.find("NoResults").exists()).toBeFalsy();

    const newsList = wrapper.find("NewsList");
    expect(newsList.props()).toEqual({
      configuration: newsPageData,
      news: newsSearchData.contentlets
    });

    expect(wrapper.find("Pagination").exists()).toBeFalsy();
  });

  it("should render NoResults component", async () => {
    newsSearchData = {
      contentlets: [],
      esresponse: [
        {
          hits: {
            total: 0
          }
        }
      ]
    };

    DotCMSApi.request = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          status: 200,
          json: () =>
            new Promise((resolve, reject) => {
              resolve(newsSearchData);
            })
        });
      });
    });

    wrapper = shallow(<News data={newsPageData} />);
    await wait();
    expect(wrapper.find("NoResults").exists()).toBeTruthy();
    expect(wrapper.find("NewsList").exists()).toBeFalsy();
    expect(wrapper.find("Pagination").exists()).toBeFalsy();
  });
});
