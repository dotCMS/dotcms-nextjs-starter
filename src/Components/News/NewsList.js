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
    news: PropTypes.array.isRequired
};

export default NewsList;
