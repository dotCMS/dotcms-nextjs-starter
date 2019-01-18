import React from "react";
import PropTypes from "prop-types";
import NewsListRow from "./NewsListRow";
import { Media } from "reactstrap";

const NewsList = ({ news, configuration }) => {
  return (
    <>
      <Media className="news-list" list>
        {news.map((item, index) => (
          <NewsListRow news={item} key={index} configuration={configuration} />
        ))}
      </Media>
    </>
  );
};

NewsList.propTypes = {
  configuration: PropTypes.object.isRequired,
  news: PropTypes.array.isRequired
};

export default NewsList;
