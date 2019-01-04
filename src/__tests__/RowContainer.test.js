import React from 'react';
import { shallow } from 'enzyme';
import RowContainer from '../Components/RowContainer';

import { getMockRow } from '../TestUtils/data';

describe('<RowContainer />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow((<RowContainer row={getMockRow()} />));
    });

    it('renders columns correctly', () => {
        const columns = wrapper.find('ColumnContainer');
        const offsets = columns.map(col => col.props().col.offset);
        expect(columns.length).toBe(3);
        expect(offsets).toEqual([null, 3, 1]);
    });

    it('should have BootstrapRow', () => {
        const rows = wrapper.find('Row');
        expect(rows).toHaveLength(1);
    });
    

})
