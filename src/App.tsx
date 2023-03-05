import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import AddTaskButton from './components/AddTaskButton'
import Header from './components/Header'
import NewTaskForm, { type NewTaskFormData } from './components/NewTaskForm'
import TaskList from './components/TaskList'
import TaskPlayer from './components/TaskPlayer'
import { type Task } from './types'
import { taskService } from './services'

const App: React.FC<any> = () => {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    getTasks().catch(console.error)
  }, [])

  const getTasks = async (): Promise<void> => {
    const tasks = await taskService.getTasks()

    setTasks(tasks)
  }

  const saveTask = async (name: string, duration: number): Promise<void> => {
    const payload = {
      id: uuidv4(),
      name,
      duration,
    }

    const createdTask = await taskService.createTask(payload)

    setTasks([...tasks, createdTask])
  }

  const handleAddTask = (): void => {
    setShowForm(true)
  }

  const handleCancelAddTask = (): void => {
    setShowForm(false)
  }

  const handleFormSubmit = ({ name, duration }: NewTaskFormData): void => {
    saveTask(name, duration).catch(console.error)
  }

  const getRemainingTime = (): number => {
    return tasks.reduce((acc, task) => {
      if (!task.isActive) {
        return 0
      }

      return acc + task.duration
    }, 0)
  }

  const handlePlay = (): void => {}

  const handlePause = (): void => {}

  return (
    <div className="App bg-sky-700 min-h-screen">
      <div className="max-w-xl mx-auto pb-3">
        <Header />

        <div className="mt-3">
          <TaskPlayer
            time={getRemainingTime()}
            onActive={handlePlay}
            onInactive={handlePause}
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="py-3 border-b border-gray-100 text-white font-bold">
            Tasks
          </div>

          <TaskList tasks={tasks} />
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
