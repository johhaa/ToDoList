import { ChangeEvent, useState } from 'react'
import './App.css'
import TodoList, { TaskType } from './components/TodoList'
import {v1} from 'uuid'
import AddItemForm from './components/AddItemForm'


export type filterValuesType = 'all' | 'completed' | 'active'
export type TodoListType = {
  id: string,
  title: string,
  filter: filterValuesType
}

type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  function deleteTask(id: string, todolistID: string){
    let tasks = tasksObj[todolistID]
    let filteredTask = tasks.filter(t => t.id != id)
    tasksObj[todolistID] = filteredTask
    setTasks({...tasksObj})
  }

  function addTask(newTaskTitle : string, todolistID: string){
    let tasks = tasksObj[todolistID]
    let newTask = {id: v1(), title: newTaskTitle, isDone: false}
    let newTasks = [newTask, ...tasks]
    tasksObj[todolistID] = newTasks
    setTasks({...tasksObj})
  }

  function changeStatus(checkboxStatus: boolean, id: string, todolistID: string){
    let tasks = tasksObj[todolistID]
    let task = tasks.find(t =>  t.id == id)
    if(task) {
      task.isDone = checkboxStatus
      setTasks({...tasksObj})
    }
  }

  function changeFilter(value: filterValuesType, todolistID: string){
    let todolist = todolists.find(t => t.id == todolistID)
    if(todolist) {todolist.filter = value}
    let copy = [...todolists]
    setTodolist(copy)
    
  }


  let tasksId1 = v1()

  let [todolists, setTodolist] = useState<Array<TodoListType>>([
    { id: tasksId1, title: "what to to?", filter: "all"},
  ])

  function deleteTodoList(todolistID: string){
    let filteredTodoLists = todolists.filter(t => t.id != todolistID)
    setTodolist(filteredTodoLists)
    delete tasksObj[todolistID]
    setTasks({...tasksObj})
  }


  function createTodoList(title: string){
    let newTodolist: TodoListType = {id: v1(), title: title, filter: "all"}
    let updatedTodolist = [...todolists, newTodolist]
    setTodolist(updatedTodolist)
    setTasks({ ...tasksObj, [newTodolist.id]: [] });
  }

  let [tasksObj, setTasks] = useState<TaskStateType>({
      [tasksId1]: [    
        {id: v1(), title: "test", isDone: true},
      ],
  })

    return( 
      <>
      <div>
        <AddItemForm addItem = {createTodoList}/>
      </div>
      <div className="app">
        {todolists.map((tl) => {

            let taskForTodoList = tasksObj[tl.id]
  
            if(tl.filter == "completed"){
                taskForTodoList = taskForTodoList.filter(t => t.isDone)
            }
            if(tl.filter == "active"){
                taskForTodoList = taskForTodoList.filter(t => !t.isDone)
            }

            return <TodoList 
              key = {tl.id}
              id = {tl.id}
              title={tl.title} 
              tasks = {taskForTodoList}
              deleteTask = {deleteTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeStatus={changeStatus}
              filter = {tl.filter}
              deleteTodoList={deleteTodoList}
          />  
          }    
        )}
      </div>
      </>
    )
}

export default App
