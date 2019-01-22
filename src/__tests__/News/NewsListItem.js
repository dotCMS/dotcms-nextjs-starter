import React from 'react';
import { shallow } from 'enzyme';
import NewsListItem from '../../Components/News/NewsListItem';
import toJSON from 'enzyme-to-json';

import { newsMock } from '../../TestUtils/news';

describe('<NewsListItem />', () => {
    it('renders news correctly', () => {
        const conf = {
            fieldsToDisplay: 'title,image,summary,publishDate,summary'
        };
        const wrapper = shallow((<NewsListItem news={newsMock} configuration={conf} />));
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('renders news, without "title"', () => {
        const conf = {
            fieldsToDisplay: 'image,summary,publishDate,summary'
        };
        const wrapper = shallow((<NewsListItem news={newsMock} configuration={conf} />));
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('renders news, without "image"', () => {
        const conf = {
            fieldsToDisplay: 'title,summary,publishDate,summary'
        };
        const wrapper = shallow((<NewsListItem news={newsMock} configuration={conf} />));
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('renders news, without "publishDate"', () => {
        const conf = {
            fieldsToDisplay: 'title,summary,image,summary'
        };
        const wrapper = shallow((<NewsListItem news={newsMock} configuration={conf} />));
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('renders news, without "summary"', () => {
        const conf = {
            fieldsToDisplay: 'title,summary,publishDate,image'
        };
        const wrapper = shallow((<NewsListItem news={newsMock} configuration={conf} />));
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

})
