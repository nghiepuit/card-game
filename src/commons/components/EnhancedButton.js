import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import cn from "classnames";
import spinner from "assets/images/spinner.gif";

const styles = theme => ({
  button: {
    padding: "14px 20px",
    textTransform: "uppercase",
    fontSize: "14px",
    fontWeight: "bold",
    borderColor: theme.palette.secondary.light,
    borderRadius: 0,
    boxShadow: "none",
    color: "#2b2b2b",
    fontFamily: "ClanPro-Bold",
    border: "solid 1px #e3e3e3",
    maxHeight: 44,
    "&>span": {
      lineHeight: "16px"
    }
  },
  primary: {
    backgroundImage: "linear-gradient(to bottom, #fff465, #ffed00)",
    backgroundColor: "#ffed00",
    "&:hover": {
      backgroundColor: "#fff362"
    },
    "&:disabled": {
      backgroundImage: "linear-gradient(to bottom, #fff465, #ffed00)",
      opacity: "0.4"
    }
  },
  default: {
    backgroundImage: "linear-gradient(to bottom, #f8f8f8, #ededed)",
    backgroundColor: "#ededed",
    "&:hover": {
      backgroundColor: "#ededed"
    },
    "&:disabled": {
      backgroundImage: "linear-gradient(to bottom, #f8f8f8, #ededed)",
      backgroundColor: "#ededed",
      border: "solid 1px #e3e3e3",
      cursor: "not-allowed"
    }
  },
  loading: {
    backgroundColor: "#000000 !important",
    backgroundImage: "linear-gradient(to bottom, #000000, #000000) !important",
    color: "#ffed00 !important",
    padding: "0 20px 0 0"
  },
  spinner: {
    maxHeight: 44
  }
});

const EnhancedButton = ({
  children,
  disabled,
  variant,
  classes,
  type,
  onClick,
  loading,
  className
}) => {
  return (
    <Button
      className={cn(
        classes.button,
        type === "primary" ? classes.primary : classes.default,
        loading && classes.loading,
        className
      )}
      color="primary"
      disableFocusRipple
      disableRipple
      disabled={disabled}
      onClick={onClick}
      variant={variant}
    >
      {loading && (
        <img alt="spinner"
          className={classes.spinner}
          src={spinner} />
      )}
      {children}
    </Button>
  );
};

EnhancedButton.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  classes: PropTypes.object,
  type: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.any
};

EnhancedButton.defaultProps = {
  variant: "contained",
  type: "default",
  loading: false
};

export default withStyles(styles)(EnhancedButton);
