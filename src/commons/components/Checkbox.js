import PropTypes from "prop-types";
import React, { Component } from "react";
import cn from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  customDefaultRadio: {
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
    width: 22,
    height: 22,
    "& span": {
      fontSize: 22
    }
  },
  disabled: {
    cursor: "not-allowed"
  }
});

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.setChecked = this.setChecked.bind(this);
  }

  setChecked() {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this.state.checked);
    }
  }

  render() {
    const { disabled, classes, checked } = this.props;
    let xhtml = null;
    if (disabled === true) {
      if (checked) {
        xhtml = (
          <span
            className={cn(
              "icon-checked-read-only",
              classes.checkedSize,
              "link",
              disabled && classes.disabled
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
              "icon-checkbox-read-only",
              "link",
              classes.checkedSize,
              disabled && classes.disabled
            )}
          />
        );
      }
    } else if (checked) {
      xhtml = (
        <span
          className={cn("icon-checkbox-checked", classes.checkedSize, "link")}
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
            "icon-checkbox",
            classes.customDefaultRadio,
            classes.size,
            "link"
          )}
          onClick={this.setChecked}
        />
      );
    }
    return xhtml;
  }
}

Checkbox.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func
};

export default withStyles(styles)(Checkbox);
