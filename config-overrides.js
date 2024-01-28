const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    lessOptions: {
      strictMath: true,
      noIeCompat: true,
    },
  }),
);