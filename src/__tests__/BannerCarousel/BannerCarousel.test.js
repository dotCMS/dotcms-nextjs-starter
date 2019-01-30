import React from 'react';
import { shallow } from 'enzyme';
import BannerCarousel from '../../Components/BannerCarousel';
import toJSON from 'enzyme-to-json';

const bannersMock = [{
    src: 'url test',
    altText: 'alt text test',
    title: 'tile test',
    caption: 'caption test'
}];

describe('<BannerCarousel />', () => {
    it('renders banners carousel correctly', () => {
        const fieldsToDisplay = 'title,caption1';
        const wrapper = shallow(
            <BannerCarousel items={bannersMock} fieldsToDisplay={fieldsToDisplay} />
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('renders banners, without "title"', () => {
        const fieldsToDisplay = 'caption1';
        const wrapper = shallow(
            <BannerCarousel items={bannersMock} fieldsToDisplay={fieldsToDisplay} />
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('renders banners, without "caption"', () => {
        const fieldsToDisplay = 'title';
        const wrapper = shallow(
            <BannerCarousel items={bannersMock} fieldsToDisplay={fieldsToDisplay} />
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('renders banners, without "title" & "caption"', () => {
        const fieldsToDisplay = '';
        const wrapper = shallow(
            <BannerCarousel items={bannersMock} fieldsToDisplay={fieldsToDisplay} />
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
