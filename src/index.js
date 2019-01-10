import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Page from './Page';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';


if (window.dotcmsPage) {
    ReactDOM.hydrate(
        <BrowserRouter>
            <Page data={window.dotcmsPage} />
        </BrowserRouter>,
        document.getElementById('root')
    );
} else {
    ReactDOM.render(<App data={{just: 'testing'}} />, document.getElementById('root'));
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
