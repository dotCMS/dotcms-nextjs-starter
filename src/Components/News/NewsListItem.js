import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'reactstrap';

const NewsListItem = ({ news, fieldsToDisplay }) => {
    const displayedFields = fieldsToDisplay.split(',');
    return (
        <Media className="news-list-row" tag="li">
            {displayedFields.includes('image') ? (
                <Media left href={`/news-events/news/${news.identifier}`}>
                    <Media object src={news.image} alt="image" />
                </Media>
            ) : (
                ''
            )}
            <Media body>
                {displayedFields.includes('title') ? (
                    <Media heading>
                        <a href={`/news-events/news/${news.identifier}`}>
                            {news.title}
                        </a>
                    </Media>
                ) : (
                    ''
                )}
                {displayedFields.includes('publishDate') ? (
                    <h5>news.sysPublishDate</h5>
                ) : (
                    ''
                )}
                {displayedFields.includes('summary') ? news.lead : ''}
            </Media>
        </Media>
    );
};

NewsListItem.propTypes = {
    fieldsToDisplay: PropTypes.string,
    news: PropTypes.object.isRequired
};

export default NewsListItem;
