import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class DotPagination extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activePage: 0,
      totalItems: 0
    };
  }

  componentDidMount() {
    this.setState(state => ({
      ...state,
      totalItems: this.props.totalItems
    }));
  }

  pageChange(pageNumber) {
    this.setState(state => ({
      ...state,
      activePage: pageNumber
    }));

    this.props.onPageChange(pageNumber);
  }

  render() {
    const { activePage, totalItems } = this.state;
    const { pageSize } = this.props;
    const pages = Math.ceil(totalItems / pageSize) || 0;
    return (
      <>
        <Pagination className="dot-pagination" aria-label="Page navigation">
          {[...Array(pages)].map((x, i) => (
            <PaginationItem key={i} active={activePage === i}>
              <PaginationLink onClick={() => this.pageChange(i)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </Pagination>
      </>
    );
  }
};

DotPagination.propTypes = {
  pageSize: PropTypes.number,
  totalItems: PropTypes.number
};
