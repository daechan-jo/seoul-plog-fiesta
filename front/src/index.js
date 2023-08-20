import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.scss';
import './styles/mystyle.scss';
import './styles/global.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </Provider>
  </React.StrictMode>,
);
