import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'reactstrap';
import { Link } from 'react-router-dom';

const ItemLink = props => {
    return (
        <Link
            to={{
                pathname: props.pathname,
                state: props.state
            }}
        >
            {props.children}
        </Link>
    );
};

const NewsListItem = ({ news, fieldsToDisplay }) => {
    const displayedFields = fieldsToDisplay.split(',');
    return (
        <Media className="news-list-row" tag="li">
            {displayedFields.includes('image') ? (
                <ItemLink
                    pathname={`/news-events/news/${news.urlTitle}`}
                    state={news}
                >
                    <Media left>
                        <Media object src={news.image} alt="image" />
                    </Media>
                </ItemLink>
            ) : (
                ''
            )}
            <Media body>
                {displayedFields.includes('title') ? (
                    <Media heading>
                        <ItemLink
                            pathname={`/news-events/news/${news.urlTitle}`}
                            state={news}
                        >
                            {news.title}
                        </ItemLink>
                    </Media>
                ) : (
                    ''
                )}
                {displayedFields.includes('publishDate') ? (
                    <h5>{news.sysPublishDate}</h5>
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
    news: PropTypes.shape({
        identifier: PropTypes.string.isRequired,
        image: PropTypes.string,
        sysPublishDate: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        lead: PropTypes.string.isRequired
    }).isRequired
};

NewsListItem.defaultProps = {
    fieldsToDisplay: ''
};

export default NewsListItem;
