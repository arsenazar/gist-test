const {GITHUB_API_URL, USER_AGENT} = require('./env');
const request = require('request');

const github = {

  user: '',
  accessToken: '',

  config: function(user, accessToken) {
    this.user = user;
    this.accessToken = accessToken;
  },

  /**
   *
   * @param anonymous
   * @constructor
   */
  API: function (anonymous) {
    let options = {
      baseUrl: GITHUB_API_URL,
      headers: {
        'User-Agent': USER_AGENT
      }
    };
    if (!anonymous)
      options.aurh = {
        user: this.user,
        pass: this.accessToken,
        sendImmediately: false
      };
    return request.defaults(options);
  },

  gists: function() {
    let that = this;
    return {
      /**
       * List public gists for the specified user:
       *
       * @param user
       * @param cb
       */
      listForUser: function (user, cb) {
        let url = `/users/${user}/gists`;
        that.API().get(url, function (error, res, body) {
          if (error) {
            cb(error, res);
          } else {
            cb(null, res, body)
          }
        })
      },

      /**
       * List the authenticated user's gists or if called anonymously, this will return all public gists:
       *
       * @param anonymous
       * @param cb
       */
      list: function (anonymous, cb) {
        let url = `/gists`;
        that.API().get(url, function (error, res, body) {
          if (error) {
            cb(error, res);
          } else {
            cb(null, res, body)
          }
        })
      },

      /**
       * Get a single gist
       *
       * @param id
       * @param cb
       */
      get: function (id, cb) {
        let url = `/gists/${id}`;
        that.API().get(url, function (error, res, body) {
          if (error) {
            cb(error, res);
          } else {
            cb(null, res, body)
          }
        })
      },

      /**
       * List the authenticated user's starred gists
       *
       * @param cb
       */
      starredList: function (cb) {
        let url = `/gists/starred`;
        that.API().get(url, function (error, res, body) {
          if (error) {
            cb(error, res);
          } else {
            cb(null, res, body)
          }
        })
      },

      /**
       * Check if a gist is starred
       *
       * @param id
       * @param cb
       */
      isStarred: function (id, cb) {
        let url = `/gists/${id}/star`;
        that.API().get(url, function (error, res, body) {
          if (error) {
            cb(error, res);
          } else {
            cb(null, res, body)
          }
        })
      }
    };
  },
};

module.exports = github;