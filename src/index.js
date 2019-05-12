// Core
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

// Instruments
import client from './client';
import './theme/init.css';

// Components
import App from './components/App';

if (__DEV__) {
    console.log('dev');
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
