Feature: Get User

  Scenario Outline: Try to get user with invalid details, then it will throw error.
    Given User details id: "<id>" to get user
    When Try to get user
    Then It will throw error with message: "<message>" while get user
    And getuser function will call <getuserFunctionCallCount> time while get user
    And getLabelbyid function will call <getlabelbyidFunctionCallCount> time while get user

    Examples: 
      | id | getuserFunctionCallCount | error           | message                 | getlabelbyidFunctionCallCount |
      |    |                        0 | ValidationError | '"id" is required'      |                             0 |
      | a  |                        0 | ValidationError | '"id" must be a number' |                             0 |

  Scenario Outline: Try to get new user with valid inputs, then it will throw error.
    Given User details id: "<id>" to get user
    When Try to get user
    Then It will get user with details: "<newUserDetails>"
    And getuser function will call <getuserFunctionCallCount> time while get user
    And getLabelbyid function will call <getlabelbyidFunctionCallCount> time while get user

    Examples: 
      | id | newUserDetails | getuserFunctionCallCount | getlabelbyidFunctionCallCount |
      |  1 | '{"id": 1}'    |                        1 |                             1 |

  Scenario Outline: Try to get user for not existing id.
    Given User details id: "<id>" to get user
    When Try to get user
    Then It will throw error with message: "<message>" while get user
    And getLabelbyid function will call <getlabelbyidFunctionCallCount> time while get user

    Examples: 
      | id | error | message          | getlabelbyidFunctionCallCount |
      |  2 | error | 'id not existed' |                             0 |
