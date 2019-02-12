import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Header from '../../Components/Layout/Header';

describe('<Header />', () => {
    it('renders and matches snapshot', () => {
        const wrapper = shallow(<Header />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
