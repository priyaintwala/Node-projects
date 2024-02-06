Feature: Delete New User

  Scenario Outline: Try to delete user with invalid details, then it will throw error.
    Given User details id: "<id>" to delete user
    When Try to delete new user
    Then It will throw error with message: "<message>" while deleting new user
    And deleteuser function will call <deleteuserFunctionCallCount> time while deleting new user

    Examples: 
      | id | deleteuserFunctionCallCount | error           | message                 |
      |    |                           0 | ValidationError | '"id" is required'      |
      | a  |                           0 | ValidationError | '"id" must be a number' |

  Scenario Outline: Try to delete user for not existing id.
    Given User details id: "<id>" to delete user
    When Try to delete new user
    Then It will throw error with message: "<message>" while deleting new user

    Examples: 
      | id | error | message          |
      |  2 | error | 'id not existed' |

  Scenario Outline: Try to delete new user with valid inputs, then it will throw error.
    Given User details id: "<id>" to delete user
    When Try to delete new user
    Then It will delete new user with details: "<newUserDetails>"
    And deleteuser function will call <deleteuserFunctionCallCount> time while deleting new user

    Examples: 
      | id | newUserDetails | deleteuserFunctionCallCount |
      |  1 | '{"id": 1}'    |                           1 |


