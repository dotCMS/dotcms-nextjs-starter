import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import CantRender from '../Components/CantRender';

describe('<CantRender />', () => {
    it('should render default values correctly', () => {
        const wrapper = shallow(
            <CantRender title="Hello World">
                <p>Hola Mundo</p>
            </CantRender>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should render color values correctly', () => {
        const wrapper = shallow(
            <CantRender color="warning" title="Hello World">
                <p>Hola Mundo</p>
            </CantRender>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
