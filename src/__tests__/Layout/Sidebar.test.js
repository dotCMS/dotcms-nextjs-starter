import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Sidebar } from '../../Components/Layout';

describe('<Sidebar />', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Sidebar {...{ location: 'right', width: 'medium', containers: [{}, {}] }} />
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
