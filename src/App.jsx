
import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [todoList, settodoList] = useState(JSON.parse(localStorage.getItem('TODO')) ?? []);
  const [newTask, setnewTask] = useState("");
  const [description, setDescription] = useState("");



  useEffect(() => {
    localStorage.setItem("TODO", JSON.stringify(todoList))
  }, [todoList]);

  const handleInputChange = (e) => {

    setnewTask(e.target.value)

  }
  const handleChange = (e) => {

    setDescription(e.target.value)

  }
  const addNewTask = () => {

    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      Title: newTask,
      Description: description,
      Status: false,

    }

    // localStorage.setItem("TODO", JSON.stringify([...todoList,task]))
    settodoList([...todoList, task])
    setDescription("")
    setnewTask("")
  }

  const deleteTask = (id) => {
    const newTodoList = todoList.filter((task) => {

      return task.id !== id
    })
    // localStorage.setItem("TODO", JSON.stringify([...todoList,newTodoList])) 
    settodoList(newTodoList)
  }
  const changetaskStatus = (id) => {

    // const task=todoList.find((task)=>{
    // return task.id === id
    const newTodoList = todoList.map((task) => {
      if (task.id === id) {
        return { ...task, Status: !task.Status }
      }
      return task
    })
    settodoList(newTodoList)
  }


  return (
    <section>

      <div className="header">
        <div className="max-width">
          <h1 style={{ color: "brown", margin: "auto" }}> ADD TODO</h1><br />
          <div className="w-100">
          <label className='title' style={{ color: "black" }} htmlFor='title' >TASK</label><br />
          <input onChange={handleInputChange} style={{}} value={newTask} /><br />
          </div>
         
          <div className='w-100'>
          <label className="">DESCRIPTION</label><br />
          <textarea onChange={handleChange} value={description} /><br />
          </div>
          
          <button style={{ backgroundColor: "brown", color: "white" }} onClick={addNewTask}> ADD TASK</button>
        </div>
      </div>
      <ul className="taskList">
      <h1 style={{ color: "brown", margin: "20px auto" }}> TODOS</h1>
        {todoList.map((task) => {
           return (
            <li className="Todo" key={task.id}>
            <h3 style={{color:"brown",textTransform:'uppercase'}}>{task.Title}</h3>
            <div className='description'>
            <div className='w-70'>
            <p>{task.Description}</p>
            </div>
            
              <div className='w-30 description'>
              <input onChange={() => changetaskStatus(task.id)} type="checkbox" checked={task.Status} id={task.id} />
              <label htmlFor={task.id}>{task.Status ? "completed" : "not completed"} </label>
              <button aria-label="delete todo" onClick={() => deleteTask(task.id)}>x</button>  
              </div>
              
            </div>
              


            </li>




          )
        })}
      </ul>
    </section>
  )
}

export default App
