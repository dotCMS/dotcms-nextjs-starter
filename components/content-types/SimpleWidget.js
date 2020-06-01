export default function SimpleWidget(props) {
    return <div dangerouslySetInnerHTML={{ __html: props.rendered }} />;
}
