import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { UserContextProvider } from './context/UserContext.tsx';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </StrictMode>,
  </BrowserRouter>
)
