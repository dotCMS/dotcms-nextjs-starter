import parseContent from './parseContent';

function SimpleWidget(props) {
    return parseContent({ content: props.rendered });
}

export default SimpleWidget;
