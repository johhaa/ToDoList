import { ChangeEvent, useState, KeyboardEvent } from "react"

type EditableSpanPropsType = {
	title: string
	onChange: (newValue: string) => void
}

function EditableSpan(props: EditableSpanPropsType){

	const [editMode, setEditMode]  = useState(false)
	
	const [title, setTitle] = useState(props.title)

	const activateEditMode = () => {
		setEditMode(true)
		setTitle(props.title)
	}

	const disableEditMode = () => {
		setEditMode(false)
		props.onChange(title)
	}

	const onChangeHandler = (e : ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

	
	return editMode ? 
				 	<input 
						onBlur={disableEditMode}
						autoFocus 
						onChange={onChangeHandler}  
						value={title}
					/> : 
					<span onDoubleClick={activateEditMode}>{title}</span>
}

export default EditableSpan