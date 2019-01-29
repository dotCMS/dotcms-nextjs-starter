import React from 'react';
import PropTypes from 'prop-types';
import NewsListItem from './NewsListItem';
import { Media } from 'reactstrap';

const NewsList = ({ news, fieldsToDisplay }) => {
    return (
        <Media className="news-list" list>
            {news.map((item, index) => (
                <NewsListItem
                    news={item}
                    key={index}
                    fieldsToDisplay={fieldsToDisplay}
                />
            ))}
        </Media>
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
