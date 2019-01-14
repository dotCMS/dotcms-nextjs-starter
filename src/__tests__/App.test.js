import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { StaticRouter } from 'react-router';

import PAGE_MOCK_FORMATTED from '../TestUtils/data';

describe('<App />', () => {
    it('renders without crashing', () => {
        const context = {};
        const div = document.createElement('div');
        ReactDOM.render(
            <StaticRouter location="someLocation" context={context}>
                <App data={PAGE_MOCK_FORMATTED.layout} />
            </StaticRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
