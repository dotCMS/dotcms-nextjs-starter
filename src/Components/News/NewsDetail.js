import React from 'react';
import PropTypes from 'prop-types';

const NewsDetail = ({ title, sysPublishDate, image, story }) => {
    return (
        <>
            <h3>{title}</h3>
            <h5>{sysPublishDate}</h5>
            <img className="news-detail-img" alt={title} src={image} />
            <div dangerouslySetInnerHTML={{ __html: story }} />
        </>
    );
};

NewsDetail.propTypes = {
    image: PropTypes.string,
    sysPublishDate: PropTypes.string,
    title: PropTypes.string,
    story: PropTypes.string
};

NewsDetail.defaultProps = {
    image: '',
    sysPublishDate: '',
    title: '',
    story: ''
};

export default NewsDetail;
