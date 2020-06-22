import styled from 'styled-components';

export const Button = styled.a`
    color: white;
    background: var(--primary-purple);
    padding: 0.5rem var(--primary-spacing);
    text-decoration: none;
    border-radius: 3px;
    display: inline-block;
    text-transform: uppercase;
    font-size: 0.825rem;
    letter-spacing: 0.5px;
    font-weight: bold;
    &:hover {
        background: #ca5ce5;
        color: white;
    }
`;
