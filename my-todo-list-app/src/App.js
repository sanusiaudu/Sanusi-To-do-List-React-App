import React, { useState } from "react"
import "./App.css"

function App() {
  const [todo, setTodo] = useState("")
  const [listItems, setListItems] = useState([])
  const [editedText, setEditedText] = useState("")
  const [editingTask, setEditingTask] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }

    if (newTodo.text !== ""){
      setListItems([...listItems].concat(newTodo))
    } else {

    }

    setTodo("")
  }

  function deleteTask(id) {
    const newListItems = [...listItems].filter((item) => item.id !== id)

    setListItems(newListItems)
  }

  function toggleComplete(id) {
    const newListItems = [...listItems].map((item) => {
      if (item.id === id) {
        item.completed = !item.completed
      }
      return item
    })

    setListItems(newListItems)
  }

  function editTask(id) {
    const newListItems = [...listItems].map((item) => {
      if (item.id === id && editedText !== "") {
        item.text = editedText
      }
      return item
    })
    setListItems(newListItems)
    setEditingTask(null)
    setEditedText("")
  }

  const date = new Date()
  const day = date.toDateString().slice(0, 3)
  const restOfDate = date.toDateString().slice(3)

  return (
    <div className="Todo">
      <div>
        <h1>Todo List</h1>
        <h3>{day + restOfDate}</h3>
      </div>

      <h3>Tasks {listItems.length}</h3>

      <div className="listSection">
        {listItems.map((item) => (
          <div className="todoItem" key={item.id}>
            <div className="textSection">
              <input
                type="checkbox"
                onChange={() => toggleComplete(item.id)}
                checked={item.completed}
                className="checkbox"
              />
              {editingTask === item.id ? (
                <input
                  type="text"
                  placeholder={item.text}
                  onChange={(e) => setEditedText(e.target.value)}
                  value={editedText}
                  className="todoInput editInput"
                />
              ) : (
                <div className="todoTask">{item.text}</div>
              )}
            </div>

            <div className="activitySection">
              {editingTask === item.id ? (
                <button
                  onClick={() => editTask(item.id)}
                  className="activityBtn"
                >
                  Submit Task
                </button>
              ) : (
                <button
                  onClick={() => setEditingTask(item.id)}
                  className="activityBtn"
                >
                  {" "}
                  Edit Task
                </button>
              )}

              <button
                onClick={() => deleteTask(item.id)}
                className="activityBtn delete"
              >
                Delete Task
              </button>
            </div>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="todoForm">
          <input
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            className="todoInput"
            placeholder="New Task"
          />
          <button className="todoBtn" type="submit">
            Add Task
          </button>
        </form>
      </div>
    </div>
  )
}

export default App