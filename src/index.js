import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "commons/theme";
import RouterContainer from "core/router/RouterContainer";
import createHistory from "history/createBrowserHistory";
import { flatten } from "lodash";
import home from "modules/home";
import moment from "moment";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./assets/css/global.css";
import "./assets/css/nprogress.css";
import "./assets/css/reset.css";
import "./assets/icons/style.css";
import configureStore from "./redux/configureStore";
import * as serviceWorker from "./serviceWorker";
moment.locale("en");

/**
 * Register modules
 */
const routes = [
  home
];

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <RouterContainer
        history={history}
        routes={flatten(routes)}
      />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
