import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

const styles = () => ({
  wrapButton: {
    borderRadius: 0,
    border: "solid 1px #e3e3e3",
    height: 44,
    color: "#2b2b2b",
    fontFamily: "ClanPro-News",
    fontSize: 14,
    fontWeight: "bold",
    padding: "0 15px",
    backgroundImage: "linear-gradient(to bottom, #f8f8f8, #ededed)",
    margin: "0 2px"
  }
});
class CommonButton extends React.Component {
  render() {
    const { text, style, onClick, classes } = this.props;
    return (
      <Button
        className={classes.wrapButton}
        disableFocusRipple
        disableRipple
        onClick={onClick}
        style={style ? style : {}}
        variant="text"
      >
        {text}
      </Button>
    );
  }
}
CommonButton.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
};
export default withStyles(styles)(CommonButton);
