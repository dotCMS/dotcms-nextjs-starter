import React from 'react';
import { shallow } from 'enzyme';
import NewsDetail from '../../Components/News/NewsDetail';
import toJSON from 'enzyme-to-json';

import { newsMock } from '../../TestUtils/news';

describe('<NewsDetail />', () => {
    it('renders NewsDetail correctly', () => {
        const wrapper = shallow(
            <NewsDetail news={newsMock} />
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
