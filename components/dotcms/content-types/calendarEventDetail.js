import React, { useContext } from 'react'
import PageContext from '../../../contexts/PageContext'
function calendarEventDetail(props) {

  const {
      pageRender: {
          urlContentMap: { title, publishDate, description, image }
      }
  } = useContext(PageContext);

  return (
      <div>
          <h2>{title}</h2>
          <span>{publishDate}</span>
          <div dangerouslySetInnerHTML={{ __html: description }} />
          <img src={`${process.env.NEXT_PUBLIC_DOTCMS_HOST}${image}`} />
      </div>
  );
}

export default calendarEventDetail
