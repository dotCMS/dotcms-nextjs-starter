import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';


if (window.dotcmsPage) {
    ReactDOM.hydrate(
        <Router>
            <App data={window.dotcmsPage} />
        </Router>,
        document.getElementById('root')
    );
} else {
    ReactDOM.render(
        <Router>
            <App />
        </Router>,
        document.getElementById('root')
    );
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
