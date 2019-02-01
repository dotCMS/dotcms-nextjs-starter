import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import DateFormat from '../../Components/Shared/DateFormat';

describe('<DateFormat />', () => {
    it('renders and matches snapshot', () => {
        const wrapper = shallow(<DateFormat dateString="2016-01-25 07:47:00.0" />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
