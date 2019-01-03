import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import DotCMSApi from '../src/libs/dotcms.api';

if (window.dotcmsPage) {
    ReactDOM.hydrate(<App data={window.dotcmsPage} />, document.getElementById('root'));
} else {
    DotCMSApi.getPage({
        pathname: window.location.pathname
    }).then(data => {
        ReactDOM.render(<App data={data.layout} />, document.getElementById('root'));
    })
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
