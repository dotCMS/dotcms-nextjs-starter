export default function SimpleWidget({ rendered, widgetTitle }) {
    return <div dangerouslySetInnerHTML={{ __html: rendered }} />;
}
