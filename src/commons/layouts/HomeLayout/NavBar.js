import { Button, Grow, Paper, Popper, withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import cn from "classnames";
import moment from "moment";
import PropTypes, { oneOfType } from "prop-types";
import React, { Component } from "react";
import { useCheckMobile } from "helpers/Responsive";
import {
  AUTHORIZE_TOKEN,
  NOTIFICATION_MODULE,
  NOTIFICATION_MODULE_TEXT,
  NOTIFICATION_STATUS,
  NOTIFICATION_STATUS_TEXT,
  redirect_uri,
  ROUTE
} from "../../../constants";

const styles = () => ({
  appBar: {
    zIndex: 99
  },
  appBarWrapper: {
    margin: 0,
    padding: 0,
    flexGrow: 1,
    maxHeight: "64px",
    overflow: "hidden"
  },
  grow: {
    flexGrow: 1,
    lineHeight: "32px",
    alignSelf: "center",
    cursor: "pointer"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  text: {
    paddingRight: "4px",
    textTransform: "capitalize"
  },
  icon: {
    lineHeight: "32px",
    fontSize: "22px"
  },
  textRight: {
    textAlign: "right",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  changeLanguages: {
    display: "inline-flex",
    alignItems: "center",
    marginLeft: 20
  },
  toolbar: {
    display: "flex",
    width: 1140,
    margin: "0 auto"
  },
  wrapProfile: {
    minWidth: 450,
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.07)",
    backgroundColor: "#ffffff",
    height: "auto",
    marginTop: 24,
    overflowY: "hidden"
  },
  wrapProfileLogout: {
    minWidth: 450,
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.07)",
    backgroundColor: "#ffffff",
    height: "auto",
    marginTop: 14,
    overflowY: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  profileInfo: {
    height: 107,
    backgroundColor: "#fafafa",
    borderBottom: " 1px solid #e3e3e3",
    display: "flex",
    justifyContent: "flex-tart",
    alignItems: "center",
    padding: "0 20px"
  },
  avatar: {
    margin: 10
  },
  searchIcon: {
    marginLeft: 16,
    "& span": {
      fontSize: 25,
      verticalAlign: "middle"
    }
  },
  iconNotification: {
    fontSize: 16
  },
  notifyCount: {
    border: "solid 1px #ffed00",
    borderRadius: "7.5px",
    backgroundColor: "#ffed00",
    padding: "0 4px",
    fontSize: 9,
    fontFamily: "ClanPro-Bold",
    color: "#2b2b2b",
    position: "absolute",
    right: 12,
    top: 6
  },
  arrowNotify: {
    position: "absolute",
    fontSize: 13,
    width: "3em",
    height: "3em",
    "&::after": {
      content: "''",
      display: "inline-block",
      boxSizing: "border-box",
      border: "solid 0.45em #e3e3e3",
      borderColor: "transparent transparent white white",
      transformOrigin: "0 0",
      transform: "rotate(135deg)",
      boxShadow: "-1.5px 1.5px 0px 0 rgba(0, 0, 0, 0.1)"
    },
    top: 0,
    right: -18,
    marginBottom: "-0.9em"
  },
  notification: {},
  notifyHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15
  },
  titleNotify: {
    fontFamily: "ClanPro-Bold",
    fontSize: 20,
    lineHeight: "40px",
    color: "#2b2b2b"
  },
  selectStatusNotify: {},
  actChangeStatusNotify: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 15px"
  },
  actUnread: {
    fontFamily: "ClanPro-Bold",
    fontSize: 14,
    lineHeight: "30px",
    color: "#2b2b2b"
  },
  actReadAll: {
    cursor: "pointer",
    fontFamily: "ClanPro-News",
    fontSize: 13,
    "& : hover": {
      fontFamily: "ClanPro-Bold"
    }
  },
  listNotify: {},
  listNotifyUnread: {
    backgroundColor: "#f8f8f8"
  },
  itemNotify: {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px 10px 0",
    borderTop: "solid 1px #e3e3e3",
    cursor: "pointer"
  },
  iconNotify: {
    fontSize: 23,
    color: "#b1b0a1",
    minWidth: 60,
    minHeight: 60,
    lineHeight: "60px",
    textAlign: "center"
  },
  notifyData: {},
  notifyNameAndTime: {
    display: "flex",
    alignItems: "center"
  },
  notifyName: {
    fontFamily: "ClanPro-Bold",
    fontSize: 11,
    color: "#2b2b2b"
  },
  notifyTime: {
    fontFamily: "ClanPro-News",
    fontSize: 11,
    color: "#757575"
  },
  notifyStatus: {
    fontFamily: "ClanPro-News",
    fontSize: 11,
    color: "#757575"
  },
  notifyContent: {
    fontFamily: "ClanPro-News",
    fontSize: 13,
    color: "#2b2b2b"
  },
  overflowData: {
    overflowY: "scroll",
    maxHeight: 400
  },
  sectionViewAll: {
    borderTop: "solid 1px #e3e3e3",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    cursor: "pointer",
    marginTop: 10
  },
  viewAll: {
    fontFamily: "ClanPro-Bold",
    fontSize: 11,
    lineHeight: "16px"
  },
  titleNoNewNotifications: {
    fontFamily: "ClanPro-Bold",
    fontSize: 14,
    lineHeight: "30px",
    marginTop: 10
  },
  descNoNewNotifications: {
    fontFamily: "ClanPro-News",
    fontSize: 13,
    lineHeight: "20px",
    color: "#757575"
  },
  noDataContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  iconNoNewNotification: {
    color: "#e3e3e3",
    fontSize: 40
  },
  module: {
    backgroundColor: "#000000",
    color: "#ffed00",
    display: "inline-flex",
    alignItems: "center",
    padding: "0 2px"
  },
  moduleText: {
    color: "white",
    fontFamily: "ClanPro-Bold",
    fontSize: 11,
    paddingTop: 2
  },
  iconModule: {
    fontSize: 14
  },
  iconNavigation: {
    fontSize: 12
  },
  notifyLocal: {
    padding: "2px 4px 0 4px",
    marginBottom: 2,
    backgroundColor: "#ffed00",
    fontFamily: "ClanPro-Bold",
    fontSize: 11
  },
  notifyLanguage: {
    fontFamily: "ClanPro-Bold",
    fontSize: 11,
    marginLeft: 5,
    color: "#2b2b2b !important"
  },
  iconApprove: {
    fontSize: 25
  },
  zIndex99: {
    zIndex: 9999
  },
  noPadding: {},
  profileItem: {
    padding: "10px 20px",
    cursor: "pointer",
    display: "flex",
    "&:hover": {
      backgroundColor: "#f8f8f8"
    }
  },
  borderTop: {
    borderTop: "solid 1px #e3e3e3"
  },
  activeIcon: {
    color: "#ffed00"
  },
  admin: {
    display: "flex",
    alignItems: "center"
  },
  iconProfile: {
    fontSize: 20
  },
  textOfIconProfile: {
    marginLeft: 8,
    paddingTop: 4
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
  btnNotification: {
    marginLeft: 4
  },
  dropdownProfile: {
    marginLeft: 4,
    paddingRight: 0
  },
  btnProfileLabel: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    backgroundColor: "#9b9b9b",
    marginLeft: 10
  },
  btnProfileAvatar: {
    width: 38,
    height: 38
  },
  dropdownProfileIcon: {
    fontSize: 15
  },
  dropdownProfileText: {
    marginLeft: 8
  },
  profileDetail: {
    backgroundColor: "#000000",
    minHeight: 90,
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    cursor: "pointer"
  },
  iconProfileDetail: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    backgroundColor: "#9b9b9b"
  },
  avatarProfileDetail: {
    width: 56,
    height: 56
  },
  textProfileDetail: {
    marginLeft: 12,
    display: "flex",
    flexDirection: "column",
    paddingTop: 10
  },
  profileDetailName: {
    fontFamily: "ClanPro-Medium",
    fontSize: 18,
    lineHeight: "20px",
    color: "#ffed00"
  },
  profileDetailPosition: {
    fontFamily: "ClanPro-Medium",
    fontSize: 12,
    lineHeight: "30px",
    color: "#ffffff"
  },
  arrowProfile: {
    position: "absolute",
    fontSize: 13,
    width: "3em",
    height: "3em",
    "&::after": {
      content: "''",
      display: "inline-block",
      boxSizing: "border-box",
      border: "solid 0.45em #e3e3e3",
      borderColor: "transparent transparent black black",
      transformOrigin: "0 0",
      transform: "rotate(135deg)",
      boxShadow: "-1.5px 1.5px 0px 0 rgba(0, 0, 0, 0.1)"
    },
    top: 0,
    right: "12%",
    marginBottom: "-0.9em"
  },
  username: {
    fontFamily: "ClanPro-Bold"
  },
  iconDelete: {
    fontSize: 25,
    color: "#b61a2d"
  },
  iconRestore: {
    fontSize: 25,
    color: "#4aad40"
  },
  appBarMobile: {
    maxHeight: 44,
    backgroundColor: "#ffffff !important",
    boxShadow: "none !important"
  },
  headerWrapperMobile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#2b2b2b",
    padding: "10px 16px"
  },
  wrapperLogo: {
    paddingTop: 10
  },
  wrapperIconUser: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "#ededed",
    textAlign: "center",
    overflow: "hidden"
  },
  iconUser: {
    color: "#cccccc",
    lineHeight: "30px",
    fontSize: 27
  },
  wrapperDefaultAvatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    textAlign: "center",
    border: "solid 1px #cccccc",
    backgroundColor: "#ededed",
    overflow: "hidden",
    "&>span": {
      fontSize: 30,
      lineHeight: "32px",
      color: "#cccccc"
    }
  }
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElLanguage: null,
      anchorEl: null,
      open: false,
      openProfile: false
    };
    this.gotoAdminPage = this.gotoAdminPage.bind(this);
    this.renderNotification = this.renderNotification.bind(this);
    this.handleMarkAllRead = this.handleMarkAllRead.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.gotoViewAllNotification = this.gotoViewAllNotification.bind(this);
    this.renderIconByNotifyType = this.renderIconByNotifyType.bind(this);
    this.renderIconByNewsStatus = this.renderIconByNewsStatus.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleToggleNavMobile = this.handleToggleNavMobile.bind(this);
    this.handleToggleProfileMobile = this.handleToggleProfileMobile.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleToggleProfile = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorElProfile: currentTarget,
      openProfile: !state.openProfile
    }));
  };

  handleToggleNotification = event => {
    // console.log("event toggle: ", event);
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open
    }));
  };

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

  gotoAdminPage() {
    const { onGotoAdminPage } = this.props;
    onGotoAdminPage();
  }

  async handleMarkRead(item) {
    if (item.isRead === false) {
      const { handleMarkRead } = this.props;
      await handleMarkRead(item);
      if (item.link) {
        this.props.navigate(`${item.link}`);
      }
    }
  }

  handleMarkAllRead() {
    const { listNotifyUnRead } = this.props;
    if (listNotifyUnRead && listNotifyUnRead.length > 0) {
      const { handleMarkAllRead } = this.props;
      handleMarkAllRead();
    }
  }

  renderByStatus(status) {
    let xhtml = null;
    switch (status) {
      case NOTIFICATION_STATUS.WAITING_FOR_TRANSLATE:
        xhtml =
          NOTIFICATION_STATUS_TEXT[NOTIFICATION_STATUS.WAITING_FOR_TRANSLATE];
        break;
      case NOTIFICATION_STATUS.WAITING_FOR_APPROVE:
        xhtml =
          NOTIFICATION_STATUS_TEXT[NOTIFICATION_STATUS.WAITING_FOR_APPROVE];
        break;
      case NOTIFICATION_STATUS.DELETE:
        xhtml = NOTIFICATION_STATUS_TEXT[NOTIFICATION_STATUS.DELETE];
        break;
      case NOTIFICATION_STATUS.RESTORE:
        xhtml = NOTIFICATION_STATUS_TEXT[NOTIFICATION_STATUS.RESTORE];
        break;
      default:
        break;
    }
    return xhtml;
  }

  renderByModule(module) {
    const { classes } = this.props;
    let xhtml = null;
    switch (module) {
      case NOTIFICATION_MODULE.NAVIGATION:
        xhtml = (
          <span className={classes.module}>
            <span
              className={cn("icon-module_navigation", classes.iconNavigation)}
            />
            <span className={cn("marginLeft3px", classes.moduleText)}>
              {NOTIFICATION_MODULE_TEXT[NOTIFICATION_MODULE.NAVIGATION]}
            </span>
          </span>
        );
        break;
      case NOTIFICATION_MODULE.CATEGORY:
        xhtml = NOTIFICATION_MODULE_TEXT[NOTIFICATION_MODULE.CATEGORY];
        break;
      case NOTIFICATION_MODULE.NEWS_STORIES:
        xhtml = (
          <span className={classes.module}>
            <span className={cn("icon-module_news", classes.iconModule)} />
            <span className={cn("marginLeft3px", classes.moduleText)}>
              {NOTIFICATION_MODULE_TEXT[NOTIFICATION_MODULE.NEWS_STORIES]}
            </span>
          </span>
        );
        break;
      case NOTIFICATION_MODULE.COMMENT:
        xhtml = (
          <span className={classes.module}>
            <span className={cn("icon-comment", classes.iconModule)} />
            <span className={cn("marginLeft3px", classes.moduleText)}>
              {NOTIFICATION_MODULE_TEXT[NOTIFICATION_MODULE.COMMENT]}
            </span>
          </span>
        );
        break;
      case NOTIFICATION_MODULE.SHARE:
        xhtml = (
          <span className={classes.module}>
            <span className={cn("icon-share", classes.iconModule)} />
            <span className={cn("marginLeft3px", classes.moduleText)}>
              {NOTIFICATION_MODULE_TEXT[NOTIFICATION_MODULE.SHARE]}
            </span>
          </span>
        );
        break;
      default:
        break;
    }
    return xhtml;
  }

  renderCreationTime(creationTime) {
    let xhtml = null;
    const countOfDay = moment().diff(creationTime, "days");
    const countOfTime = moment().diff(creationTime, "hours");
    const countOfMinutes = moment().diff(creationTime, "minutes");
    if (countOfDay > 0) {
      xhtml = `${countOfDay}d ago`;
    } else if (countOfTime > 0) {
      xhtml = `${countOfTime}h ago`;
    } else if (countOfMinutes > 0) {
      xhtml = `${countOfMinutes}m ago`;
    } else {
      xhtml = "Just now";
    }
    return xhtml;
  }

  renderByLanguage(languageNews, languageTranslate) {
    const { classes } = this.props;
    let xhtml = null;
    if (languageNews && languageTranslate) {
      xhtml = (
        <span className={classes.notifyLanguage}>
          {languageTranslate.languageCode} - {languageTranslate.name}
        </span>
      );
    }
    return xhtml;
  }

  renderIconByNewsStatus(status, item) {
    const { classes } = this.props;
    let xhtml = null;
    switch (status) {
      case NOTIFICATION_STATUS.WAITING_FOR_TRANSLATE:
        xhtml = (
          <span
            className={cn(
              "icon-translation",
              classes.iconTranslation,
              "translation"
            )}
          />
        );
        break;
      case NOTIFICATION_STATUS.WAITING_FOR_APPROVE:
        xhtml = (
          <span
            className={cn(
              "icon-translation",
              classes.iconApprove,
              "waiting-approval"
            )}
          />
        );
        break;
      case NOTIFICATION_STATUS.DELETE:
        xhtml = <span className={cn("icon-delete", classes.iconDelete)} />;
        break;
      case NOTIFICATION_STATUS.RESTORE:
        xhtml = <span className={cn("icon-restore", classes.iconRestore)} />;
        break;
      case NOTIFICATION_STATUS.SHARE:
      case NOTIFICATION_STATUS.COMMENT:
        xhtml = item && item.avatarUrl ? (
          <Avatar
            alt="Remy Sharp"
            className={classes.avatar}
            src={item ? item.avatarUrl : ""}
          />
        ) : (
          this.renderDefaultAvatar()
        );
        break;
      default:
        break;
    }
    return xhtml;
  }

  renderDefaultAvatar() {
    const { classes } = this.props;
    return (
      <span className={classes.wrapperDefaultAvatar}>
        <span className="icon-profile" />
      </span>
    );
  }

  renderIconByModule(module) {
    const { classes } = this.props;
    let xhtml = null;
    switch (module) {
      case NOTIFICATION_MODULE.SHARE:
        xhtml = (
          <span
            className={cn("icon-share", classes.iconTranslation, "translation")}
          />
        );
        break;
      case NOTIFICATION_MODULE.COMMENT:
        xhtml = (
          <span
            className={cn("icon-share", classes.iconTranslation, "translation")}
          />
        );
        break;
      default:
        break;
    }
    return xhtml;
  }

  renderIconByNotifyType(item) {
    const { classes } = this.props;
    let xhtml = null;
    if (
      item.notificationModule === NOTIFICATION_MODULE.NAVIGATION ||
      item.notificationModule === NOTIFICATION_MODULE.SHARE ||
      item.notificationModule === NOTIFICATION_MODULE.COMMENT
    ) {
      xhtml = item.avatarUrl ? (
        <Avatar
          alt="Remy Sharp"
          className={classes.avatar}
          src={item.avatarUrl}
        />
      ) : (
        this.renderDefaultAvatar()
      );
    } else if (item.notificationModule === NOTIFICATION_MODULE.NEWS_STORIES) {
      xhtml = this.renderIconByNewsStatus(item.notificationStatus, item);
    }
    return xhtml;
  }

  renderItemNotify(item) {
    const { classes } = this.props;
    let xhtml = null;
    xhtml = (
      <div
        className={classes.itemNotify}
        key={item.id}
        onClick={this.handleMarkRead.bind(this, item)}
      >
        <span className={classes.iconNotify}>
          {this.renderIconByNotifyType(item)}
        </span>
        <div className={classes.notifyData}>
          <div className={classes.notifyNameAndTime}>
            <span className={classes.notifyName}>
              {this.renderByModule(item.notificationModule)}
            </span>
            {item.local && (
              <span className={classes.notifyLocal}>
                {item.local ? item.local.name : ""}
              </span>
            )}
          </div>
          <div className={classes.notifyStatus}>
            {this.renderByStatus(item.notificationStatus)}
            {this.renderByLanguage(item.languageNews, item.languageTranslate)}
          </div>
          <div className={classes.notifyContent}>{item.description}</div>
          <div className={classes.notifyTime}>
            {this.renderCreationTime(item.creationTimeUtc)}
          </div>
        </div>
      </div>
    );
    return xhtml;
  }

  renderNoUnreadNotification() {
    const { classes } = this.props;
    let xhtml = null;
    xhtml = (
      <div className={cn(classes.noDataContainer, "marginBottom30px")}>
        <span
          className={cn("icon-no-notifications", classes.iconNoNewNotification)}
        />
        <div className={classes.titleNoNewNotifications}>
          No New Notifications
        </div>
        <div className={classes.descNoNewNotifications}>
          Check this section for updates, tasks, and general notifications.
        </div>
      </div>
    );
    return xhtml;
  }

  renderNotification() {
    const { classes, listNotifyUnRead } = this.props;
    let xhtml = null;
    xhtml = (
      <div className={classes.notification}>
        <div className={classes.notifyHeader}>
          <span className={classes.titleNotify}>Notifications</span>
        </div>
        <div className={classes.overflowData}>
          {listNotifyUnRead.length === 0 && this.renderNoUnreadNotification()}
          <div className={cn(classes.listNotify, classes.listNotifyUnread)}>
            {listNotifyUnRead.map(item => this.renderItemNotify(item))}
          </div>
        </div>
        <div
          className={classes.sectionViewAll}
          onClick={this.gotoViewAllNotification}
        >
          <span className={classes.viewAll}>View all</span>
        </div>
      </div>
    );
    return xhtml;
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      const { className } = event.target;
      if (
        className.indexOf("icon-notification") !== -1 ||
        className.indexOf("btnNotification") !== -1 ||
        className.indexOf("btnLabel") !== -1 ||
        className.indexOf("notifyCount") !== -1
      ) {
        this.setState({
          open: true
        });
      } else {
        this.setState({
          open: false
        });
      }

      if (className.indexOf("btnProfileLabel") !== -1) {
        this.setState({
          openProfile: true
        });
      } else {
        this.setState({
          openProfile: false
        });
      }
    }
  }

  gotoViewAllNotification() {
    const { navigate } = this.props;
    navigate(`${ROUTE.ROUTE_NOTIFICATION}`);
  }

  handleChooceLanguage = item => {
    this.props.handleChangeLanguage(item);
    this.setState({ anchorElLanguage: null });
  };

  handleChooceLocal = item => {
    this.props.handleChangeLocal(item);
    this.setState({ anchorElLocal: null });
  };

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

  handleProfile() {
    const { navigate } = this.props;
    navigate(`${ROUTE.PROFILE}`);
  }

  renderNavigateAdmin() {
    const { classes } = this.props;
    let xhtml = null;
    const isMobile = useCheckMobile();
    if (!isMobile) {
      xhtml = (
        <div
          className={cn(classes.grow, classes.admin)}
          onClick={this.gotoAdminPage}
        >
          <span className={cn(classes.iconProfile, "icon-setting")} />
          <span className={cn(classes.text, classes.textOfIconProfile)}>
            Admin
          </span>
        </div>
      );
    }
    return xhtml;
  }

  renderHeader() {
    const {
      localByUser,
      localSelected,
      languageSelected,
      languageByUser,
      classes,
      currentUser,
      listNotifyUnRead
    } = this.props;
    const { anchorElLanguage, open, anchorElLocal, openProfile } = this.state;
    let xhtml = null;
    const isMobile = useCheckMobile();
    const totalUnread = listNotifyUnRead.length || 0;
    const openMenuLanguage = Boolean(anchorElLanguage);
    const openMenuLocal = Boolean(anchorElLocal);

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
    if (!isMobile) {
      xhtml = (
        <Toolbar>
          <div className={classes.toolbar}>
            {this.renderNavigateAdmin()}
            <div className={classes.grow}>
              <div className={classes.textRight}>
                <span
                  aria-haspopup="true"
                  aria-owns={openMenuLocal ? "menu-language" : null}
                  className={classes.changeLanguages}
                  color="inherit"
                  onClick={this.handleMenuLocal}
                >
                  <span className={cn("icon-location", classes.iconLocal)} />
                  <span className={classes.languagesDropdown}>
                    <span className={classes.text}>
                      {localSelected && localSelected.name}
                    </span>
                    <Icon className={classes.icon}>expand_more</Icon>
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
                    <Icon className={classes.icon}>expand_more</Icon>
                  </span>
                </span>
                <Button
                  aria-haspopup="true"
                  aria-owns={open ? "menu-list-grow" : undefined}
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}
                  className={cn(
                    classes.noPadding,
                    "btnNotification",
                    classes.btnNotification
                  )}
                  classes={{
                    label: "btnLabel"
                  }}
                  color="inherit"
                  disableRipple
                  onClick={this.handleToggleNotification}
                >
                  <span
                    className={cn(
                      classes.iconNotification,
                      "icon-notification",
                      open ? classes.activeIcon : ""
                    )}
                  />
                  <span
                    className={classes.notifyCount}
                    style={{
                      right:
                        totalUnread.toString().length > 1
                          ? 12 - 3 * totalUnread.toString().length + "px"
                          : "12px"
                    }}
                  >
                    {totalUnread || 0}
                  </span>
                </Button>
                <Button
                  aria-haspopup="true"
                  aria-owns={open ? "menu-list-grow" : undefined}
                  buttonRef={node => {
                    this.anchorElProfile = node;
                  }}
                  className={classes.dropdownProfile}
                  classes={{
                    label: "btnProfileLabel"
                  }}
                  color="inherit"
                  disableRipple
                  onClick={this.handleToggleProfile}
                >
                  <span
                    className={cn(
                      classes.text,
                      "btnProfileLabel",
                      classes.username,
                      openProfile ? classes.activeIcon : ""
                    )}
                  >
                    {name}
                  </span>
                  {avatar ? (
                    <Avatar
                      alt={user && user.username}
                      className={classes.btnProfileAvatar}
                      src={avatar}
                    />
                  ) : (
                    <span className={classes.btnProfileLabel} />
                  )}
                </Button>
                <Popper
                  anchorEl={this.state.anchorElProfile}
                  className={classes.zIndex99}
                  open={openProfile}
                  placement="bottom-end"
                  transition
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="menu-list-grow"
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom"
                      }}
                    >
                      <Paper>
                        {/* Profile */}
                        <div ref={this.setWrapperRef}>
                          <span className={classes.arrowProfile} />
                          <div className={classes.wrapProfileLogout}>
                            <div
                              className={cn(
                                // classes.profileItem,
                                classes.profileDetail
                              )}
                            >
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
                                <span className={classes.profileDetailName}>
                                  {name}
                                </span>
                                <span className={classes.profileDetailPosition}>
                                  {/* TODO: position */}
                                </span>
                              </div>
                            </div>
                            <div
                              className={classes.profileItem}
                              onClick={this.handleProfile}
                            >
                              <span
                                className={cn(
                                  "icon-profile",
                                  classes.dropdownProfileIcon
                                )}
                              />
                              <span className={classes.dropdownProfileText}>
                                Profile
                              </span>
                            </div>
                            <div
                              className={cn(
                                classes.profileItem,
                                classes.borderTop
                              )}
                              onClick={this.handleLogout}
                            >
                              <span
                                className={cn(
                                  "icon-logout",
                                  classes.dropdownProfileIcon
                                )}
                              />
                              <span className={classes.dropdownProfileText}>
                                Log out
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Profile */}
                      </Paper>
                    </Grow>
                  )}
                </Popper>
                <Popper
                  anchorEl={this.state.anchorEl}
                  className={classes.zIndex99}
                  open={open}
                  placement="bottom-end"
                  transition
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="menu-list-grow"
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom"
                      }}
                    >
                      <Paper>
                        <div ref={this.setWrapperRef}>
                          <span className={classes.arrowNotify} />
                          <div className={classes.wrapProfile}>
                            {this.renderNotification()}
                          </div>
                        </div>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
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
            </div>
          </div>
        </Toolbar>
      );
    }
    return xhtml;
  }

  gotoHomePage() {
    this.props.navigate("/home");
  }

  handleToggleNavMobile() {
    const { toggleNavMobile } = this.props;
    if (toggleNavMobile) {
      toggleNavMobile();
    }
  }

  handleToggleProfileMobile() {
    const { toggleProfileMobile } = this.props;
    if (toggleProfileMobile) {
      toggleProfileMobile();
    }
  }

  renderHeaderMobile() {
    const { classes, currentUser } = this.props;
    let avatar = "";
    if (currentUser && currentUser.user && currentUser.user.avatar) {
      avatar = currentUser.user.avatar;
    }
    let xhtml = null;
    const isMobile = useCheckMobile();
    if (isMobile) {
      xhtml = (
        <div className={classes.headerWrapperMobile}>
          <span
            className={cn(classes.burgerIcon, "icon-order")}
            onClick={this.handleToggleNavMobile}
          />
          <span className={classes.wrapperLogo}
            onClick={this.gotoHomePage}>
            <img
              alt="logo"
              className={classes.logo}
              src={`${process.env.PUBLIC_URL}/images/Logo.png`}
            />
          </span>
          {avatar ? (
            <Avatar alt=""
              className={classes.wrapperIconUser}
              src={avatar} />
          ) : (
            <span
              className={classes.wrapperIconUser}
              onClick={this.handleToggleProfileMobile}
            >
              <span className={cn("icon-profile", classes.iconUser)} />
            </span>
          )}
        </div>
      );
    }
    return xhtml;
  }

  render() {
    const { classes } = this.props;
    const isMobile = useCheckMobile();
    return (
      <div className={classes.appBarWrapper}>
        <AppBar
          className={cn(classes.appBar, isMobile ? classes.appBarMobile : "")}
          position="fixed"
        >
          {this.renderHeaderMobile()}
          {this.renderHeader()}
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.any,
  onGotoAdminPage: PropTypes.func,
  listNotifyUnRead: oneOfType([PropTypes.array, PropTypes.object]),
  listNotifyRead: oneOfType([PropTypes.array, PropTypes.object]),
  handleMarkRead: PropTypes.func,
  handleMarkAllRead: PropTypes.func,
  navigate: PropTypes.any,
  localByUser: oneOfType([PropTypes.array, PropTypes.object]),
  totalRecordNotify: PropTypes.number,
  languageByUser: oneOfType([PropTypes.array, PropTypes.object]),
  languageSelected: oneOfType([PropTypes.array, PropTypes.object]),
  localSelected: PropTypes.object,
  handleChangeLanguage: PropTypes.func,
  handleChangeLocal: PropTypes.func,
  logout: PropTypes.func,
  toggleNavMobile: PropTypes.func,
  toggleProfileMobile: PropTypes.func,
  isOpenNavigationForMobile: PropTypes.bool,
  isOpenProfileForMobile: PropTypes.bool
};

export default withStyles(styles)(NavBar);
