@login
Feature: Log in

	Background: Open the login page
		Given the "main" page is opened

	@wip
	Scenario: Login page display
		When the user enters a "valid" username
		When the user enters a "valid" password
		And the user clicks the "log in" button
# Then the "email verification" page is opened
