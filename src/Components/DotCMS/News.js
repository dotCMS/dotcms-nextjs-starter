import React from 'react';
import PropTypes from 'prop-types';
import DateFormat from '../Shared/DateFormat';

const NewsDetail = ({ title, sysPublishDate, image, story }) => {
    var desc = (story + "") ;
    desc = desc.length>200 ? story.substring(0,200) : story
    desc+="...";


    return (
        <>
            {image ? <img className="news-detail__image" alt={title} src={image} /> : ''}
            <h5><DateFormat dateString={sysPublishDate} /></h5>
            <div dangerouslySetInnerHTML={{ __html: desc }} />
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
