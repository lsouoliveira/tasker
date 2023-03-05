import React, { useState } from 'react'
import AddTaskButton from './components/AddTaskButton'

import Header from './components/Header'
import NewTaskForm, { type NewTaskFormData } from './components/NewTaskForm'
import TaskList from './components/TaskList'
import TaskPlayer from './components/TaskPlayer'
import { type Task } from './types'

const App: React.FC<any> = () => {
  const [showForm, setShowForm] = useState<boolean>(false)

  const tasks = (): Task[] => {
    return [
      { id: '1', name: 'Task 1', duration: 120, position: 50, isActive: true },
      { id: '2', name: 'Task 2', duration: 120, position: 50, isActive: false },
      { id: '3', name: 'Task 3', duration: 120, position: 50, isActive: false },
    ]
  }

  const handleAddTask = (): void => {
    setShowForm(true)
  }

  const handleCancelAddTask = (): void => {
    setShowForm(false)
  }

  const handleFormSubmit = ({ name, duration }: NewTaskFormData): void => {
  }

  return (
    <div className="App bg-sky-700 min-h-screen">
      <div className="max-w-xl mx-auto pb-3">
        <Header />

        <div className="mt-3">
          <TaskPlayer />
        </div>

        <div className="flex flex-col gap-3">
          <div className="py-3 border-b border-gray-100 text-white font-bold">
            Tasks
          </div>

          <TaskList tasks={tasks()} />
        </div>

        <div className="mt-3">
          <AddTaskButton show={!showForm} onClick={handleAddTask} />
        </div>

        <div className="mt-3">
          <NewTaskForm
            show={showForm}
            onCancel={handleCancelAddTask}
            onSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default App
