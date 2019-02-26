import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import cn from "classnames";

const styles = theme => ({
  bgTooltip: {
    backgroundColor: "#000000",
    color: "white",
    borderRadius: 0,
    fontSize: 11,
    fontFamily: "ClanPro-News"
  },
  arrowPopper: {
    "&[x-placement*=\"bottom\"] $arrowArrow": {
      top: 0,
      left: 0,
      marginTop: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: "transparent transparent transparent #000000"
      }
    },
    "&[x-placement*=\"top\"] $arrowArrow": {
      bottom: 0,
      left: 0,
      marginBottom: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: "transparent transparent transparent #000000"
      }
    },
    "&[x-placement*=\"right\"] $arrowArrow": {
      left: 0,
      top: 5,
      marginLeft: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${
          theme.palette.primary.main
        } transparent transparent`
      }
    },
    "&[x-placement*=\"left\"] $arrowArrow": {
      right: 0,
      marginRight: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: "transparent transparent transparent #000000"
      }
    }
  },
  arrowArrow: {
    position: "absolute",
    fontSize: 4,
    width: "3em",
    height: "3em",
    "&::before": {
      content: "\"\"",
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid"
    }
  }
});

class CustomTooltip extends Component {
  state = {
    arrowRef: null
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };

  render() {
    const { classes, children, title, placement } = this.props;
    return (
      <Tooltip
        classes={{
          popper: classes.arrowPopper,
          tooltip: cn(
            classes.bgTooltip,
            placement === "right" && "marginLeft5px"
          )
        }}
        placement={placement}
        PopperProps={{
          popperOptions: {
            modifiers: {
              arrow: {
                enabled: Boolean(this.state.arrowRef),
                element: this.state.arrowRef
              }
            }
          }
        }}
        title={
          <React.Fragment>
            {title}
            <span className={classes.arrowArrow} ref={this.handleArrowRef} />
          </React.Fragment>
        }
      >
        {children}
      </Tooltip>
    );
  }
}

CustomTooltip.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  placement: PropTypes.string
};

CustomTooltip.defaultProps = {
  title: "Please add your tooltip",
  placement: "right"
};

export default withStyles(styles)(CustomTooltip);
