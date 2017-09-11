# todo app

<b>Functionality:</b>

Add new task
-----
1. Task name
1. Status
1. Tags
1. Save/Add

Table with available tasks
-----
 
1. User can check/uncheck the respective checkbox provided for each task

1. UI contains two sections for displaying <b>Pending</b> and <b>Completed</b> tasks

1. A delete/remove button to remove task from array

1. An "Edit" button to edit task which pre-populates selected task data into add new task

1. Search control which filters table data based on search text, seach text may be a task name, tag name, status

1. A link which on clicking removes completed tasks from array with a confirmation pop up

Section for showing stats
-----

1. Section which shows percent of tasks completed from available array of tasks

<b>Note: </b>

1. Write generic functions whereever possible
1. Perform appropriate validations and show error messages before adding to array
1. Maintain single array for all operations (add/remove/status)
1. Try to implement functionality with topics discussed
1. For Search box you can use ```onChange``` event

Sample todo JSON array: *(You can use your own custom object)*
```
[
    {
        id: 1,
        name: 'Draw Painting',
        isCompleted: false
    },
    {
        id: 2,
        name: 'Go for Shopping',
        isCompleted: true
    }
]
```