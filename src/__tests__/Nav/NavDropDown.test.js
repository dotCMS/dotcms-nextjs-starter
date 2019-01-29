import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NavDropDown from "../../Components/Nav/NavDropDown";

const optionsMock = {
    href: '/resources',
    title: 'Resources',
    folder: '789',
    children: [
        {
            href: '/videos',
            title: 'Videos',
            folder: null
        },
        {
            href: '/blog',
            title: 'Blog',
            folder: null
        }
    ]
};

describe('<NavDropDown />', () => {
    it('renders NavOption correctly', () => {
        const wrapper = shallow(<NavDropDown options={optionsMock}/>);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

});
