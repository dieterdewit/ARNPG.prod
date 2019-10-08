# test/e2e/home/sample.feature

Feature: As a developer i want to test my angular app in BDD

Scenario: I want to be able to access home screen after login
    Given I am on the "login"
    When I fill "email" field with "dewi15146@uvg.edu.gt"
    And I fill "password" field with "dustox"
    And I click on the button "login"
    Then I should be redirected on "home"