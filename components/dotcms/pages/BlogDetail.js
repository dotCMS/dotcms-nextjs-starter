import React, { useContext } from 'react'
import PageContext from '../../../contexts/PageContext';

function BlogDetail() {

  const {
      pageRender: {
          urlContentMap: { title, body, publishDate, image }
      }
  } = useContext(PageContext);

  return (
      <div>
          <h2>{title}</h2>
          <span>{publishDate}</span>
          <div dangerouslySetInnerHTML={{ __html: body }} />
          <img src={`${process.env.NEXT_PUBLIC_DOTCMS_HOST}${image}`} />
      </div>
  );
}

export default BlogDetail
