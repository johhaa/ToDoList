import { ChangeEvent, KeyboardEvent, useState } from "react"

type AddItemFormPropsType = {
	addItem: (newItemTitle: string) => void
	
}

function AddItemForm(props: AddItemFormPropsType){

	function addItem(){
		if(newItemTitle.trim() != ""){
		props.addItem(newItemTitle.trim())
		setNewItemTitle("")
		setError(false)
		}
		else{
			setError(true)
		}
	}


	const [newItemTitle, setNewItemTitle] = useState("")
	const [error, setError] = useState<true | false>(false)
	const onChangeHandler = (e : ChangeEvent<HTMLInputElement>) => setNewItemTitle(e.currentTarget.value)
	const onKeyPressHandler = (e : KeyboardEvent<HTMLInputElement>) => {if(e.charCode == 13) {addItem()}}		

	return(
		<div className="item-form">
			<input 
				value={newItemTitle} 
	  		onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				className={error ? "error" : ""}
			/>
			<button onClick={addItem}>+</button>
			{error && <div className='error-message'>Field is Required</div>}
		</div>
	)
}

export default AddItemForm