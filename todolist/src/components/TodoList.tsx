
import { filterValuesType } from '../App'
import '../App.css'


export type TaskType = {
	id: number, 
	title: string, 
	isDone: boolean,
}

type PropsType = {
	title: string,
	tasks: Array<TaskType>
	deleteTask: (id: number) => void
	changeFilter: (value: filterValuesType) => void
}

export default function TodoList(props: PropsType){

	

	

	return(
		<div className="card">
			<div className='card-header'>
				<h3>{props.title}</h3>
				<input/>
				<button >+</button>
			</div>
			<div className='tasks'>
				<ul>
						{
						props.tasks.map((task) =>(
							<li key={task.id}>
								<input type="checkbox" checked ={task.isDone} />
								{task.title}
								<button onClick={() => props.deleteTask(task.id)}>X</button>
							</li>
						))
						}
				</ul>
			</div>
			<div className='buttons'>
				<button onClick={() => props.changeFilter('active')}>Active</button>
				<button onClick={() => props.changeFilter('all')}>All</button>
				<button onClick={() => props.changeFilter('completed')}>Completed</button>
			</div>
		</div>
	)
}