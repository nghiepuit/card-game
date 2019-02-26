import PropTypes from "prop-types";
import React, { Component } from "react";
import cn from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  customDefaultRadio: {
    borderRadius: "50%",
    border: "solid 1px #000"
  },
  size: {
    fontSize: 20,
    "& span": {
      fontSize: 20
    }
  },
  checkedSize: {
    fontSize: 22,
    "& span": {
      fontSize: 22
    }
  }
});

class RadioButton extends Component {
  constructor(props) {
    super(props);
    this.setChecked = this.setChecked.bind(this);
  }

  setChecked() {
    const { onChange } = this.props;
    if (onChange) {
      onChange(!this.props.checked);
    }
  }

  render() {
    const { disabled, classes, checked, className } = this.props;
    let xhtml = null;
    if (disabled) {
      if (checked) {
        xhtml = (
          <span
            className={cn(
              "icon-radiobutton-readonly",
              classes.checkedSize,
              "link",
              className
            )}
          >
            <span className="path1" />
            <span className="path2" />
          </span>
        );
      } else {
        xhtml = (
          <span
            className={cn(
              "icon-radiobutton-readonly_no_checked",
              classes.checkedSize,
              "link",
              className
            )}
          >
            <span className="path1" />
            <span className="path2" />
          </span>
        );
      }
    } else if (checked) {
      xhtml = (
        <span
          className={cn(
            "icon-radiobutton-checked",
            classes.checkedSize,
            "link",
            className
          )}
          onClick={this.setChecked}
        >
          <span className="path1" />
          <span className="path2" />
        </span>
      );
    } else {
      xhtml = (
        <span
          className={cn(
            "icon-radiobutton",
            classes.customDefaultRadio,
            classes.size,
            "link",
            className
          )}
          onClick={this.setChecked}
        >
          <span className="path1" />
          <span className="path2" />
        </span>
      );
    }
    return xhtml;
  }
}

RadioButton.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.any
};

export default withStyles(styles)(RadioButton);
