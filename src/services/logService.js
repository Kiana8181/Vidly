// import Raven from "raven-js";

function init() {
  // Raven.config(
  //   "https://153a5e78b3a44f6a9e3cbb3bbed77972@o1425690.ingest.sentry.io/6774237",
  //   {
  //     release: "1-0-0",
  //     environment: "development-test",
  //   }
  // ).install();
}

function log(error) {
  console.log(error);
  // Raven.captureException(error);
}

export default {
  log,
  init,
};
