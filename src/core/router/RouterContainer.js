import { NotFoundPage, ScrollToTop } from "commons/components";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { renderRoutes } from "react-router-config";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

class RouterContainer extends React.Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired
  };
  
  constructor(props) {
    super(props);
    this.state = {
      isShow: true
    };
  }

  render() {
    const { history, routes } = this.props;
    const { isShow } = this.state;
    return isShow ? (
      <React.Fragment>
        <ConnectedRouter history={history}>
          <ScrollToTop>
            <Switch>
              {isEmpty(routes) ? (
                <Route component={NotFoundPage}
                  exact
                  path="/" />
              ) : (
                renderRoutes(routes)
              )}
              <Route component={NotFoundPage}
                path="*" />
            </Switch>
          </ScrollToTop>
        </ConnectedRouter>
      </React.Fragment>
    ) : (
      <div />
    );
  }
}

export default RouterContainer;

RouterContainer.propTypes = {};
