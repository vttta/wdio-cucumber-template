@cart
Feature: Cart actions

	Background: Log in
		Given the user is logged in
		And the "shop" page is opened

	@stable
	Scenario: Add an item to the cart
    When the user adds an item with index 0 to the cart
    And the user opens the cart
		Then the "cart" page is opened
    And the cart contains the added item
