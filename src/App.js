import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    taskInput: '',
    tagInput: tagsList[0].optionId,
    tasks: [],
    activeTagId: '',
  }

  onChangeTask = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeTag = event => {
    this.setState({tagInput: event.target.value})
  }

  addTask = event => {
    event.preventDefault()
    const {taskInput, tagInput, tasks} = this.state
    const tagName = tagsList.find(eachObj => eachObj.optionId === tagInput)

    const task = {
      id: uuidv4(),
      name: taskInput,
      tag: tagName.displayText,
    }

    this.setState({
      taskInput: '',
      tagInput: tagsList[0].optionId,
      tasks: [...tasks, task],
    })
  }

  updateActiveTag = id => {
    this.setState(prevState => ({
      activeTagId: prevState.activeTagId === id ? '' : id,
    }))
  }

  render() {
    const {taskInput, tagInput, tasks, activeTagId} = this.state
    const filteredTasks = tasks.filter(eachObj =>
      eachObj.tag.includes(activeTagId),
    )
    const showTasks = filteredTasks.length > 0

    return (
      <div className="app-cont">
        <form className="form-cont" onSubmit={this.addTask}>
          <h1>Create a task!</h1>
          <div className="input-cont">
            <label htmlFor="task-input">Task</label>
            <input
              placeholder="Enter the task here"
              id="task-input"
              value={taskInput}
              onChange={this.onChangeTask}
              className="input-el"
            />
          </div>
          <div className="input-cont">
            <label htmlFor="tag-input">Tags</label>
            <select
              id="tag-input"
              value={tagInput}
              onChange={this.onChangeTag}
              className="select-el"
            >
              {tagsList.map(eachObj => (
                <option key={eachObj.optionId} value={eachObj.optionId}>
                  {eachObj.displayText}
                </option>
              ))}
            </select>
          </div>
          <button className="butt" type="submit">
            Add Task
          </button>
        </form>
        <div className="tasks-cont">
          <h1 className="head">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(eachObj => {
              const onClickTag = () => {
                this.updateActiveTag(eachObj.optionId)
              }
              const tagClass =
                activeTagId === eachObj.optionId ? 'active-tag' : 'tag-butt'

              return (
                <li key={eachObj.optionId}>
                  <button
                    type="button"
                    onClick={onClickTag}
                    className={tagClass}
                  >
                    {eachObj.displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <h1 className="head">Tasks</h1>
          {showTasks ? (
            <ul className="tasks-list">
              {filteredTasks.map(eachObj => (
                <li key={eachObj.id} className="task-item">
                  <p>{eachObj.name}</p>
                  <p className="span-el">{eachObj.tag}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="ntv">
              <p>No Tasks Added Yet</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
