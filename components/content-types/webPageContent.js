function createMarkup(html) {
    return { __html: html };
}

export default function webPageContent(props) {
    return <div className="content" dangerouslySetInnerHTML={createMarkup(props.body)}></div>;
}
