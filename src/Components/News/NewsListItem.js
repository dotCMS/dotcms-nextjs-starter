import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardTitle, CardText, CardSubtitle, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { dateFormat } from '../../utils';
import './NewsListItem.css';

const ItemLink = (props) => {
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
        <Card>
            {displayedFields.includes('image') ? (
                <ItemLink pathname={`/news-events/news/${news.urlTitle}`} state={news}>
                    <CardImg top width="100%" src={news.image} alt="image" />
                </ItemLink>
            ) : (
                ''
            )}
            <CardBody>
                {displayedFields.includes('title') ? (
                    <CardTitle>
                        <ItemLink pathname={`/news-events/news/${news.urlTitle}`} state={news}>
                            {news.title}
                        </ItemLink>
                    </CardTitle>
                ) : (
                    ''
                )}
                {displayedFields.includes('publishDate') ? (
                    <CardSubtitle>{dateFormat(news.sysPublishDate)}</CardSubtitle>
                ) : (
                    ''
                )}
                {displayedFields.includes('summary') ? <CardText>{news.lead}</CardText> : ''}
            </CardBody>
        </Card>
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
