module.exports = {
  launch: {
    headless: false,
    defaultViewport: null,
    IgnoreHTTPSErrors: true,
    args: [
      "--proxy-server='direct://'",
      "--proxy-bypass-list=*",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-sandbox",
      "--no-zygote",
      "--single-process",
      "--ignore-certificate-errors",
      "--ignore-certificate-errors-spki-list",
      "--enable-features=NetworkService",
    ],
  },
  browsers: "chromium",
  browserContext: "default",
};
