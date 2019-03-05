import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { StaticRouter } from 'react-router';
import wait from 'waait';
import PAGE_MOCK_FORMATTED from '../TestUtils/data';
import dotCMSApi from '../dotcmsApi';

describe('<App />', () => {
    beforeEach(() => {
        dotCMSApi.page.get = jest.fn().mockImplementation(
            () =>
                new Promise((resolve, reject) => {
                    resolve({ ...PAGE_MOCK_FORMATTED });
                })
        );
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

    it('renders client side with page', async () => {
        const context = {};
        const location = { pathname: 'someLocation', search: '?lang=en' };
        const div = document.createElement('div');
        ReactDOM.render(
            <StaticRouter location={location} context={context}>
                <App />
            </StaticRouter>,
            div
        );
        await wait();
        expect(dotCMSApi.page.get).toHaveBeenCalledWith({
            langCode: null,
            url: 'someLocation'
        });
        ReactDOM.unmountComponentAtNode(div);
    });
});
