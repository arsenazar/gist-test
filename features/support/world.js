const tokens = require('./tokens');
const gitAPI = require('../../models/gitAPI');

const World = {
  setUser: function (user, cb) {
    let token = tokens['user'] || '';
    gitAPI.config(user, token);
    cb(null);
  },

  listGistsForUser: function (user, cb) {
    gitAPI.gists().listForUser(user, cb);
  },

  listGists: function (anonymous, cb) {
    gitAPI.gists().list(anonymous, cb);
  }
};

module.exports = World;
