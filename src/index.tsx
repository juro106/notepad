import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider, QueryClient, QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HelmetProvider } from 'react-helmet-async';

import { Provider } from 'react-redux';
import store from 'store';
// redux
// import { Provider } from 'react-redux';
// import store from './store';

const queryCache = new QueryCache({
  onError: error => {
    console.log(error);
  },
  // onSuccess: data => {
  //   console.log('success');
  // }
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: 0,
      refetchOnWindowFocus: false,
      cacheTime: 300000,
      staleTime: Infinity,
      // staleTime: 5 * 60 * 1000,
    },
  },
  queryCache,
});

// 並列モード(Concurrent Mode)を使用する
const rootdiv = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootdiv);

root.render(
  <Provider store={store}>
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
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
