import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HelmetProvider } from 'react-helmet-async';

// redux
// import { Provider } from 'react-redux';
// import store from './store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: 0,
      // cacheTime: 1,
      // staleTime: 1 * 1000,
      // staleTime: 60 * 1000,
    }
  }
});

// 並列モード(Concurrent Mode)を使用する
const rootdiv = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootdiv);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Router>
          <App />
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </Router>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
