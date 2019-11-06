function createMarkup(html) {
    return { __html: html };
}

export default function webPageContent(props) {
    return (
        <div className="content">
            <h2>{props.title}</h2>
            <span dangerouslySetInnerHTML={createMarkup(props.body)} />
        </div>
    );
}
