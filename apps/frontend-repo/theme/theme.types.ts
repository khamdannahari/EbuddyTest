import { Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CustomTheme extends Theme {}
  export function createTheme(options?: ThemeOptions): CustomTheme;
}
