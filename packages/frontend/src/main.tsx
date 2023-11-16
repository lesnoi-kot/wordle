import ReactDOM from 'react-dom/client';

import { ToastsProvider } from './components/Toasts/ToastsProvider.tsx';
import App from './App.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ToastsProvider>
    <App />
  </ToastsProvider>,
  // </React.StrictMode>,
);
