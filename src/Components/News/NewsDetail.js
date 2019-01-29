import React from 'react';
import PropTypes from 'prop-types';

const NewsDetail = ({ news }) => {
    const { title, sysPublishDate, image, story } = news;
    return (
        <>
            <h3>{title}</h3>
            <h5>{sysPublishDate}</h5>
            <img alt="" src={image} />
            <div dangerouslySetInnerHTML={{ __html: story }} />
        </>
    );
};

NewsDetail.propTypes = {
    news: PropTypes.shape({
        image: PropTypes.string,
        sysPublishDate: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        story: PropTypes.string.isRequired
    }).isRequired
};

export default NewsDetail;
