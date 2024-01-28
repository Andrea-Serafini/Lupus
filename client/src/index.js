import React from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import LupusRouter from './react/common/LupusRouter';
import { HashRouter } from "react-router-dom";
//import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";


const container = document.getElementById('root');
const root = createRoot(container);

/*
//old version, used before gh-pages
root.render(
  <Provider store={store}>
    <React.Fragment>
      <BrowserRouter>
        <LupusRouter />
      </BrowserRouter>
    </React.Fragment>
  </Provider>
);
*/


root.render(
  <Provider store={store}>
    <React.Fragment>
      <HashRouter>
        <LupusRouter />
      </HashRouter>
    </React.Fragment>
  </Provider>
);

