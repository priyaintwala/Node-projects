Feature: Delete Label

  Scenario Outline: Try to delete label with invalid details, then it will throw error.
    Given User details id: "<userId>",labelName: "<labelName>" to delete label
    When Try to delete label
    Then It will throw error with message: "<message>" while deleting label
    And deletelabel function will call <deletelabelFunctionCallCount> time while deleting label

    Examples: 
      | userId | labelName | deletelabelFunctionCallCount | error           | message                     |
      |        |           |                            0 | ValidationError | '"userId" is required'      |
      |      1 |           |                            0 | ValidationError | '"labelName" is required'   |
      | a      |           |                            0 | ValidationError | '"userId" must be a number' |

  Scenario Outline: Try to delete label with valid details, then it will throw error.
    Given User details id: "<userId>",labelName: "<labelName>" to delete label
    When Try to delete label
    Then deletelabel function will call <deletelabelFunctionCallCount> time while deleting label

    Examples: 
      | userId | labelName | deletelabelFunctionCallCount |
      |      1 | SENT      |                            1 |
