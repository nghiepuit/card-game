import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const styles = theme => ({
  handleButton: {
    padding: "10px 14px",
    textTransform: "uppercase",
    backgroundColor: theme.palette.yellow.main,
    fontSize: "14px",
    fontWeight: "bold",
    borderColor: theme.palette.secondary.light
  }
});

class NotFoundPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>Not Found Page</h1>
        <NavLink to="/">
          <Button className={classes.handleButton}
            variant="contained">
            Back to group
          </Button>
        </NavLink>
      </div>
    );
  }
}

NotFoundPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotFoundPage);
