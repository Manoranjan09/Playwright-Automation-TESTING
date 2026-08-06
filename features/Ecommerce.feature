Feature: Ecommerce Validations
  @Regression
  Scenario: Placing a order
    Given a login to Ecommerce  application with "kashyapking507@gmail.com" and "Mano123@"
    When Add "ZARA COAT 3" to cart
    Then verify "ZARA COAT 3" is displayed in the cart
    When enter valid details and place the order
    Then verify order is present in the order history 

  @Validations  
  @foo 
  Scenario Outline: Placing a order
    Given a login to Ecommerce2  application with "<email>" and "<password>"
    Then verify error message is displayed

    Examples:
        | email                     | password  |
        | kashyapking507@gmail.com  | Mano123@  | 
        | hello@123                 | Man123@   | 