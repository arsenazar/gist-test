'use strict';

const World = require('../support/world');
// const expect = require('chai').expect;
const JSONPath = require('jsonpath-plus');

const GithubStepsWrapper = function () {

  /**
   * Given
   */
  this.Given(/^I have Github account "([^"]*)"$/, function (user, done) {
    World.setUser(user, () => {
      done();
    });
  });

  this.Given(/^I have not Github account$/, function (done) {
    done();
  });

  /**
   * When
   */
  this.When(/^I GET the list of gists for a user "([^"]*)"$/, function (user, done) {
    World.listGistsForUser(user, (error, res, data) => {
      if (error) {
        done(error);
      } else {
        this.lastResponse = res;
        this.lastData = data;
        done();
      }
    })
  });

  this.When(/^I GET the list of my gists$/, function (done) {
    World.listGists(false, (error, res, data) => {
      if (error) {
        done(error);
      } else {
        this.lastResponse = res;
        this.lastData = data;
        done();
      }
    })
  });

  this.When(/^I GET the list of public gists$/, function (done) {
    World.listGists(true, (error, res, data) => {
      if (error) {
        done(error);
      } else {
        this.lastResponse = res;
        this.lastData = data;
        done();
      }
    })
  });

  this.When(/^I GET the gist "([^"]*)"$/, function (gistId, done) {
    World.getGist(gistId, (error, res, data) => {
      if (error) {
        done(error);
      } else {
        this.lastResponse = res;
        this.lastData = data;
        console.log(data);
        done();
      }
    })
  });

  this.When(/^I GET the list of starred gists$/, function (done) {
    World.listStarredGists((error, res, data) => {
      if (error) {
        done(error);
      } else {
        this.lastResponse = res;
        this.lastData = data;
        done();
      }
    })
  });

  this.When(/^I CHECK the gist "([^"]*)" is starred$/, function (gistId, done) {
    World.checkIsStarred(gistId, (error, res, data) => {
      if (error) {
        done(error);
      } else {
        this.lastResponse = res;
        this.lastData = data;
        done();
      }
    })
  });

  /**
   * Then
   */
  this.Then(/^the http status should be (\d+)$/, function (status, done) {
    if (!assertResponse(this.lastResponse, done)) {
      return
    }
    // deliberately using != here (no need to cast integer/string)
    /* jshint -W116 */
    if (this.lastResponse.statusCode != status) {
      /* jshint +W116 */
      done('The last http response did not have the expected ' +
        'status, expected ' + status + ' but got ' +
        this.lastResponse.statusCode)
    } else {
      done()
    }
  });

  this.Then(/^the list contains more than (\d+) gists$/, function (count, done) {
    let gists = JSON.parse(this.lastData);
    if (gists.length > count) {
      done();
    } else {
      done(new Error('the list is empty'))
    }
  });

  const assertResponse = function (lastResponse, callback) {
    if (!lastResponse) {
      callback(new Error('No request has been made until now.'));
      return false
    }
    return true
  };

  const assertBody = function (lastResponse, callback) {
    if (!assertResponse(lastResponse, callback)) {
      return false
    }
    if (!lastResponse.body) {
      callback(new Error('The response to the last request had no body.'));
      return null
    }
    return lastResponse.body
  };

  const assertValidJson = function (lastResponse, callback) {
    let body = assertBody(lastResponse, callback);
    if (!body) {
      return null
    }
    try {
      return JSON.parse(body)
    } catch (e) {
      callback(
        new Error('The body of the last response was not valid JSON.'));
      return null
    }
  };

  const assertPropertyExists = function (lastResponse, key, expectedValue,
                                         callback) {
    let object = assertValidJson(lastResponse, callback);
    if (!object) {
      return null
    }
    let property;
    if (key.indexOf('$.') !== 0 && key.indexOf('$[') !== 0) {
      // normal property
      property = object[key]
    } else {
      // JSONPath expression
      let matches = JSONPath.eval(object, key);
      if (matches.length === 0) {
        // no match
        callback('The last response did not have the property: ' +
          key + '\nExpected it to be\n' + expectedValue);
        return null
      } else if (matches.length > 1) {
        // ambiguous match
        callback('JSONPath expression ' + key + ' returned more than ' +
          'one match in object:\n' + JSON.stringify(object));
        return null
      } else {
        // exactly one match, good
        property = matches[0]
      }
    }
    if (property == null) {
      callback('The last response did not have the property ' +
        key + '\nExpected it to be\n' + expectedValue);
      return null
    }
    return property
  };

  const assertPropertyIs = function (lastResponse, key, expectedValue, callback) {
    let value = assertPropertyExists(lastResponse, key, expectedValue, callback);
    if (!value) {
      return false
    }
    if (value !== expectedValue) {
      callback('The last response did not have the expected content in ' +
        'property ' + key + '. ' + 'Got:\n\n' + value + '\n\nExpected:\n\n' +
        expectedValue);
      return false
    }
    return true
  };

  const assertPropertyContains = function (lastResponse, key, expectedValue, callback) {
    let value = assertPropertyExists(lastResponse, key, expectedValue, callback);
    if (!value) {
      return false
    }
    if (value.indexOf(expectedValue) === -1) {
      callback('The last response did not have the expected content in ' +
        'property ' + key + '. ' +
        'Got:\n\n' + value + '\n\nExpected it to contain:\n\n' + expectedValue);
      return false
    }
    return true
  }
};

module.exports = GithubStepsWrapper;