Feature: Add new label.

  Scenario Outline: Try to add new Label with invalid details, then it will throw error.
    Given User details id: "<id>" to create new label
    When Try to add new label
    Then It will throw error with message: "<message>" while adding new label
    And addLabels function will call <addLabelFunctionCallCount> time while adding new label

    Examples: 
      | id | addLabelFunctionCallCount | error           | message                 |
      |    |                         0 | ValidationError | '"id" is required'      |
      | d  |                         0 | ValidationError | '"id" must be a number' |

  Scenario Outline: Try to add new Label with valid details, then it will call funtion one time.
    Given User details id: "<id>" to create new label
    When Try to add new label
    Then It will create new Folder with details: <FolderCount>
    And addLabels function will call <addLabelFunctionCallCount> time while adding new label

    Examples: 
      | id | addLabelFunctionCallCount | FolderCount |
      |  2 |                         1 | 5           |



