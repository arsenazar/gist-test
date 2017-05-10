const assert = require('assert');
const gitAPI = require('../models/gitAPI');
const {GITHUB_USER, GITHUB_ACCESS_TOKEN} = require('./env');

describe('Gist', function() {
  describe('#listGist()', function() {

    beforeEach(function(done) {
      gitAPI.config(GITHUB_USER, GITHUB_ACCESS_TOKEN);
      done();
    });

    it('should return ok when I GET the list of gists for a user <jeffersoneagley>', function(done) {
      gitAPI.gists().listForUser('jeffersoneagley', (err, res, body) => {
        if (err) {
          done(err);
        } else {
          let gists = JSON.parse(body);
          done();}
      })
    });
  });
});
