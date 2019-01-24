import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import NoResults from '../../Components/Shared/NoResults';

describe('<NoResults />', () => {
    it('renders and matches snapshot', () => {
        const wrapper = shallow(<NoResults />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
