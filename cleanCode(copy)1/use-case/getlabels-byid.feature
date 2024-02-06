Feature: Add new label.

  Scenario Outline: Try to add new Label with invalid details, then it will throw error.
    Given User details id: "<id>" to get label
    When Try to get label
    Then It will throw error with message: "<message>" while getting label
    And getLabels function will call <getLabelFunctionCallCount> time while getting label

    Examples: 
      | id | getLabelFunctionCallCount | error           | message                 |
      |    |                         0 | ValidationError | '"id" is required'      |
      | d  |                         0 | ValidationError | '"id" must be a number' |

  Scenario Outline: Try to add new Label with valid details, then it will call funtion one time.
    Given User details id: "<id>" to get label
    When Try to get label
    Then It will get new Folder with details: <FolderNames>
    And getLabels function will call <getLabelFunctionCallCount> time while getting label

    Examples: 
      | id | getLabelFunctionCallCount | FolderNames                             |
      |  2 |                         1 |'["INBOX","SENT","TRASH","STAR","DRAFT"]'|



