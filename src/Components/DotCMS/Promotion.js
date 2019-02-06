import React from 'react';
import PropTypes from 'prop-types';

const Promotion = ({ title, image, identifier}) => {


    return (
        <div className="promotion">
            {image ? <img className="promotion__image" alt={title} src={image} /> : ''}

  
        </div>
    );
};

Promotion.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
};

Promotion.defaultProps = {
    image: '',
};

export default Promotion;
