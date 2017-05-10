@Gists
Feature: List a user's gist
  As a GitHub API client
  I want to see the list of a gist for a specific user

  @listPublicGistsForTheSpecificUser
  Scenario: List public gists for the specified user
    Given I have Github account "arsenazar"
    When I GET the list of gists for a user "jeffersoneagley"
    Then the http status should be 200
    And the list contains more than 1 gists

  @listAllGists
  Scenario: List authenticated user's gists
    Given I have Github account "arsenazar"
    When I GET the list of my gists
    Then the http status should be 200
    And the list contains more than 1 gists

  @listPublicGists
  Scenario: List public gists for the specified user
    Given I have not Github account
    When I GET the list of public gists
    Then the http status should be 200
    And the list contains more than 1 gists

  @getSingleGist
  Scenario: Get a single gist for a authenticated user
    Given I have Github account "arsenazar"
    When I GET the gist "c37d486f422f4007d0a0c51789ffc904"
    Then ths http status should be "200"
    And $.url should equal "https://api.github.com/gists/c37d486f422f4007d0a0c51789ffc904"
    And the data should be validated by "gist.schema.json" schema

  @listStarredGists
  Scenario: List starred gists for a authenticated user
    Given I have Github account "arsenazar"
    When I GET the list of starred gists
    Then ths http status should be "200"
    And the list contains more than 0 gists

  @checkStarredGists
  Scenario: Check if the specific gist is starreed
    Given I have Github account "arsenazar"
    When I CHECK the gist "c37d486f422f4007d0a0c51789ffc904" is starred
    Then ths http status should be "204"

  @checkNotStarredGists
  Scenario: Check if the specific gist is starreed
    Given I have Github account "arsenazar"
    When I CHECK the gist "7e86e57611272e409823d92af4437956" is starred
    Then ths http status should be "404"
