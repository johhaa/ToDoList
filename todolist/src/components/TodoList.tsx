
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { filterValuesType } from '../App'
import '../App.css'


export type TaskType = {
	id: string, 
	title: string, 
	isDone: boolean,
}

type PropsType = {
	title: string,
	tasks: Array<TaskType>
	deleteTask: (id: string) => void
	changeFilter: (value: filterValuesType) => void
	addTask: (newTaskTitle: string) => void
	
}

export default function TodoList(props: PropsType){
	
	const [newTaskTitle, setNewTaskTitle] = useState("")

	function addNewTask(){
		if(newTaskTitle.trim() != ""){
		props.addTask(newTaskTitle)
		setNewTaskTitle("")
		}
	}

	const onChangeHandler = (e : ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)

	const onKeyPressHandler = (e : KeyboardEvent<HTMLInputElement>) => {if(e.charCode == 13) {addNewTask()}}		
	
	const onAllClickHandler = () => props.changeFilter('all')

	const onActiveClickHandler = () => props.changeFilter('active')

	const onCompletedClickHandler = () => props.changeFilter('completed')

	return(
		<div className="card">
			<div className='card-header'>
				<h3>{props.title}</h3>
				<input value={newTaskTitle} 
							 onChange={onChangeHandler}
							 onKeyPress={onKeyPressHandler}
				/>
				<button onClick={addNewTask}>+</button>
			</div>
			<div className='tasks'>
				<ul>
						{
						props.tasks.map((task) =>{
							const onDeleteHandler = () => props.deleteTask(task.id)
							
							return <li  key={task.id}>
								<div className="task-item" >
									{task.title}
									<input type="checkbox" checked ={task.isDone} />
								</div>
								<button onClick={onDeleteHandler}>X</button>
							</li>
							})
						}
				</ul>
			</div>
			<div className='buttons'>
				<button onClick={onActiveClickHandler}>Active</button>
				<button onClick={onAllClickHandler}>All</button>
				<button onClick={onCompletedClickHandler}>Completed</button>
			</div>
		</div>
	)
}