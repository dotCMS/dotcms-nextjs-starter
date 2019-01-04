import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import PAGE_MOCK_FORMATTED from '../TestUtils/data';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App data={PAGE_MOCK_FORMATTED.layout} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
