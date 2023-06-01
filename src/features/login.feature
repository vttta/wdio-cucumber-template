@login
Feature: Log in

	Background: Open the login page
		Given the user visits url ""

	@stable
	Scenario: Login as a regular user
		When the user enters a "valid" username
		When the user enters a "valid" password
		And the user clicks the "log in" button
		Then the "shop" page is opened

	@stable
	Scenario: Login as a locked out user
		When the user enters a "locked out" username
		When the user enters a "valid" password
		And the user clicks the "log in" button
		Then an error is displayed
		And the "shop" page is not opened

	@wip @debug
	Scenario: Login as a problem user
		When the user enters a "problem" username
		When the user enters a "valid" password
		And the user clicks the "log in" button
		Then the "shop" page is opened
		And DEBUG

	@wip
	Scenario: Login as a performance glitch user
		When the user enters a "performance glitch" username
		When the user enters a "valid" password
		And the user clicks the "log in" button
		And DEBUG
		Then the "shop" page is opened
