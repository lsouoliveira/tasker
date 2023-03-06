import React, { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

import AddTaskButton from './components/AddTaskButton'
import Header from './components/Header'
import NewTaskForm, { type NewTaskFormData } from './components/NewTaskForm'
import TaskList from './components/TaskList'
import TaskPlayer from './components/TaskPlayer'
import { type Task } from './types'
import { taskService } from './services'
import ConfirmationModal from './components/ConfirmationModal'

const App: React.FC<any> = () => {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null)
  const [showSkipModal, setShowSkipModal] = useState<boolean>(false)
  const [showResetModal, setShowResetModal] = useState<boolean>(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const tasksRef = useRef<Task[]>(tasks)

  tasksRef.current = tasks

  useEffect(() => {
    getTasks().catch(console.error)
  }, [])

  useEffect(() => {
    if (!isPlaying) {
      setCurrentTaskId(null)
      return
    }

    const nextTask = getNextTask()

    if (nextTask == null) {
      setIsPlaying(false)
      return
    }

    setCurrentTaskId(nextTask.id)
  }, [isPlaying])

  useEffect(() => {
    clearTimer()

    if (isPlaying && currentTaskId != null) {
      timerRef.current = setInterval(() => {
        updatePlayer(currentTaskId)
      }, 1000)
    }
  }, [currentTaskId])

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

    setTasks((prevTasks) => {
      return [...prevTasks, createdTask]
    })
  }

  const updateTask = async (task: Task): Promise<void> => {
    const updatedTask = await taskService.updateTask(task)

    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id !== updatedTask.id) {
          return task
        }

        return updatedTask
      })
    })
  }

  const updateTasks = async (tasks: Task[]): Promise<void> => {
    for (const task of tasks) {
      await updateTask(task)
    }

    getTasks().catch(console.error)
  }

  const deleteTask = async (id: string): Promise<void> => {
    await taskService.deleteTask(id)

    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== id)
    })
  }

  const getNextTask = (): Task | undefined => {
    return tasks.find((task) => task.isActive)
  }

  const clearTimer = (): void => {
    if (timerRef.current == null) {
      return
    }

    clearInterval(timerRef.current)
    timerRef.current = null
  }

  const updatePlayer = (taskId: string): void => {
    const tasks = tasksRef.current
    const currentTask = tasks.find(
      (task) => task.id === taskId && task.isActive
    )

    if (currentTask == null) {
      return
    }

    const updatedTask = {
      ...currentTask,
      position: currentTask.position + 1,
    }

    if (updatedTask.position >= updatedTask.duration) {
      updatedTask.isActive = false
    }

    updateTask(updatedTask).catch(console.error)

    if (!updatedTask.isActive) {
      const nextTask = tasks.find(
        (task) => task.id !== updatedTask.id && task.isActive
      )

      if (nextTask == null) {
        setIsPlaying(false)
        return
      }

      setCurrentTaskId(nextTask.id)
    }
  }

  const play = (): void => {
    setIsPlaying(true)
  }

  const pause = (): void => {
    setIsPlaying(false)
  }

  const getRemainingTime = (): number => {
    return tasks.reduce((acc, task) => {
      if (!task.isActive) {
        return acc
      }

      return acc + task.duration - task.position
    }, 0)
  }

  const getOrderedTasks = (): Task[] => {
    return tasks.sort((a, b) => {
      if (a.isActive && !b.isActive) {
        return -1
      }

      if (!a.isActive && b.isActive) {
        return 1
      }

      return new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime()
        ? -1
        : 1
    })
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

  const handlePlay = (): void => {
    play()
  }

  const handlePause = (): void => {
    pause()
  }

  const handleReset = (): void => {
    setShowResetModal(true)
  }

  const handleSkip = (): void => {
    setShowSkipModal(true)
  }

  const handleSkipModalConfirm = (): void => {
    let currentTask = tasks.find((task) => task.id === currentTaskId)

    if (currentTask == null) {
      currentTask = getNextTask()
    }

    const nextActiveTask = tasks.find(
      (task) => task.id !== currentTask?.id && task.isActive
    )

    if (currentTask != null) {
      const updatedTask = {
        ...currentTask,
        isActive: false,
      }

      updateTask(updatedTask).catch(console.error)
    }

    setCurrentTaskId(nextActiveTask?.id ?? null)
  }

  const handleSkipModalClose = (): void => {
    setShowSkipModal(false)
  }

  const handleDelete = (id: string): void => {
    deleteTask(id).catch(console.error)
  }

  const handleResetModalConfirm = (): void => {
    const updatedTasks = tasks.map((task) => {
      return {
        ...task,
        position: 0,
        isActive: true,
      }
    })

    updateTasks(updatedTasks).catch(console.error)
    setIsPlaying(false)
  }

  const handleResetModalClose = (): void => {
      setShowResetModal(false)
  }

  return (
    <div className="App bg-sky-700 min-h-screen">
      <div className="max-w-xl mx-auto pb-3">
        <Header />

        <div className="mt-3">
          <TaskPlayer
            time={getRemainingTime()}
            onActive={handlePlay}
            onInactive={handlePause}
            onReset={handleReset}
            onSkip={handleSkip}
            isPlaying={isPlaying}
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="py-3 border-b border-gray-100 text-white font-bold">
            Tasks
          </div>

          <TaskList tasks={getOrderedTasks()} onDelete={handleDelete} />
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

      <ConfirmationModal
        show={showSkipModal}
        onClose={handleSkipModalClose}
        onConfirm={handleSkipModalConfirm}
      >
        are you sure?
      </ConfirmationModal>

      <ConfirmationModal
        show={showResetModal}
        onClose={handleResetModalClose}
        onConfirm={handleResetModalConfirm}
      >
        are you sure?
      </ConfirmationModal>
    </div>
  )
}

export default App
