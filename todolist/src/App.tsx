import { useState } from 'react'
import './App.css'
import TodoList, { TaskType } from './components/TodoList'


export type filterValuesType = 'all' | 'completed' | 'active'

function App() {
  

  let [tasks, setTask] = useState<Array<TaskType>>([
    {id: 1, title: "CSS", isDone: true},
    {id: 2, title: "GAMARDHOBA", isDone: false},
    {id: 3, title: "HTML", isDone: true},
    {id: 4, title: "JS", isDone: false},  
    {id: 5, title: "JdwdS", isDone: false},
    {id: 6, title: "dw", isDone: false},
  ])

  let [filter, setFilter] = useState<filterValuesType>('all')
  
  function deleteTask(id: number){
    let filteredTask = tasks.filter(t => t.id != id)
    setTask(filteredTask)
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
        />       
      </div>
    )
}

export default App
