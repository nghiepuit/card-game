import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = () => ({
  footer: {
    height: "77px",
    borderTop: "1px solid #e3e3e3",
    justifyContent: "flex-start",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.07)",
    bottom: 0,
    width: "100%",
    marginTop: "100px"
  },
  text: {
    color: "#2b2b2b",
    fontSize: "12px"
  }
});

class Footer extends Component {
  render() {
    const { classes } = this.props;
    let date = new Date();
    let year = date.getFullYear();
    return (
      <footer className={classes.footer}>
        <span className={classes.text}>&copy; {year} TIKI</span>
      </footer>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
