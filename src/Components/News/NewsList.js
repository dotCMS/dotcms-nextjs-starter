import React from 'react';
import PropTypes from 'prop-types';
import NewsListItem from './NewsListItem';
import { CardColumns } from 'reactstrap';
import './NewsList.css';

const NewsList = ({ news, fieldsToDisplay }) => {
    return (
        <CardColumns>
            {news.map((item, index) => (
                <NewsListItem
                    news={item}
                    key={index}
                    fieldsToDisplay={fieldsToDisplay}
                />
            ))}
        </CardColumns>
    );
};

NewsList.propTypes = {
    fieldsToDisplay: PropTypes.string.isRequired,
    news: PropTypes.arrayOf(
        PropTypes.shape({
            identifier: PropTypes.string.isRequired,
            image: PropTypes.string,
            sysPublishDate: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            lead: PropTypes.string.isRequired
        })
    ).isRequired
};

NewsList.defaultProps = {
    fieldsToDisplay: '',
};

export default NewsList;
