import { useTasks } from "../App";

const Form = () => {
    const { handleChange, handleSubmit, setAddingTask, newTask, setNewTask } = useTasks();
    return (
        <form className="addNewTaskForm">
            <div className="menuBar">
                <button className="closeForm" onClick={(e) => {e.preventDefault();  setAddingTask(false); setNewTask("")}}>X</button>
            </div>
            <label>
                {/* <span>Task Subject</span> */}
                <input name="newTask" value={newTask} onChange={handleChange} placeholder="Task"/>
            </label>
            <button onClick={handleSubmit}>Add</button>
        </form>
    )
}

export default Form;