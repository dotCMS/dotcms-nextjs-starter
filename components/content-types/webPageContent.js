import React from 'react';
import DotCMSImage from '../DotCMSImage';
import RouterLink from '../RouterLink';
import { parse } from 'himalaya';

const KeysToComponentMap = {
    img: DotCMSImage,
    a: RouterLink
};

const getChildren = (children) => {
    if (children?.length) {
        return children.map((child) => {
            if (child.type === 'text') {
                return child.content;
            } else {
                return renderer(child);
            }
        });
    }
    return [];
};

const getAttr = (attributes) => {
    return attributes?.reduce((acc, current) => {
        return {
            ...acc,
            [current.key]: current.value
        };
    }, {});
};

function renderer(elements) {
    return elements.map((element) => {
        if (typeof element.tagName !== 'undefined') {
            return React.createElement(
                KeysToComponentMap[element.tagName] || element.tagName,
                getAttr(element.attributes),
                getChildren(element.children)
            );
        }
    });
}

export default function webPageContent(props) {
    const { body = '' } = props;
    const jsonAST = parse(body);
    return Boolean(jsonAST.length) ? renderer(jsonAST) : null;
}
