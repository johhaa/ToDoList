
import { ChangeEvent, useState } from 'react'
import { filterValuesType } from '../App'
import '../App.css'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'


export type TaskType = {
	id: string, 
	title: string, 
	isDone: boolean,
}

type PropsType = {
	id: string
	title: string,
	tasks: Array<TaskType>
	filter: filterValuesType
	deleteTask: (id: string, todolistID: string) => void
	changeFilter: (value: filterValuesType, todolistID: string) => void
	changeTasklTitle: (id: string, newValue: string, Todolistid: string) => void
	addTask: (newTaskTitle: string, todolistID: string) => void
	changeStatus: (checkboxStatus: boolean, id: string, TodolistID: string) => void
	deleteTodoList: (todolistID: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
}

export default function TodoList(props: PropsType){

	const deleteTodolist = () => props.deleteTodoList(props.id)
	
	const onAllClickHandler = () => props.changeFilter('all', props.id)

	const onActiveClickHandler = () => props.changeFilter('active', props.id)

	const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

	const addTask = (title: string) => {
		props.addTask(title, props.id)
	}

	const changeTodolistTitle = (newTitle: string) => { props.changeTodolistTitle(props.id, newTitle)}

	return(
		<>
		<div className="card">
			<div className='card-header'>
				<h3 className='card-title'> <EditableSpan title = {props.title} onChange={changeTodolistTitle}/> <button onClick={deleteTodolist}>X</button></h3>
				<AddItemForm addItem={addTask}/>
			</div>
			<div className='tasks'>
				<ul>
						{
						props.tasks.map((task) =>{
							const onDeleteHandler = () => props.deleteTask(task.id, props.id)
							const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(e.currentTarget.checked, task.id, props.id)
							const onChangeTitleHandler = (newValue: string) => {
								props.changeTasklTitle(task.id, newValue, props.id)
							}
							
							return <li  key={task.id}>
								<div className="task-item" >
									<EditableSpan title={task.title} onChange={onChangeTitleHandler} />
									<input 
										type="checkbox" 
										checked ={task.isDone}
										onChange={onChangeStatusHandler}
									/>
								</div>
								<button onClick={onDeleteHandler}>X</button>
							</li>
							})
						}
				</ul>
			</div>
			<div className='buttons'>
				<button onClick={onActiveClickHandler} className={props.filter == "active" ? "active-filter" : ""}>Active</button>
				<button onClick={onAllClickHandler} className={props.filter == "all" ? "active-filter" : ""}>All</button>
				<button onClick={onCompletedClickHandler} className={props.filter == "completed" ? "active-filter" : ""}>Completed</button>
			</div>

		</div>
		</>
	)
}



