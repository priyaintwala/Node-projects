Feature: update Label

  Scenario Outline: Try to update label with invalid details, then it will throw error.
    Given User details id: "<userId>",labelName: "<labelName>" to update label
    When Try to update label
    Then It will throw error with message: "<message>" while updating label
    And updatelabel function will call <updatelabelFunctionCallCount> time while updating label

    Examples: 
      | userId | labelName | updatelabelFunctionCallCount | error           | message                     |
      |        |           |                            0 | ValidationError | '"userId" is required'      |
      |      1 |           |                            0 | ValidationError | '"labelName" is required'   |
      | a      |           |                            0 | ValidationError | '"userId" must be a number' |

  Scenario Outline: Try to update label with valid details, then it will throw error.
    Given User details id: "<userId>",labelName: "<labelName>" to update label
    When Try to update label
    Then updatelabel function will call <updatelabelFunctionCallCount> time while updating label

    Examples: 
      | userId | labelName | updatelabelFunctionCallCount |
      |      1 | SENT      |                            1 |
