import { createMuiTheme } from "material-ui/styles";

//rgb for hex #EFCB80
const paperBackground = "rgba(239,203,128,.2)";

const card = {
  width: "100%",
  maxWidth: "600px",
  padding: "24px",
  boxSizing: "border-box",
  fontSize: "13px",
  fontWeight: "400",
  lineHeight: "20px",
  borderRadius: "2px",
  backgroundColor: paperBackground,
  margin: "16px auto",
  overflow: "hidden",
  position: "relative"
};
const tosMuiTheme = createMuiTheme({
  fontFamily: "Open Sans, sans-serif",
  palette: {
    primary: {
      light: "#ac7cda",
      main: "#7b4fa8",
      dark: "#4c2478",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff5a36",
      main: "#ff0000",
      dark: "#c20000",
      contrastText: "#000"
    },
    accent: "#7b4fa8",
    accent2: "#7b4fa8"
  }
});
const PennMuiTheme = createMuiTheme({
  fontFamily: "Open Sans, sans-serif",
  palette: {
    primary: {
      light: "#045ea7",
      main: "#01256e",
      dark: "#00144d",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ac3c00",
      main: "#95001a",
      dark: "#74000e",
      contrastText: "#fff"
    },
    accent: "#82afd3",
    accent2: "#f2c100"
  }
});
export { card, tosMuiTheme as customMuiTheme};
