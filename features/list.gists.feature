@Gists
Feature: List a user's gist
  As a GitHub API client
  I want to see the list of a gist for a specific user

  # Before run test, should change the
  @listPublicGistsForTheSpecificUser
  Scenario: List public gists for the specified user
    Given I have Github account "arsenazar"
    When I GET the list of gists for a user "jeffersoneagley"
    Then the http status should be 200
    And the the list contains more than 1

  @listAllGists
  Scenario: List authenticated user's gists
    Given I have Github account "arsenazar"
    When I GET the list of my gists
    Then the http status should be 200
    And the the list contains more than 0

  @listPublicGists
  Scenario: List public gists for the specified user
    Given I have not Github account
    When I GET the list of public gists
    Then the http status should be 200
    And the the list contains more than 0
