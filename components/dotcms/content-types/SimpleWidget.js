import htmlParser from '../../../utilities/htmlParser';
import styled, { css } from 'styled-components';

const FormBooking = css`
    /* background: red;
    padding: 3rem;
    margin-bottom: 3rem; */
`;

const identifierMap = {
    'df591adf-10fe-461a-a12e-f847df0fd2fb': FormBooking
};

const WidgetContainer = styled.div`
    ${(props) => identifierMap[props.identifier] || null};
`;

export default function SimpleWidget({ rendered, identifier }) {
    return <WidgetContainer identifier={identifier}>{htmlParser({ content: rendered })}</WidgetContainer>;
}
