import React from 'react';
import { shallow } from 'enzyme';
import wait from 'waait';
import { Link } from 'react-router-dom';

import Nav from '../Components/Nav';

import DotCMSApi from '../libs/dotcms.api';

describe('<Nav />', () => {
    let wrapper;

    beforeEach(async () => {
        DotCMSApi.request = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve({
                    status: 200,
                    json: () =>
                        new Promise((resolve, reject) => {
                            resolve({
                                entity: {
                                    children: [
                                        {
                                            href: '/about',
                                            title: 'About Us',
                                            folder: '123'
                                        },
                                        {
                                            href: '/products',
                                            title: 'Products',
                                            folder: '456'
                                        }
                                    ]
                                }
                            });
                        })
                });
            });
        });

        wrapper = await shallow(<Nav />);
    });

    it('should call api correctly', () => {
        expect(DotCMSApi.request).toHaveBeenCalledWith({
            url: '/api/v1/nav//?depth=2'
        });
    });

    it('renders nav correctly', async () => {
        await wrapper.update();
        await wait();

        const navItems = wrapper.find('NavItem');
        expect(navItems.length).toEqual(2);

        const navLinks = wrapper.find('NavLink');
        expect(navLinks.map(item => item.props())).toEqual([
            { active: false, children: 'About Us', to: '/about', tag: Link },
            { active: false, children: 'Products', to: '/products', tag: Link }
        ]);
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
