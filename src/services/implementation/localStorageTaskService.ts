import {
  type TaskService,
  type CreateTaskRequest,
  type UpdateTaskRequest,
} from './../taskService'
import { getState, saveState, type TaskerState } from './../localStorageService'
import { type Task } from './../../types'

export class LocalStorageTaskService implements TaskService {
  async createTask(req: CreateTaskRequest): Promise<Task> {
    const newTask: Task = {
      id: req.id,
      name: req.name,
      duration: req.duration,
      position: 0,
      isActive: true,
      createdAt: new Date(),
    }

    const state: TaskerState = getState()
    const tasks: Task[] = state.tasks

    tasks.push(newTask)
    saveState(state)

    return await Promise.resolve(newTask)
  }

  async updateTask(req: UpdateTaskRequest): Promise<Task> {
    const state: TaskerState = getState()
    const tasks: Task[] = state.tasks

    const taskIndex = tasks.findIndex((task) => task.id === req.id)

    if (taskIndex === -1) {
      throw new Error('Task not found')
    }

    const task: Task = tasks[taskIndex]

    task.name = req.name
    task.duration = req.duration
    task.position = req.position
    task.isActive = req.isActive

    saveState(state)

    return await Promise.resolve(task)
  }

  async deleteTask(id: string): Promise<void> {
    const state: TaskerState = getState()
    const tasks: Task[] = state.tasks

    const taskIndex = tasks.findIndex((task) => task.id === id)

    if (taskIndex === -1) {
      return
    }

    tasks.splice(taskIndex, 1)

    saveState(state)
  }

  async getTasks(): Promise<Task[]> {
    const state: TaskerState = getState()

    return await Promise.resolve(state.tasks)
  }
}
