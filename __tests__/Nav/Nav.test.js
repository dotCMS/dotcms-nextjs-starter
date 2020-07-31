import React from 'react';
import { shallow } from 'enzyme';
import wait from 'waait';
import Nav from '../../components/dotcms/layout/Nav/Nav';
import toJSON from 'enzyme-to-json';

describe('<Nav />', () => {
    let wrapper;

    beforeEach(async () => {
        wrapper = await shallow(<Nav />);
    });

    it('renders nav correctly', async () => {
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should expand menu', async () => {
        expect(wrapper.find('Collapse').props().isOpen).toBe(false);

        wrapper.find('NavbarToggler').simulate('click');
        await wrapper.update();
        await wait();

        expect(wrapper.find('Collapse').props().isOpen).toBe(true);
    });
});
