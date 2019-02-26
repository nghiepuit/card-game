import {
  FormControl,
  InputAdornment,
  TextField,
  Avatar,
  Icon,
  Menu,
  MenuItem
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import cn from "classnames";
import { redirect_uri } from "constants/index";
import { useCheckMobile } from "helpers/Responsive";
import PropTypes, { oneOfType } from "prop-types";
import React, { Component } from "react";
import { AUTHORIZE_TOKEN, ROUTE } from "../../../constants";
import { showSelectPlaceholder } from "../../../helpers/CommonHelper";
import { Breadcrumbs } from "../../components";

const styles = theme => ({
  header: {
    marginTop: 100,
    marginBottom: "0"
  },
  headerMobile: {
    marginTop: 50
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0 auto",
    maxWidth: 1140,
    "&>div": {
      width: 450
    }
  },
  menu: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  },
  listMenu: {
    marginLeft: "auto",
    marginTop: 0,
    marginBottom: 0,
    display: "flex",
    flexDirection: "row"
  },
  breadcrumbs: {
    marginTop: 60,
    "& span": {
      color: "#757575"
    },
    paddingLeft: "calc((100% - 1140px) / 2)",
    paddingRight: "calc((100% - 1140px) / 2)"
  },
  breadcrumb: {},
  item: {
    display: "inline"
  },
  itemActive: {
    display: "inline"
  },
  logo: {
    minWidth: 170,
    minHeight: 24
  },
  logout: {
    cursor: "pointer"
  },
  avatar: {
    maxWidth: 40,
    maxHeight: 40,
    overflow: "hidden",
    border: "solid 1px black",
    borderRadius: "50%",
    marginLeft: 13
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  name: {
    fontFamily: "ClanPro-Bold",
    fontSize: 14,
    fontWeight: "bold"
  },
  role: {
    fontFamily: "ClanPro-News",
    color: "#757575",
    fontSize: 12
  },
  megaMenu: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    position: "relative",
    paddingLeft: "calc((100% - 1140px) / 2)",
    paddingRight: "calc((100% - 1140px) / 2)"
  },
  menu1st: {
    display: "flex",
    overflow: "visible",
    width: "100%"
  },
  menu1stMobile: {
    display: "flex",
    overflow: "visible",
    width: "100%",
    flexDirection: "column"
  },
  menuItem: {
    lineHeight: "40px",
    paddingTop: 15,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
  },
  menuName: {
    color: "#757575",
    fontSize: 14,
    fontFamily: "ClanPro-Bold",
    fontWeight: "bold",
    position: "relative",
    whiteSpace: "nowrap"
  },
  icon: {
    fontSize: 7,
    color: "#757575",
    height: 22,
    lineHeight: "20px",
    marginLeft: 4
  },
  active: {
    zIndex: 99,
    boxShadow: "0px 4px 0px white",
    borderTop: "solid 3px #000000",
    borderLeft: "solid 1px #e3e3e3",
    borderRight: "solid 1px #e3e3e3"
    // borderBottom: "solid 1px white"
  },
  activeMenuItem1stMobile: {},
  show: {
    display: "block"
  },
  textActive: {
    color: "#2b2b2b"
  },
  paper: {
    width: "100%"
  },
  wrapperMegaMenu: {},
  wrapperMegaMenuMobile: {
    display: "flex",
    flexDirection: "column"
  },
  menu2nd: {
    position: "absolute",
    width: "100%",
    minHeight: 230,
    background: "white",
    boxShadow: "0 3px 4px 0 rgba(0, 0, 0, 0.07);",
    border: "solid 1px #e3e3e3",
    marginTop: 0,
    display: "flex",
    zIndex: 88
  },
  menu2ndMobile: {},
  listMenu2nd: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: "calc((100% - 1140px) / 2)",
    height: "fit-content"
    // paddingRight: "calc((100% - 1140px) / 2)"
  },
  listMenu2ndMobile: {
    paddingLeft: "calc((100% - 1140px) / 2)",
    height: "fit-content"
  },
  menuItem2nd: {
    cursor: "pointer",
    margin: "14px 0",
    minWidth: 250
  },
  menuItem2ndMobile: {
    cursor: "pointer",
    minWidth: 250
  },
  nameItem2nd: {
    lineHeight: "30px",
    color: "#757575",
    padding: "6px 14px",
    fontFamily: "ClanPro-Bold",
    fontSize: 14,
    borderLeft: "solid 4px white",
    "&:hover": {
      color: "#2b2b2b",
      borderColor: "#ffed00"
    }
  },
  borderLeftActive: {
    color: "#2b2b2b",
    borderColor: "#ffed00"
  },
  activeIcon: {
    color: "#000000",
    fontWeight: "bold"
  },
  listMenu3rd: {
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 20,
    marginRight: 40,
    // width: "calc(100% - 460px)",
    maxHeight: 280,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    "& span": {
      padding: "8px 0",
      cursor: "pointer",
      fontFamily: "ClanPro-News",
      fontSize: 13,
      color: "#2b2b2b",
      minWidth: 250,
      "&:hover": {
        fontFamily: "ClanPro-Bold"
      }
    }
  },
  listMenu3rdMobile: {
    paddingLeft: 36,
    maxHeight: 280,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    "& span": {
      padding: "8px 0",
      cursor: "pointer",
      fontFamily: "ClanPro-News",
      fontSize: 13,
      color: "#2b2b2b",
      minWidth: 250,
      "&:hover": {
        fontFamily: "ClanPro-Bold"
      }
    }
  },
  wrapperLogo: {
    cursor: "pointer",
    paddingTop: 10
  },
  bootstrapInput: {
    cursor: "pointer",
    borderRadius: 0,
    backgroundColor: theme.palette.common.white,
    border: "1px solid",
    borderColor: "#4a4a4a",
    fontSize: 13,
    padding: "12px 15px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "\"Segoe UI\"",
      "Roboto",
      "\"Helvetica Neue\"",
      "Arial",
      "sans-serif",
      "\"Apple Color Emoji\"",
      "\"Segoe UI Emoji\"",
      "\"Segoe UI Symbol\""
    ].join(","),
    "&:disabled": {
      backgroundColor: "none",
      color: "#757575"
    }
  },
  bootstrapRoot: {
    padding: 0,
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  inputSearch: {
    margin: "16px 14px",
    cursor: "auto"
  },
  iconSearch: {
    position: "absolute",
    right: 15,
    cursor: "pointer",
    "&>i": {
      fontSize: 20,
      padding: 10,
      backgroundColor: "#000000"
    },
    color: "#ffed00"
  },
  overlayMenu: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    width: "100%",
    height: "101%",
    overflow: "auto",
    transition: "height 0.6s cubic-bezier(0.5, 1, 0.22, 1)",
    background: "#ffffff",
    zIndex: 9999,
    padding: "10px 16px"
  },
  iconX: {
    position: "absolute",
    right: 16,
    top: 10,
    fontSize: 24,
    zIndex: 99999
  },
  iconXProfile: {
    position: "absolute",
    right: 16,
    top: 10,
    fontSize: 24,
    zIndex: 9999,
    color: "#ffffff"
  },
  menuItemMobile: {
    lineHeight: "40px",
    color: "#757575",
    fontSize: 14,
    display: "flex",
    alignItems: "center"
  },
  overlayProfile: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    width: "100%",
    height: "101%",
    overflow: "auto",
    transition: "height 0.6s cubic-bezier(0.5, 1, 0.22, 1)",
    background: "#ffffff",
    zIndex: 999
  },
  profileDetail: {
    minHeight: 173,
    backgroundColor: "#000000",
    padding: "20px 16px",
    color: "#FFFFFF",
    display: "flex",
    flexDirection: "column"
  },
  iconProfileDetail: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    backgroundColor: "#9b9b9b"
  },
  textProfileDetail: {
    paddingLeft: 12
  },
  profileDetailName: {
    fontFamily: "ClanPro-Medium",
    fontSize: 18,
    lineHeight: "20px",
    color: "#ffed00"
  },
  profileItem: {
    padding: 20,
    borderBottom: "solid 1px #e3e3e3",
    display: "flex",
    alignItems: "center"
  },
  dropdownProfileIcon: {
    fontSize: 20
  },
  dropdownProfileText: {
    paddingLeft: 5,
    fontFamily: "ClanPro-News",
    fontSize: 13
  },
  wrapperUserProfile: {
    display: "flex",
    paddingTop: 20
  },
  iconLocal: {
    fontSize: 22
  },
  languagesDropdown: {
    marginLeft: 8
  },
  iconTranslation: {
    fontSize: 20
  },
  iconExpand: {
    lineHeight: "32px",
    fontSize: "22px"
  },
  text: {
    color: "#ffffff",
    fontFamily: "ClanPro-News",
    fontSize: 13
  },
  changeLanguages: {
    paddingTop: 20,
    display: "flex",
    alignItems: "center"
  },
  changeLocals: {
    display: "flex",
    alignItems: "center"
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item1stSelected: null
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.renderItem1st = this.renderItem1st.bind(this);
    this.renderItem1stMobile = this.renderItem1stMobile.bind(this);
    this.setMenu1st = this.setMenu1st.bind(this);
    this.setMenu2nd = this.setMenu2nd.bind(this);
    this.setMenu2ndMobile = this.setMenu2ndMobile.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleMouseHoverOutside = this.handleMouseHoverOutside.bind(this);
    this.gotoHomePage = this.gotoHomePage.bind(this);
    this.handleToggleNavMobile = this.handleToggleNavMobile.bind(this);
    this.handleToggleProfileMobile = this.handleToggleProfileMobile.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mouseover", this.handleMouseHoverOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseover", this.handleMouseHoverOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleMouseHoverOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.onMouseOutMenu1st();
    }
  }

  handleLogout() {
    const { logout } = this.props;
    const keys = Object.keys(sessionStorage);
    let loginFromAd = false;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key.includes("oidc.user")) {
        loginFromAd = true;
        break;
      }
    }
    if (logout) {
      logout();
    }
    if (loginFromAd) {
      const id_token = localStorage.getItem(AUTHORIZE_TOKEN);
      window.location.href = `https://login-dev.app.kaercher.com/connect/endsession?ui_locales=en&redirect_uri=https://login-dev.app.kaercher.com&post_logout_redirect_uri=${redirect_uri}&id_token_hint=${id_token}`;
    } else {
      this.props.navigate("/login");
    }
    localStorage.clear();
    sessionStorage.clear();
  }

  renderArrowIcon(item1stSelected, item) {
    const { classes } = this.props;
    let xhtml = null;
    if (item.subNavigations && item.subNavigations.length > 0) {
      if (item1stSelected && item.id === item1stSelected.id) {
        xhtml = (
          <span
            className={cn(
              "icon-arrow-up",
              classes.icon,
              item1stSelected && item.id === item1stSelected.id
                ? classes.activeIcon
                : ""
            )}
          />
        );
      } else {
        xhtml = <span className={cn("icon-arrow-down", classes.icon)} />;
      }
    }
    return xhtml;
  }

  renderItem1st(item) {
    const { item1stSelected } = this.state;
    const { classes } = this.props;
    let xhtml = null;
    if (item && item.isNotShow === false) {
      xhtml = (
        <li
          className={cn(
            item1stSelected && item.id === item1stSelected.id && classes.active
          )}
          key={item.id}
          onClick={e => this.setMenu1st(e, item, true)}
          onMouseOver={e => this.setMenu1st(e, item)}
        >
          <div className={classes.menuItem}>
            <span
              className={cn(
                classes.menuName,
                item1stSelected &&
                  item.id === item1stSelected.id &&
                  classes.active
                  ? classes.textActive
                  : ""
              )}
            >
              {item.navigationTranslation
                ? item.navigationTranslation.name
                : item.name}
            </span>
            {this.renderArrowIcon(item1stSelected, item)}
          </div>
        </li>
      );
    }
    return xhtml;
  }

  setMenu1st(event, item, isClicked = false) {
    if (item.subNavigations && item.subNavigations.length > 0) {
      const { item1stSelected } = this.state;
      if (
        !item1stSelected ||
        (item1stSelected && item1stSelected.id !== item.id)
      ) {
        this.setState({
          item1stSelected: item,
          item2ndSelected: null
        });
      }
    } else if (isClicked === true) {
      const { navigate } = this.props;
      switch (item.id) {
        case 1:
          return navigate(`${ROUTE.NEWS}`);
      }
    }
  }

  setMenu1stMobile(event, item, isClicked = false) {
    if (item.subNavigations && item.subNavigations.length > 0) {
      const { item1stSelected } = this.state;
      if (
        !item1stSelected ||
        (item1stSelected && item1stSelected.id !== item.id)
      ) {
        this.setState({
          item1stSelected: item,
          item2ndSelected: null
        });
      } else if (item1stSelected && item1stSelected.id === item.id) {
        this.setState({
          item1stSelected: null,
          item2ndSelected: null
        });
      }
    } else if (isClicked === true) {
      const { navigate } = this.props;
      switch (item.id) {
        case 1:
          return navigate(`${ROUTE.NEWS}`);
      }
    }
  }

  onMouseOutMenu1st() {
    this.setState({
      item1stSelected: null,
      item2ndSelected: null
    });
  }

  setMenu2nd(event, item) {
    this.setState({
      item2ndSelected: item
    });
  }

  setMenu2ndMobile(event, item) {
    const { item2ndSelected } = this.state;
    if (item2ndSelected && item2ndSelected.id === item.id) {
      this.setState({
        item2ndSelected: null
      });
    } else {
      this.setState({
        item2ndSelected: item
      });
    }
  }

  renderMenu2nd() {
    const { classes } = this.props;
    const { item2ndSelected } = this.state;
    let xhtml = null;
    if (item2ndSelected && item2ndSelected.subNavigations) {
      xhtml = (
        <div className={classes.listMenu3rd}>
          {item2ndSelected.subNavigations.map(item2nd => {
            return (
              <span key={item2nd.id}>
                {item2nd.navigationTranslation
                  ? item2nd.navigationTranslation.name
                  : item2nd.name}
              </span>
            );
          })}
        </div>
      );
    }
    return xhtml;
  }

  renderMenu2ndMobile() {
    const { classes } = this.props;
    const { item2ndSelected } = this.state;
    let xhtml = null;
    if (item2ndSelected && item2ndSelected.subNavigations) {
      xhtml = (
        <div className={classes.listMenu3rdMobile}>
          {item2ndSelected.subNavigations.map(item2nd => {
            return (
              <span key={item2nd.id}>
                {item2nd.navigationTranslation
                  ? item2nd.navigationTranslation.name
                  : item2nd.name}
              </span>
            );
          })}
        </div>
      );
    }
    return xhtml;
  }

  gotoHomePage() {
    this.props.navigate("/home");
  }

  getInputPropsSearch() {
    const { classes } = this.props;
    return {
      disableUnderline: true,
      classes: {
        root: classes.bootstrapRoot,
        input: cn(classes.bootstrapInput, classes.inputSearch)
      },
      endAdornment: (
        <InputAdornment className={classes.iconSearch}
          position="end">
          <i className={cn("icon-search")} />
        </InputAdornment>
      )
    };
  }

  renderLogo() {
    const { classes } = this.props;
    let xhtml = null;
    const isMobile = useCheckMobile();
    if (!isMobile) {
      xhtml = (
        <span className={classes.wrapperLogo}
          onClick={this.gotoHomePage}>
          <img
            alt="logo"
            className={classes.logo}
            src={`${process.env.PUBLIC_URL}/images/Logo.png`}
          />
        </span>
      );
    }
    return xhtml;
  }

  renderMegaMenu() {
    const { classes, navigations, loading } = this.props;
    const { item1stSelected, item2ndSelected } = this.state;
    let xhtml = null;
    const isMobile = useCheckMobile();
    if (!isMobile) {
      xhtml = (
        <div className={classes.wrapperMegaMenu}
          ref={this.setWrapperRef}>
          <div className={loading ? "marginTop40px" : "display-none"}>
            {showSelectPlaceholder(10)}
          </div>
          <div
            className={
              loading ? "display-none" : cn(classes.megaMenu, "marginTop20px")
            }
          >
            <ul className={classes.menu1st}>
              {navigations.map(item => {
                return this.renderItem1st(item);
              })}
            </ul>
          </div>
          {item1stSelected && (
            <div
              className={cn(
                classes.menu2nd,
                item1stSelected.id ? "visible" : "hidden"
              )}
              onMouseOver={e => this.setMenu1st(e, item1stSelected)}
            >
              <ul className={classes.listMenu2nd}>
                {item1stSelected.subNavigations.map(sub => {
                  return (
                    <li
                      className={classes.menuItem2nd}
                      key={sub.id}
                      onClick={e => this.setMenu2nd(e, sub)}
                      onMouseOver={e => this.setMenu2nd(e, sub)}
                    >
                      <span
                        className={cn(
                          classes.nameItem2nd,
                          item2ndSelected && item2ndSelected.id === sub.id
                            ? classes.borderLeftActive
                            : ""
                        )}
                      >
                        {sub.navigationTranslation
                          ? sub.navigationTranslation.name
                          : sub.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
              {this.renderMenu2nd(item2ndSelected)}
            </div>
          )}
          <div className={classes.breadcrumbs}>
            <Breadcrumbs />
          </div>
        </div>
      );
    }
    return xhtml;
  }

  handleToggleNavMobile() {
    const { toggleNavMobile } = this.props;
    if (toggleNavMobile) {
      toggleNavMobile();
    }
  }

  renderMenuMobile() {
    const {
      isOpenNavigationForMobile,
      classes,
      navigations,
      loading
    } = this.props;
    const isMobile = useCheckMobile();
    let xhtml = null;
    if (isMobile && isOpenNavigationForMobile) {
      xhtml = (
        <div className={classes.overlayMenu}>
          <span
            className={cn(classes.iconX, "icon-x")}
            onClick={this.handleToggleNavMobile}
          />
          <div className={classes.wrapperMegaMenuMobile}>
            <div className={loading ? "display-none" : cn(classes.megaMenu)}>
              <ul className={classes.menu1stMobile}>
                {navigations.map(item => {
                  return this.renderItem1stMobile(item);
                })}
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return xhtml;
  }

  handleToggleProfileMobile() {
    const { toggleProfileMobile } = this.props;
    if (toggleProfileMobile) {
      toggleProfileMobile();
    }
  }

  renderItem1stMobile(item) {
    const { item1stSelected, item2ndSelected } = this.state;
    const { classes } = this.props;
    let xhtml = null;
    if (item && item.isNotShow === false) {
      xhtml = (
        <li
          className={cn(
            item1stSelected &&
              item.id === item1stSelected.id &&
              classes.activeMenuItem1stMobile
          )}
          key={item.id}
        >
          <div
            className={classes.menuItemMobile}
            onClick={e => this.setMenu1stMobile(e, item, true)}
          >
            <span
              className={cn(
                classes.menuName,
                item1stSelected &&
                  item.id === item1stSelected.id &&
                  classes.active
                  ? classes.textActive
                  : ""
              )}
            >
              {item.navigationTranslation
                ? item.navigationTranslation.name
                : item.name}
            </span>
            {this.renderArrowIcon(item1stSelected, item)}
          </div>

          {item1stSelected && item1stSelected.id === item.id && (
            <div
              className={cn(
                classes.menu2ndMobile,
                item1stSelected.id ? "visible" : "hidden"
              )}
              onMouseOver={e => this.setMenu1st(e, item1stSelected)}
            >
              <ul className={classes.listMenu2ndMobile}>
                {item1stSelected.subNavigations.map((sub, index) => {
                  return (
                    <li
                      className={cn(
                        classes.menuItem2ndMobile,
                        index > 0 ? "paddingTop15px" : ""
                      )}
                      key={sub.id}
                      onClick={e => this.setMenu2ndMobile(e, sub)}
                    >
                      <span
                        className={cn(
                          classes.nameItem2nd,
                          item2ndSelected && item2ndSelected.id === sub.id
                            ? classes.borderLeftActive
                            : ""
                        )}
                      >
                        {sub.navigationTranslation
                          ? sub.navigationTranslation.name
                          : sub.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
              {this.renderMenu2ndMobile(item2ndSelected)}
            </div>
          )}
        </li>
      );
    }
    return xhtml;
  }

  handleMenuLanguage = event => {
    this.setState({ anchorElLanguage: event.currentTarget });
  };
  
  handleMenuLocal = event => {
    this.setState({ anchorElLocal: event.currentTarget });
  };

  handleCloseLanguage = () => {
    this.setState({ anchorElLanguage: null });
  };

  handleCloseLocal = () => {
    this.setState({ anchorElLocal: null });
  };

  handleProfile() {
    const { navigate } = this.props;
    navigate(`${ROUTE.PROFILE}`);
  }

  handleChooceLanguage = item => {
    this.props.handleChangeLanguage(item);
    this.setState({ anchorElLanguage: null });
    this.handleToggleProfileMobile();
  };

  handleChooceLocal = item => {
    this.props.handleChangeLocal(item);
    this.setState({ anchorElLocal: null });
    this.handleToggleProfileMobile();
  };

  renderProfileMobile() {
    const {
      classes,
      currentUser,
      isOpenProfileForMobile,
      localSelected,
      languageSelected,
      localByUser,
      languageByUser
    } = this.props;
    let xhtml = null;
    let user = null;
    if (currentUser) {
      user = currentUser.user;
    }
    let name = "";
    let avatar = "";
    if (user) {
      avatar = user && user.avatar;
      name = (user.firstName || "") + " " + (user.lastName || "");
      if (!user.firstName && !user.lastName) {
        name = user.username;
      }
    }
    const { anchorElLanguage, anchorElLocal } = this.state;
    const openMenuLanguage = Boolean(anchorElLanguage);
    const openMenuLocal = Boolean(anchorElLocal);
    const isMobile = useCheckMobile();
    if (isMobile && isOpenProfileForMobile) {
      xhtml = (
        <div className={classes.overlayProfile}>
          <span
            className={cn(classes.iconXProfile, "icon-x")}
            onClick={this.handleToggleProfileMobile}
          />
          <span className={classes.arrowProfile} />
          <div className={classes.wrapProfileLogout}>
            <div className={cn(classes.profileDetail)}>
              <span
                aria-haspopup="true"
                aria-owns={openMenuLocal ? "menu-language" : null}
                className={classes.changeLocals}
                color="inherit"
                onClick={this.handleMenuLocal}
              >
                <span className={cn("icon-location", classes.iconLocal)} />
                <span className={classes.languagesDropdown}>
                  <span className={classes.text}>
                    {localSelected && localSelected.name}
                  </span>
                  <Icon className={classes.iconExpand}>expand_more</Icon>
                </span>
              </span>
              <span
                aria-haspopup="true"
                aria-owns={openMenuLanguage ? "menu-language" : null}
                className={classes.changeLanguages}
                color="inherit"
                onClick={this.handleMenuLanguage}
              >
                <span
                  className={cn("icon-translation", classes.iconTranslation)}
                />
                <span className={classes.languagesDropdown}>
                  <span className={classes.text}>
                    {languageSelected && languageSelected.name}
                  </span>
                  <Icon className={classes.iconExpand}>expand_more</Icon>
                </span>
              </span>
              <Menu
                anchorEl={anchorElLanguage}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                id="menu-language"
                onClose={() => this.handleCloseLanguage()}
                open={openMenuLanguage}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
              >
                {languageByUser &&
                  languageByUser.length > 0 &&
                  languageByUser.map(item => {
                    return (
                      <MenuItem
                        key={item.id}
                        onClick={() => this.handleChooceLanguage(item)}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Menu>
              <Menu
                anchorEl={anchorElLocal}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                id="menu-language"
                onClose={this.handleCloseLocal}
                open={openMenuLocal}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
              >
                {localByUser &&
                  localByUser.length > 0 &&
                  localByUser.map(item => {
                    return (
                      <MenuItem
                        key={item.id}
                        onClick={() => this.handleChooceLocal(item)}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Menu>

              <div className={classes.wrapperUserProfile}>
                {avatar ? (
                  <Avatar
                    alt={user && user.username}
                    className={classes.avatarProfileDetail}
                    src={avatar}
                  />
                ) : (
                  <div className={classes.iconProfileDetail} />
                )}
                <div className={classes.textProfileDetail}>
                  <span className={classes.profileDetailName}>{name}</span>
                  <span className={classes.profileDetailPosition}>
                    {/* TODO: position */}
                  </span>
                </div>
              </div>
            </div>
            <div className={classes.profileItem}
              onClick={this.handleProfile}>
              <span
                className={cn("icon-profile", classes.dropdownProfileIcon)}
              />
              <span className={classes.dropdownProfileText}>Profile</span>
            </div>
            <div
              className={cn(classes.profileItem, classes.borderTop)}
              onClick={this.handleLogout}
            >
              <span
                className={cn("icon-logout", classes.dropdownProfileIcon)}
              />
              <span className={classes.dropdownProfileText}>Log out</span>
            </div>
          </div>
        </div>
      );
    }
    return xhtml;
  }

  render() {
    const { classes } = this.props;
    const isMobile = useCheckMobile();
    return (
      <header className={isMobile ? classes.headerMobile : classes.header}>
        <nav className={classes.navbar}>
          {this.renderLogo()}
          {/* Search bar */}
          <FormControl>
            <TextField
              InputProps={this.getInputPropsSearch()}
              autoFocus
              placeholder="Search"
            />
          </FormControl>
          {/* Search bar */}
        </nav>
        {this.renderMegaMenu()}
        {this.renderMenuMobile()}
        {this.renderProfileMobile()}
      </header>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  menu: PropTypes.any,
  user: PropTypes.object,
  history: PropTypes.object,
  navigate: PropTypes.any,
  logout: PropTypes.func,
  navigations: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  loading: PropTypes.bool,
  isOpenNavigationForMobile: PropTypes.bool,
  isOpenProfileForMobile: PropTypes.bool,
  toggleNavMobile: PropTypes.func,
  toggleProfileMobile: PropTypes.func,
  currentUser: PropTypes.object,
  languageByUser: oneOfType([PropTypes.array, PropTypes.object]),
  localByUser: oneOfType([PropTypes.array, PropTypes.object]),
  languageSelected: oneOfType([PropTypes.array, PropTypes.object]),
  localSelected: PropTypes.object,
  handleChangeLocal: PropTypes.func,
  handleChangeLanguage: PropTypes.func
};

export default withStyles(styles)(Header);
