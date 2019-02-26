import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Spinner from "react-spinkit";
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  root: {
    outline: 0
  },

  paper: {
    position: "absolute",
    padding: theme.spacing.unit * 4,
    outline: 0
  }
});

class Loading extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes, isShow } = this.props;
    return (
      <Modal
        aria-describedby="simple-modal-description"
        aria-labelledby="simple-modal-title"
        className={classes.root}
        open={isShow}
      >
        <div className={classes.paper}
          style={getModalStyle()}>
          <Spinner
            name="double-bounce"
            style={{ width: 80, height: 80, color: "#FCEC4F" }}
          />
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(Loading);
