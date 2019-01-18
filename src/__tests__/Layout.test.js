import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Layout from '../Components/Layout';

describe('<Layout />', () => {
    it('should render  correctly', () => {
        const wrapper = shallow(
            <Layout>
                <p>Hola Mundo</p>
            </Layout>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});