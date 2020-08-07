import React from 'react';
import styled from 'styled-components';
import DotCMSImage from '../components/DotCMSImage'

const DetailContainer = styled.div`
    width: 50%;
    .title {
        margin-bottom: 0;
    }
    .title,
    .date {
        display: block;
        text-align: center;
    }
    .date {
        margin-top: -0.5rem;
        color: #444;
    }
    .content {
        margin-top: 1rem;
    }
`;

function SinglePageDetail({
    pageRender: {
        urlContentMap: { title, body, description, publishDate, image }
    }
}) {
    return (
        <DetailContainer className="container">
            <h2 className="title">{title}</h2>
            <span className="date">{new Date(publishDate).toDateString()}</span>
            <div className="content" dangerouslySetInnerHTML={{ __html: body || description }} />
            <DotCMSImage
                className="figure"
                alt={title}
                path={`${process.env.NEXT_PUBLIC_DOTCMS_HOST}${image}`}
            />
        </DetailContainer>
    );
}

export default SinglePageDetail;
