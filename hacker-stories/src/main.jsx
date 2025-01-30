import { createRoot } from 'react-dom/client';

import './index.css';

import Context from './Context.jsx';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <Context>
    <App />
  </Context>
);
