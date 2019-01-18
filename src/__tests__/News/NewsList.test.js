import React from 'react';
import { shallow } from 'enzyme';
import NewsList from '../../Components/News/NewsList';
import toJSON from 'enzyme-to-json';

import { newsMock } from '../../TestUtils/news';

describe('<NewsList />', () => {
    it('renders NewsList correctly', () => {
        let newsList = [];
        for (let i = 0, total = 5; i < total; i++) {
            newsList.push(newsMock);
        }
        const wrapper = shallow((<NewsList news={newsList} configuration={{}} />));
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

})
