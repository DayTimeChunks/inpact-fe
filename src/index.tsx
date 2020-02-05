import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import './index.css';
import './styles.css';

import { register } from './serviceWorker';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
register();
