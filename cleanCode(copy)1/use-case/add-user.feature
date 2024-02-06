Feature: Add New User

  Scenario Outline: Try to add new user with invalid details, then it will throw error.
    Given User details username: "<username>", email: "<email>" to create new user
    When Try to add new user
    Then It will throw error with message: "<message>" while creating new user
    And adduser function will call <adduserFunctionCallCount> time while creating new user
    #  And addlabel function will call <addlabelFunctionCallCount> time while creating new user

    Examples: 
      | username      | email | adduserFunctionCallCount | error           | message                           | adduserFunctionCallCount |
      |               |       |                        0 | ValidationError | '"fname" is required'             |                        0 |
      | Priya Intwala |       |                        0 | ValidationError | '"emailId" is required'           |                        0 |
      | Priya Intwala | priya |                        0 | ValidationError | '"emailId" must be a valid email' |                        0 |

  Scenario Outline: Try to create new user with already registered email, then it will throw error.
    Given User details username: "<username>", email: "<email>" to create new user
    When Try to add new user
    Then It will throw error with message: "<message>" while creating new user
      # And addlabel function will call <addlabelFunctionCallCount> time while creating new user


    Examples: 
      | username      | email                      | error | message                                      |adduserFunctionCallCount|
      | Priya Intwala | priya.intwala@rapidops.com | error | "User with the same email is already exists" |1|

  Scenario Outline: Try to create new user with valid inputs, then it will throw error.
    Given User details username: "<username>", email: "<email>" to create new user
    When Try to add new user
    Then It will create new user with details: "<newUserDetails>"
    And adduser function will call <adduserFunctionCallCount> time while creating new user

    Examples: 
      | username      | email                       | newUserDetails | adduserFunctionCallCount |
      | Priya Intwala | priyal.intwala@rapidops.com | '{"id": 1}'    |                        1 |

