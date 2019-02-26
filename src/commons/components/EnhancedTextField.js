import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const styles = theme => ({
  bootstrapRoot: {
    padding: 0,
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  bootstrapInput: {
    borderRadius: 0,
    backgroundColor: theme.palette.common.white,
    border: "1px solid",
    borderColor: theme.palette.secondary.light,
    fontSize: 13,
    padding: "12px 15px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:disabled": {
      backgroundColor: theme.palette.secondary.light,
      cursor: "not-allowed",
      color: "#8D8D8D",
      opacity: 1
    }
  },
  textField: {
    width: "100%"
  },
  customInputRoot: {
    border: 0
  },
  customInputNoBorder: {
    border: 0,
    fontSize: 30,
    fontFamily: "ClanPro-Narr",
    fontWeight: 900
  }
});

class EnhancedTextField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleClickAway = this.handleClickAway.bind(this);
  }

  onChange(e) {
    const { onChange, onlyNumber } = this.props;
    if (onChange) {
      if (onlyNumber) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
          onChange(e);
        }
      } else {
        onChange(e);
      }
    }
  }

  handleClickAway(e) {
    if (this.props.onHandleClickAway) {
      this.props.onHandleClickAway(e);
    }
  }

  render() {
    const {
      classes,
      disabled,
      placeholder,
      name,
      multiline,
      autoFocus,
      defaultValue,
      id,
      rows,
      value,
      type,
      autoComplete,
      onBlur,
      onKeyPress,
      mode
    } = this.props;
    if (mode === "no-border") {
      const inputProps = {
        disableUnderline: true,
        classes: {
          root: classes.customInputRoot,
          input: classes.customInputNoBorder
        }
      };
      return (
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <TextField
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            className={classes.textField}
            defaultValue={defaultValue}
            disabled={disabled}
            id={id}
            InputProps={inputProps}
            multiline={multiline}
            name={name}
            onChange={this.onChange}
            placeholder={placeholder}
            rows={rows}
            type={type}
            value={value}
            onBlur={onBlur}
            onKeyPress={onKeyPress}
          />
        </ClickAwayListener>
      );
    } else {
      const inputProps = {
        disableUnderline: true,
        classes: {
          root: classes.bootstrapRoot,
          input: classes.bootstrapInput
        }
      };
      return (
        <TextField
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={classes.textField}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          InputProps={inputProps}
          multiline={multiline}
          name={name}
          onChange={this.onChange}
          placeholder={placeholder}
          rows={rows}
          type={type}
          value={value}
          onBlur={onBlur}
          onKeyPress={onKeyPress}
        />
      );
    }
  }
}

EnhancedTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onKeyPress: PropTypes.func,
  onChange: PropTypes.func,
  onHandleClickAway: PropTypes.func,
  name: PropTypes.string,
  multiline: PropTypes.bool,
  autoFocus: PropTypes.bool,
  defaultValue: PropTypes.any,
  id: PropTypes.string,
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.any,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  mode: PropTypes.string,
  onlyNumber: PropTypes.bool
};

EnhancedTextField.defaultProps = {
  autoComplete: "false",
  onlyNumber: false,
  mode: "default" // no-border
};

export default withStyles(styles)(EnhancedTextField);
