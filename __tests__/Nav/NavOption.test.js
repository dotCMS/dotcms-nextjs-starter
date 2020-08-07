import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NavOption from '../../components/dotcms/layout/Nav/NavOption';
import { NavResponse } from '../../utils/test/navResponse';

describe('<NavOption />', () => {
    it('renders NavOption correctly', () => {
        const wrapper = shallow(<NavOption item={NavResponse.entity.children[0]} />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
