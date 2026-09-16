import swaggerUiDist from "swagger-ui-dist";

export const swaggerUiPath = swaggerUiDist.getAbsoluteFSPath();

export const swaggerUiOptions = {
  customCssUrl: "/swagger-ui/swagger-ui.css",

  customJs: [
    "/swagger-ui/swagger-ui-bundle.js",
    "/swagger-ui/swagger-ui-standalone-preset.js",
  ],
};
