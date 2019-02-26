import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EnhancedButton from "commons/components/EnhancedButton";
import PropTypes from "prop-types";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

class ConfirmDialog extends React.Component {
  state = {
    open: true
  };

  close = () => {
    this.setState({ open: false });
    removeElementReconfirm();
  };

  handleClickButton = button => {
    const { loading } = this.props;
    if (button.onClick) button.onClick();
    if (!loading) {
      this.close();
    }
  };

  render() {
    const { fullScreen, title, message, buttons, loading } = this.props;

    return (
      <div>
        <Dialog
          aria-labelledby="responsive-dialog-title"
          disableBackdropClick
          fullScreen={fullScreen}
          fullWidth
          id="intranet-dialog"
          maxWidth={"sm"}
          onClose={this.close}
          open={this.state.open}
        >
          <div className="wrapper-dialog">
            <DialogTitle className="responsive-dialog-title">
              <span className="dialog-title">{title}</span>
              <i className="dialog-remove icon-x"
                onClick={this.close} />
            </DialogTitle>
            <DialogContent>
              <DialogContentText className="responsive-dialog-text">
                {message}
              </DialogContentText>
            </DialogContent>
            <DialogActions className="responsive-dialog-button">
              {buttons.map((button, i) => (
                <EnhancedButton
                  color={button.color}
                  key={i}
                  loading={loading && button.isLoading}
                  onClick={() => this.handleClickButton(button)}
                >
                  {button.label}
                </EnhancedButton>
              ))}
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}

ConfirmDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  buttons: PropTypes.array.isRequired,
  childrenElement: PropTypes.func,
  classes: PropTypes.object,
  loading: PropTypes.any
};

ConfirmDialog.defaultProps = {
  buttons: [
    {
      label: "OK",
      color: "primary",
      onClick: () => null,
      className: "btnOK"
    },
    {
      label: "CANCEL",
      color: "primary",
      onClick: () => null,
      className: "btnCancel"
    }
  ],
  fullScreen: false
};

export default ConfirmDialog;
export function confirmDialog(properties) {
  createElementReconfirm(properties);
}

function createElementReconfirm(properties) {
  document.body.children[0].classList.add("react-confirm-alert-blur");
  const divTarget = document.createElement("div");
  divTarget.id = "react-confirm-alert";
  document.body.appendChild(divTarget);
  render(<ConfirmDialog {...properties} />, divTarget);
}

function removeElementReconfirm() {
  const target = document.getElementById("react-confirm-alert");
  unmountComponentAtNode(target);
  target.parentNode.removeChild(target);
}
