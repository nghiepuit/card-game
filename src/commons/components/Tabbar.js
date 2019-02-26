import React from "react";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import cs from "classnames";

const styles = () => ({
  container: {
    display: "flex",
    marginBottom: 31
  },
  tabbarButton: {
    fontFamily: "ClanPro-Bold",
    borderRadius: 0,
    cursor: "pointer",
    padding: "0 9px",
    height: 49,
    borderRight: 0,
    border: "1px solid #e3e3e3",
    backgroundColor: "#f8f8f8",
    borderBottomColor: "#e3e3e3 !important",
    "&:focus": {
      background: "#fff",
      borderBottom: 0
    }
  },
  rectangle: {
    height: 1,
    backgroundColor: "#e3e3e3",
    flex: 1,
    marginTop: 48
  },
  lastItem: {
    borderRight: "1px solid #e3e3e3"
  },
  selectedTab: {
    backgroundColor: "#fff",
    borderBottom: 0
  }
});

class Tabbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: null
    };
    this.handleChangeTab = this.handleChangeTab.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedTab !== this.props.selectedTab ||
      this.props.selectedTab !== this.state.selectedTab
    ) {
      this.setState({
        selectedTab: this.props.selectedTab
      });
    }
  }

  handleChangeTab(value) {
    this.setState({
      selectedTab: value
    });
    const { onClick } = this.props;
    if (onClick) {
      onClick(value);
    }
  }

  render() {
    const { selectedTab } = this.state;
    const { data, classes, className } = this.props;
    return (
      <div className={cs(classes.container, className)}>
        {(data || []).map((item, index) => {
          return (
            <Button
              className={
                index === data.length - 1
                  ? cs(
                    classes.tabbarButton,
                    classes.lastItem,
                    selectedTab === item.value && classes.selectedTab
                  )
                  : cs(
                    classes.tabbarButton,
                    selectedTab === item.value && classes.selectedTab
                  )
              }
              disableFocusRipple
              disableRipple
              disabled={item.disabled}
              key={index}
              onClick={() => this.handleChangeTab(item.value, item.disabled)}
              variant="text"
            >
              {item.name}
            </Button>
          );
        })}
        {data && data.length > 0 && <div className={classes.rectangle} />}
      </div>
    );
  }
}
Tabbar.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  onClick: PropTypes.func,
  selectedTab: PropTypes.number,
  className: PropTypes.string
};
export default withStyles(styles)(Tabbar);
