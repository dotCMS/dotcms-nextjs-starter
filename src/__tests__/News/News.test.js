import React from 'react';
import { shallow } from 'enzyme';
import wait from 'waait';
import { Link } from 'react-router-dom';

import News from '../../Pages/News';

describe('<News />', () => {
    let wrapper;

    beforeEach(async () => {
        window.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve({
                    status: 200,
                    json: () =>
                        new Promise((resolve, reject) => {
                            resolve({
                                entity: {
                                    identifier: "48190c8c-42c4-46af-8d1a-0cd5db894797"
                                }
                            });
                        })
                });
            });
        });

        const newsSearchData = {
            contentlets: [{
                title: 'news1'
            },{
                title: 'news2'
            },{
                title: 'news3'
            }],
            esresponse: [
                {
                    hits: {
                        total: 25
                    }
                }
            ]
        };
        
        window.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve({
                    status: 200,
                    json: () =>
                        new Promise((resolve, reject) => {
                            resolve({
                                newsSearchData
                            });
                        })
                });
            });
        });

        const newsPageData = {
            sortResultsBy: 'title',
            sortOrder1: 'asc',
            pagination: true,
            itemsPerPage: 30,
            numberOfResults: 9
        };
        wrapper = await shallow(<News data={newsPageData} />);
    });

    xit('should call api correctly', async () => {
        expect(window.fetch).toHaveBeenCalledWith('/api/v1/site/currentSite', {
            headers: { DOTAUTH: expect.any(String) }
        });
        console.log('---window.fetch', window.fetch)
        await wait();
        // await wrapper.update();
        // expect(window.fetch).toHaveBeenCalledWith('/api/es/search', {
            // headers: { DOTAUTH: expect.any(String) }
        // });
        // process.nextTick(() => { // 6
        //     // expect(wrapper.state()).toEqual({
        //       // ... assert the set state
        //     // });
      
        //     window.fetch.mockClear(); // 7
        //     done(); // 8
        //   });
    });

    /*
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
    */
});
