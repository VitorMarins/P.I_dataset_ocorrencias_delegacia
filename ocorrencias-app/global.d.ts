declare module "*.css";
declare module "*.scss";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";

// Fallback types for react-plotly.js when @types are not installed
declare module "react-plotly.js" {
  const Plot: any;
  export default Plot;
}
