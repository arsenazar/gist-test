*****BDD-CUCUMBER-NODE-TEST-API-REST*****

You have to ATDD (Acceptance Test Driven Development) reverse Gists V3 API[https://developer.github.com/v3/gists/] 
using BDD and Gherkin techniques.

Features to be covered:
- List a user's gists
- List a user's starred gists
- Get a single gist
- Get a specific revision of a gist
- Create a gist
- Edit a gist
- List gist commits
- Star a gist
- Check if a gist is starred
- Delete a gist
Notice that the json response should be valid using JSON-Schema draft-060[https://www.npmjs.com/package/ajv]

Stack: Node, CucumberJS, ajv, mocha, chai, request, chaiHttp, ...

Sample:

```
//features/gist.feature

Feature: Get gist details
    As a GitHub API client
    I want to see the details of a gist

Scenario: Get a gist
    When I GET the gist 2e0a63118e7224eb02351f5ae7176ae8
    Then the http status should be 200
    And $.url should equal "https://api.github.com/gists/2e0a63118e7224eb02351f5ae7176ae8"
```

```
//features/step_definitions/gist_steps.js

this.When(/^I GET the gist (.)$/, function(gist, callback) {
    // Call "https://api.github.com/gists/2e0a63118e7224eb02351f5ae7176ae8" api
});

this.Then(/^the http status should (\d+)$/, function(status, callback) {
    // Check if status is 200
});

this.Then(/^$.url should equal (.)$/, function(url, callback) {
    // Check if url property is equal to "https://api.github.com/gists/2e0a63118e7224eb02351f5ae7176
});
```