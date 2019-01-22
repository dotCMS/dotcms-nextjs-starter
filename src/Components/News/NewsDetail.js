import React from 'react';
import PropTypes from 'prop-types';

const NewsDetail = ({ news }) => {
  const {title, sysPublishDate, image, story} = news;
  return (
    <>
      <h3>{title}</h3>
      <h5>{sysPublishDate}</h5>
      <img alt='' src={image}></img>
      <p>{story}</p>
    </>
  );
};

NewsDetail.propTypes = {
  news: PropTypes.object.isRequired
};

export default NewsDetail;
