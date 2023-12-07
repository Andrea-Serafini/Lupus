import React from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import LupusRouter from './react/common/LupusRouter';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <React.Fragment>
      <BrowserRouter>
        <LupusRouter />
      </BrowserRouter>
    </React.Fragment>
  </Provider>
);

/*

root.render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <LupusRouter />
      </BrowserRouter>
    </Provider>
  </React.Fragment>
);

*/

/*root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LupusRouter />
    </BrowserRouter>
  </React.StrictMode>
);*/


//import App from "./App";
/*root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>);*/
