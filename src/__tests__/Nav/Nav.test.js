import React from 'react';
import { shallow } from 'enzyme';
import wait from 'waait';
import Nav from '../../Components/Nav/Nav';
import DotCMSApi from '../../libs/dotcms.api';
import toJSON from 'enzyme-to-json';
import { NavResponse } from '../../TestUtils/navResponse';

describe('<Nav />', () => {
    let wrapper;

    beforeEach(async () => {
        process.env.REACT_APP_DOTCMS_HOST = 'http://demo.dotcms.com';
        DotCMSApi.request = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve({
                    status: 200,
                    json: () =>
                        new Promise((resolve, reject) => {
                            resolve(NavResponse);
                        })
                });
            });
        });

        wrapper = await shallow(<Nav />);
    });

    it('should call api correctly', () => {
        expect(DotCMSApi.request).toHaveBeenCalledWith({
            url: 'http://demo.dotcms.com/api/v1/nav//?depth=3'
        });
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
