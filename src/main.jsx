import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './styles.css';

hydrateRoot(document.getElementById('root'), <React.StrictMode><ErrorBoundary><App /></ErrorBoundary></React.StrictMode>);
