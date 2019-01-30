import React from 'react';
import PropTypes from 'prop-types';

const NewsDetail = ({ news }) => {
    const { title, sysPublishDate, image, story } = news;
    return (
        <>
            <h3>{title}</h3>
            <h5>{sysPublishDate}</h5>
            <img className='news-detail-img' alt={title} src={image} />
            <div dangerouslySetInnerHTML={{ __html: story }} />
        </>
    );
};

NewsDetail.propTypes = {
    news: PropTypes.shape({
        image: PropTypes.string,
        sysPublishDate: PropTypes.string,
        title: PropTypes.string,
        story: PropTypes.string
    })
};

NewsDetail.defaultProps = {
    news: {
        image: '',
        sysPublishDate: '',
        title: '',
        story: ''
    }
};

export default NewsDetail;
