Feature: Ecommerce Validations
  @Validations  
  @foo 
  Scenario Outline: Placing a order
    Given a login to Ecommerce2  application with "<email>" and "<password>"
    Then verify error message is displayed

    Examples:
        | email                     | password  |
        | kashyapking507@gmail.com  | Mano123@  | 
        | hello@123                 | Man123@   |