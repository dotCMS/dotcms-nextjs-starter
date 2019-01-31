import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NavDropDown from '../../Components/Nav/NavDropDown';
import { NavResponse } from '../../TestUtils/navResponse';

describe('<NavDropDown />', () => {
    it('renders NavOption correctly', () => {
        const wrapper = shallow(<NavDropDown options={NavResponse.entity.children[2]} />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
