const env = require('../../env.config.js');

Object.entries(env).forEach(([key, value]) => {
  process.env[key] = value;
});
