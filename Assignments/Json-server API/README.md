1.Create json-server API using json-server npm module (follow the instruction in https://www.npmjs.com/package/json-server for setup)
  a.Create endpoints for managing tasks  
    {
      "tasks": [
        { "id": 1, "name": "task1", "tags": ["work"], "isCompleted": false },
        { "id": 2, "name": "task2", "tags": ["game"], "isCompleted": true }
      ]
    }
  
  b.Validations  
      · name should not be empty and maximum length allowed is 100 characters
      · id should be number and unique.
2.Save the task in POST endpoint of the json-server
3.On page load Get all tasks from tasks API and show in grid/table
 
pre requisites: node js
Note:
  1)DO NOT WASTE TIME ON CSS/STYLES
  2)Try to use the session topics in this assignment