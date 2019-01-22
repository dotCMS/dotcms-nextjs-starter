import React from 'react';
import { shallow } from 'enzyme';
import NewsListItem from '../../Components/News/NewsListItem';
import toJSON from 'enzyme-to-json';

import { newsMock } from '../../TestUtils/news';

describe('<NewsListItem />', () => {
    it('renders news correctly', () => {
        const fieldsToDisplay = 'title,image,summary,publishDate,summary';
        const wrapper = shallow(
            <NewsListItem news={newsMock} fieldsToDisplay={fieldsToDisplay} />
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('renders news, without "title"', () => {
        const fieldsToDisplay = 'image,summary,publishDate,summary';
        const wrapper = shallow(
            <NewsListItem news={newsMock} fieldsToDisplay={fieldsToDisplay} />
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('renders news, without "image"', () => {
        const fieldsToDisplay = 'title,summary,publishDate,summary';
        const wrapper = shallow(
            <NewsListItem news={newsMock} fieldsToDisplay={fieldsToDisplay} />
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('renders news, without "publishDate"', () => {
        const fieldsToDisplay = 'title,summary,image,summary';
        const wrapper = shallow(
            <NewsListItem news={newsMock} fieldsToDisplay={fieldsToDisplay} />
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('renders news, without "summary"', () => {
        const fieldsToDisplay = 'title,summary,publishDate,image';
        const wrapper = shallow(
            <NewsListItem news={newsMock} fieldsToDisplay={fieldsToDisplay} />
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
