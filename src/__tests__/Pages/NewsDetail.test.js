import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import DotCMSApi from '../../libs/dotcms.api';
import NewsDetailPage from '../../Pages/NewsDetail';
import { newsMock } from '../../TestUtils/news';
import wait from 'waait';

describe('<NewsDetailPage />', () => {
    let newsSearchData;

    beforeEach(() => {
        newsSearchData = {
            contentlets: [
                {
                    title: 'news1',
                    identifier: '1',
                    sysPublishDate: 'today',
                    lead: 'test'
                }
            ],
            esresponse: [
                {
                    hits: {
                        total: 1
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

        DotCMSApi.getConfiguration = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve({
                    status: 200,
                    json: () =>
                        new Promise((resolve, reject) => {
                            resolve();
                        })
                });
            });
        });

        DotCMSApi.page.setLanguage = jest.fn().mockImplementation(() => {
            return { code: 'en', id: 1 };
        });
    });

    it('renders NewsDetailPage correctly with NO Api fetch', () => {
        const wrapper = shallow(
            <NewsDetailPage
                location={{ state: { news: newsMock } }}
                match={{ params: { slug: '' }, path: '', url: '' }}
            />
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        expect(DotCMSApi.esSearch).not.toHaveBeenCalled();
    });

    it('renders NewsDetailPage correctly with Api fetch', async () => {
        const wrapper = shallow(
            <NewsDetailPage
                location={{ state: {} }}
                match={{
                    params: { slug: newsMock.urlTitle },
                    path: '',
                    url: ''
                }}
            />
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        expect(DotCMSApi.getConfiguration).toHaveBeenCalled();
        await wait();
        expect(wrapper.state().language).toEqual({ code: 'en', id: 1 });
        expect(DotCMSApi.esSearch).toHaveBeenCalledWith('news', {
            detailedSearchQuery: `+News.urlTitle:${newsMock.urlTitle}`
        });
    });
});
