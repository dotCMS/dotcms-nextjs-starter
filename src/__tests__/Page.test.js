import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Page from '../Page';

describe('<Page />', () => {
    it('renders rows correctly', () => {
        const wrapper = shallow((<Page data={{body: {rows: [{}, {}]}}} />));
        const rows = wrapper.find('RowContainer');
        expect(rows.length).toBe(2);
    });

    it('should render alert', () => {
        const wrapper = shallow((<Page data={{body: {}}} />));
        const cantRender = wrapper.find('CantRender');
        expect(cantRender.length).toBe(1);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

})
