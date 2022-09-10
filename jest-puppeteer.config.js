module.exports = {
  launch: {
    headless: false,
    defaultViewport: null,
    args: ["--auto-open-devtools-for-tabs"],
    slowMo: 250,
  },
  browsers: "chromium",
  browserContext: "default",
};
