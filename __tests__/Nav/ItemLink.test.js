import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';


describe('<RouterLink />', () => {
    it('renders and matches snapshot', () => {
        window.history.pushState({}, 'Test Title', '/test.html?lang=en');
        const props = {
            className: 'testCss',
            pathname: 'testPath',
            state: {
                id: 'testId',
                name: 'testName'
            }
        };
        const wrapper = shallow(<RouterLink {...props} />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
