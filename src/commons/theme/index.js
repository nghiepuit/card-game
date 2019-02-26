import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import grey from "@material-ui/core/colors/grey";

// check https://material-ui.com/style/color/#color for colors to add to color palette
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
      light: "#FFFFFF",
      dark: ""
    },
    secondary: {
      main: "#efefef",
      light: "#e3e3e3"
    },
    error: {
      main: "#F44336"
    },
    yellow: {
      main: "#ffed00"
    }
  },
  typography: {
    fontFamily: ["\"ClanPro-News\""].join(","),
    body: {
      fontSize: 12
    },
    useNextVariants: true
  },
  overrides: {
    MuiTypography: {
      caption: {
        color: grey
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 840,
      lg: 1280,
      xl: 1920
    },
    landScape() {
      return "@media screen and (orientation: landscape)";
    }
  },
  yellow: {
    500: "#ffed00"
  }
});

export default theme;
