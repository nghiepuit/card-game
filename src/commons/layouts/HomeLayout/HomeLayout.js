import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

const styles = () => ({
  wrapperHomeLayout: {
    overflow: "hidden"
  },
  container: {
    margin: "10px auto 0 auto",
    minHeight: 900,
    maxWidth: 1200
  },
  wrapperBody: {
    margin: "0 30px"
  },
  wrapperChildren: {
    margin: "0 auto",
    maxWidth: 1140,
    minHeight: "600px"
  }
});

class HomeLayout extends React.Component {
  render() {
    const { children, classes } = this.props;
    return (
      <div className={classes.wrapperHomeLayout}>
        <ToastContainer />
        <div className={classes.wrapperChildren}>{children}</div>
        <Footer />
      </div>
    );
  }
}

HomeLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any
};

export default withStyles(styles)(HomeLayout);
