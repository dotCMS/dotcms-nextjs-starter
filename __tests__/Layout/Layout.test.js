import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Layout } from '../../components/dotcms/layout/Layout';

describe('<Layout />', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Layout>
                <p>Hola Mundo</p>
            </Layout>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should render header, footer and title', () => {
        const wrapper = shallow(
            <Layout {...{ header: true, footer: true }} title="This is a title">
                <p>Hola Mundo</p>
            </Layout>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should render sidebar', () => {
        const wrapper = shallow(
            <Layout {...{ sidebar: { width: 'small', location: 'left', containers: [] } }}>
                <p>Hola Mundo</p>
            </Layout>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
