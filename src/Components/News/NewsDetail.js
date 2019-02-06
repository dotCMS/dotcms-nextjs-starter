import React from 'react';
import PropTypes from 'prop-types';
import DateFormat from '../Shared/DateFormat';

const NewsDetail = ({ title, sysPublishDate, image, story }) => {
    return (
        <>
            {image ? <img className="news-detail__image" alt={title} src={image} /> : ''}
            <h5><DateFormat dateString={sysPublishDate} /></h5>
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
