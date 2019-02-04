import React from 'react';
import PropTypes from 'prop-types';
import DateFormat from '../Shared/DateFormat';

const NewsDetail = ({ title, sysPublishDate, image, story }) => {
    return (
        <>
            <h3>{title}</h3>
            <h5>
                <DateFormat dateString={sysPublishDate} />
            </h5>
            {image ? <img className="news-detail-img" alt={title} src={image} /> : ''}
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
