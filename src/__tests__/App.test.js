import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import DotCMSApi from '../libs/dotcms.api';
import { StaticRouter } from 'react-router';
import wait from 'waait';

import PAGE_MOCK_FORMATTED from '../TestUtils/data';

describe('<App />', () => {
    beforeEach(() => {
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

        DotCMSApi.page.get = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
            resolve({...PAGE_MOCK_FORMATTED});
        }));
    });

    it('renders with page data (SSR)', () => {
        const context = {};
        const div = document.createElement('div');
        ReactDOM.render(
            <StaticRouter location="someLocation" context={context}>
                <App {...PAGE_MOCK_FORMATTED} />
            </StaticRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders Client Side with page', async () => {
        const context = {};
        const div = document.createElement('div');
        ReactDOM.render(
            <StaticRouter location="someLocation" context={context}>
                <App />
            </StaticRouter>,
            div
        );
        expect(DotCMSApi.getConfiguration).toHaveBeenCalled();
        await wait();
        expect(DotCMSApi.page.setLanguage).toHaveBeenCalledWith('someLocation');
        expect(DotCMSApi.page.get).toHaveBeenCalledWith({pathname: 'someLocation'});
        ReactDOM.unmountComponentAtNode(div);
    });
});
