Feature: Update User

  Scenario Outline: Try to update user with invalid details, then it will throw error.
    Given User details id: "<id>", username: "<username>" to update user
    When Try to update user
    Then It will throw error with message: "<message>" while updating user
    And updateuser function will call <updateuserFunctionCallCount> time while updating user

    Examples: 
      | id | username | updateuserFunctionCallCount | error           | message                  |
      |    |          |                           0 | ValidationError | '"id" is required'       |
      | a  |          |                           0 | ValidationError | '"id" must be a number'  |
      |  1 |          |                           0 | ValidationError | '"userName" is required' |

  Scenario Outline: Try to update user for not existing id.
    Given User details id: "<id>", username: "<username>" to update user
    When Try to update user
    Then It will throw error with message: "<message>" while updating user

    Examples: 
      | id | error | message          |
      |  2 | error | 'id not existed' |

  Scenario Outline: Try to update user with valid inputs, then it will throw error.
    Given User details id: "<id>", username: "<username>" to update user
    When Try to update user
    Then It will update user with details: "<newUserDetails>"
    And updateuser function will call <updateuserFunctionCallCount> time while updating user

    Examples: 
      | id | username      | newUserDetails | updateuserFunctionCallCount |
      |  1 | Priya Intwala | '{"id": 1}'    |                           1 |
