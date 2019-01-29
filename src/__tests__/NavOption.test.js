import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NavOption from "../Components/NavOption";

const itemMock = {
    href: '/products',
    title: 'Products',
    folder: '456',
};

describe('<NavOption />', () => {
    it('renders NavOption correctly', () => {
        const wrapper = shallow(<NavOption item={itemMock}/>);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
    
});
