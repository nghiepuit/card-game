import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import cn from "classnames";
import PropTypes from "prop-types";
import React from "react";

function getModalStyle(small) {
  const top = 100;
  const left = small ? 35 : 30;

  return {
    top: `${top}px`,
    left: `${left}%`,
    outline: 0
  };
}

const styles = theme => ({
  root: {
    overflowY: "scroll"
  },
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: 734,
    marginBottom: 100
  },
  wrapTitle: {
    height: 66,
    backgroundColor: "#FCEC4F",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    color: "#000000"
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "ClanPro-Bold"
  },

  close: {
    cursor: "pointer"
  },
  container: {
    padding: "20px 20px"
  },
  small: {
    width: "520px !important"
  }
});
class UpsertModal extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    content: PropTypes.object,
    small: PropTypes.bool,
    isShow: PropTypes.bool,
    style: PropTypes.any
  };

  render() {
    const {
      classes,
      title,
      isShow,
      onClose,
      content,
      style,
      small
    } = this.props;

    return (
      <div>
        <Modal
          aria-describedby="simple-modal-description"
          aria-labelledby="simple-modal-title"
          className={classes.root}
          disableBackdropClick
          onClose={onClose}
          open={isShow}
        >
          <div
            className={cn(classes.paper, small && classes.small)}
            style={getModalStyle(small)}
          >
            <div className={classes.wrapTitle}>
              <span className={classes.title}>{title}</span>
              <i
                className={"icon-x dialog-remove " + classes.close}
                onClick={onClose}
              />
            </div>
            <div className={style ? style : classes.container}>{content}</div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(UpsertModal);
