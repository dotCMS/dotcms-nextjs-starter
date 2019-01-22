import React from 'react';
import { shallow } from 'enzyme';
import wait from 'waait';
import DotCMSApi from '../../libs/dotcms.api';
import Pagination from '../../Components/Shared/Pagination';
import NewsWidget from '../../Components/News/NewsWidget';

describe('<NewsWidget />', () => {
    let wrapper;
    let newsPageData;
    let newsSearchData;

    beforeEach(async () => {
        newsSearchData = {
            contentlets: [
                {
                    title: 'news1'
                },
                {
                    title: 'news2'
                },
                {
                    title: 'news3'
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

        DotCMSApi.esSearch = jest.fn().mockImplementation(() => {
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
            fieldsToDisplay: '',
            languageId: '1',
            sortResultsBy: 'title',
            sortOrder1: 'asc',
            pagination: true,
            itemsPerPage: 30,
            numberOfResults: 9
        };
    });

    it('should render NewsList & Pagination components', async () => {
        wrapper = shallow(
            <NewsWidget data={newsPageData} fieldsToDisplay={''} />
        );
        await wait();

        const fetchParams = {
            SORTBYVALUE: newsPageData.sortResultsBy + '_dotraw',
            SORTTYPEVALUE: newsPageData.sortOrder1,
            OFFSETVALUE: '0',
            SIZEPERPAGE: newsPageData.pagination
                ? newsPageData.itemsPerPage
                : newsPageData.numberOfResults,
            LANGUAGEIDVALUE: newsPageData.languageId,
            PAGINATION: newsPageData.pagination,
            NUMBEROFRESULTS: newsPageData.numberOfResults
        };

        expect(DotCMSApi.esSearch).toHaveBeenCalledWith('news', fetchParams);
        expect(wrapper.find('NoResults').exists()).toBeFalsy();

        const newsList = wrapper.find('NewsList');
        expect(newsList.props()).toEqual({
            fieldsToDisplay: '',
            news: newsSearchData.contentlets
        });

        const pagination = wrapper.find(Pagination);
        expect(pagination.prop('pageSize')).toEqual(fetchParams.SIZEPERPAGE);
        expect(pagination.prop('totalItems')).toEqual(
            newsSearchData.esresponse[0].hits.total
        );
    });

    it('should render NewsList & NO Pagination components', async () => {
        newsPageData = { ...newsPageData, pagination: false };
        wrapper = shallow(
            <NewsWidget data={newsPageData} fieldsToDisplay={''} />
        );
        await wait();

        expect(wrapper.find('NoResults').exists()).toBeFalsy();

        const newsList = wrapper.find('NewsList');
        expect(newsList.props()).toEqual({
            fieldsToDisplay: '',
            news: newsSearchData.contentlets
        });

        expect(wrapper.find('Pagination').exists()).toBeFalsy();
    });

    it('should render NoResults component', async () => {
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

        DotCMSApi.esSearch = jest.fn().mockImplementation(() => {
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

        wrapper = shallow(<NewsWidget data={newsPageData} />);
        await wait();
        expect(wrapper.find('NoResults').exists()).toBeTruthy();
        expect(wrapper.find('NewsList').exists()).toBeFalsy();
        expect(wrapper.find('Pagination').exists()).toBeFalsy();
    });
});
