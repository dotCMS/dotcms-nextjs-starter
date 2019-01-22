import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../Components/Shared/Pagination';
import toJSON from 'enzyme-to-json';

describe('<Pagination />', () => {
    it('renders pagination correctly', () => {
        const pageSize = 9;
        const totalItems = 25;
        const wrapper = shallow(
            <Pagination
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={() => {}}
            />
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should call and send page number', async () => {
        const pageSize = 9;
        const totalItems = 25;
        const pageChange = jest.fn();
        const wrapper = shallow(
            <Pagination
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={pageChange}
            />
        );
        wrapper
            .find('PaginationLink')
            .at(1)
            .simulate('click');
        expect(pageChange).toHaveBeenCalledWith(1);
        expect(wrapper.state().activePage).toBe(1);
    });
});
