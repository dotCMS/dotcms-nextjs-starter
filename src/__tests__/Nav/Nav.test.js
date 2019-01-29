import React from 'react';
import { shallow } from 'enzyme';
import wait from 'waait';
import { Link } from 'react-router-dom';


import Nav from '../../Components/Nav/Nav';

import DotCMSApi from '../../libs/dotcms.api';
import toJSON from "enzyme-to-json";

const NavResponse = {
    entity: {
        children: [
            {
                href: '/about',
                title: 'About Us',
                folder: '123',
                children: []

            },
            {
                href: '/products',
                title: 'Products',
                folder: '456',
                children: []
            },
            {
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
            }
        ]
    }
};

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

    it('should have BootstrapNav and pill in true', () => {
        expect(wrapper.find('Nav').props().pills).toBe(true);
    });

    it('should expand menu', async () => {
        expect(wrapper.find('Collapse').props().isOpen).toBe(false);

        wrapper.find('NavbarToggler').simulate('click');
        await wrapper.update();
        await wait();

        expect(wrapper.find('Collapse').props().isOpen).toBe(true);
    });
});