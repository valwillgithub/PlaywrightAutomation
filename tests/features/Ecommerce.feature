Feature: Ecommerce validations

  Background: "Background Description"
    Given I navigate to the ecommerce website

  Scenario: Placing the Order
    And I login with "vastyjay@yahoo.com" and "Kumasi117"
    When I add "zara coat 3" to Cart
    Then Verify "zara coat 3" is displayed in the Cart
    When Enter valid details and place the order
    Then Verify order in present in the OrderHistory

  Scenario Outline: Place the Order Scenario Outline
    And I login with "<username>" and "<password>"
    When I add "<item>" to Cart
    Then Verify "<item>" is displayed in the Cart
    When Enter valid details and place the order
    Then Verify order in present in the OrderHistory

    Examples:
      | username           | password    | item          |
      | vastyjay@yahoo.com | Kumasi117   | zara coat 3   |
      | vastyjay@yahoo.com | Kumasi117   | iphone 13 pro |
      | anshika@gmail.com  | Iamking@000 | item          |







