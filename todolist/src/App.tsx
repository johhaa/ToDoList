import { useState } from 'react'
import './App.css'
import TodoList, { TaskType } from './components/TodoList'
import {v1} from 'uuid'

export type filterValuesType = 'all' | 'completed' | 'active'

function App() {
  

  const [tasks, setTask] = useState<Array<TaskType>>([
    {id: v1(), title: "CSS", isDone: true},
    {id: v1(), title: "GAMARDHOBA", isDone: false},
    {id: v1(), title: "HTML", isDone: true},
    {id: v1(), title: "JS", isDone: false},  
    {id: v1(), title: "JdwdS", isDone: false},
    {id: v1(), title: "dw", isDone: false},
  ])
  
  const [filter, setFilter] = useState<filterValuesType>('all')

 

  function deleteTask(id: string){
    let filteredTask = tasks.filter(t => t.id != id)
    setTask(filteredTask)
  }

  function addTask(newTaskTitle : string){
    let newTask = {id: v1(), title: newTaskTitle, isDone: false}
    let newTasks = [newTask, ...tasks]
    setTask(newTasks)
  }

  let taskForTodoList = tasks
  
  if(filter == "completed"){
    taskForTodoList = tasks.filter(t => t.isDone)
  }
  if(filter == "active"){
    taskForTodoList = tasks.filter(t => !t.isDone)
  }

  function changeFilter(value: filterValuesType){
    setFilter(value)
  }

    return(
      <div className='app'>
        <TodoList 
          title='Movies' 
          tasks = {taskForTodoList}
          deleteTask = {deleteTask}
          changeFilter={changeFilter}
          addTask={addTask}
        />       
      </div>
    )
}

export default App
