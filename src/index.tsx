import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a new instance of QueryClient
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Wrap our App component with QueryClientProvider
root.render(
  <React.StrictMode>
    {/* This sets up React Query in our application by creating a QueryClient instance and wrapping the App component with QueryClientProvider */}
    <QueryClientProvider client={queryClient}> 
      <App />
    </QueryClientProvider>
    <ToastContainer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
