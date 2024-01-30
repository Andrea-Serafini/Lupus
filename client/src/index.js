import React from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import LupusRouter from './react/common/LupusRouter';
import { HashRouter } from "react-router-dom";
//import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_file from "./i18n/en.json"
import it_file from "./i18n/it.json"
import { LANGUAGE } from "./util/config";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: en_file,
      it: it_file
    },
    lng: LANGUAGE, // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

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

