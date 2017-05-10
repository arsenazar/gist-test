const tokens = require('./tokens');
const github = require('../../models/github');

const World = {
  setUser: function (user, cb) {
    let token = tokens['user'] || '';
    github.config(user, token);
    cb(null);
  },

  listGistsForUser: function (user, cb) {
    github.gists().listForUser(user, cb);
  },

  listGists: function (anonymous, cb) {
    github.gists().list(anonymous, cb);
  }
};

module.exports = World;
