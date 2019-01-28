import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

const NewsDetail = ({ news }) => {
    const { title, sysPublishDate, image, story } = news;
    return (
        <>
            <h3>{title}</h3>
            <h5>{sysPublishDate}</h5>
            <img alt="" src={image} />
            <p>{Parser(story)}</p>
        </>
    );
};

NewsDetail.propTypes = {
    news: PropTypes.object.isRequired
};

export default NewsDetail;
