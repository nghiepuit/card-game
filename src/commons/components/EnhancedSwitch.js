import purple from "@material-ui/core/colors/purple";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import cn from "classnames";
import PropTypes from "prop-types";
import React from "react";

const styles = theme => ({
  colorSwitchBase: {
    color: purple[300],
    "&$colorChecked": {
      color: purple[500],
      "& + $colorBar": {
        backgroundColor: purple[500]
      }
    }
  },
  colorBar: {},
  colorChecked: {},
  switchBase: {
    "&$checked": {
      color: theme.palette.common.white,
      "& + $bar": {
        backgroundColor: theme.palette.yellow.main
      }
    },
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp
    })
  },
  checked: {
    transform: "translateX(22px)",
    "& + $bar": {
      opacity: 1
    }
  },
  bar: {
    borderRadius: 13,
    width: 50,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: "solid 1px",
    borderColor: theme.palette.secondary.light,
    backgroundColor: "#ededed",
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  barDeactive: {
    backgroundColor: "#EDEDED"
  },
  icon: {
    width: 28,
    height: 28,
    backgroundColor: theme.palette.primary.light,
    position: "relative",
    "&:before": {
      position: "absolute",
      top: "8px",
      left: "8px",
      color: "#979797"
    }
  },
  iconChecked: {
    "&:before": {
      color: "#2D2D2D",
      top: "11px",
      left: "9px",
      fontSize: 8
    }
  },
  marginRight: {
    marginRight: "10px"
  },
  disabled: {
    cursor: "not-allowed !important",
    pointerEvents: "auto !important"
  },
  bgDisabled: {
    "&:before": {
      color: "#e3e3e3 !important"
    }
  },
  inputDisabledYellow: {
    backgroundColor: "#fff67f !important"
  },
  inputDisabledGray: {
    background: "#f6f6f6 !important"
  },
  disabledNotChecked: {
    "&:before": {
      color: "#e3e3e3 !important"
    }
  }
});

class EnhancedSwitch extends React.Component {
  handleChange = name => event => {
    const { onChange } = this.props;
    if (onChange) {
      this.props.onChange({
        name: name,
        value: !event.target.checked
      });
    }
  };

  render() {
    const { classes, name, checked, disabled } = this.props;

    return (
      <Switch
        checked={!checked}
        classes={{
          switchBase: classes.switchBase,
          bar: cn(
            classes.bar,
            checked === false && classes.barDeactive,
            disabled && checked === false && classes.inputDisabledYellow
          ),
          iconChecked: cn(
            classes.iconChecked,
            "icon-path",
            disabled && classes.bgDisabled
          ),
          icon: cn(
            classes.icon,
            "icon-x",
            disabled && classes.disabledNotChecked
          ),
          checked: classes.checked,
          disabled: classes.disabled
        }}
        className={classes.marginRight}
        disabled={disabled}
        disableRipple
        name={name}
        onChange={this.handleChange("checked")}
        value="checked"
      />
    );
  }
}

EnhancedSwitch.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  name: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool
};

EnhancedSwitch.defaultProps = {
  checked: true,
  disabled: false
};

export default withStyles(styles)(EnhancedSwitch);
