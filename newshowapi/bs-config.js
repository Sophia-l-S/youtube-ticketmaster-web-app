//  http://www.browsersync.io/docs/options/

module.exports = {
  proxy: "localhost:8888",
  files: ["**/*.css", "**/*.pug", "**/*.js"],
  ignore: ["node_modules"],
  reloadDelay: 10,
  ui: false,
  notify: false,
  port: 3000,
};