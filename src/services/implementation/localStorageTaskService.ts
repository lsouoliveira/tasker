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
    }

    const state: TaskerState = getState()
    const tasks: Task[] = state.tasks

    tasks.push(newTask)
    saveState(state)

    return await Promise.resolve(newTask)
  }

  async getTasks(): Promise<Task[]> {
    const state: TaskerState = getState()

    return await Promise.resolve(state.tasks)
  }

  async updateTask(task: UpdateTaskRequest): Promise<Task> {
    const state: TaskerState = getState()
    const tasks: Task[] = state.tasks

    const index = tasks.findIndex((t) => t.id === task.id)

    if (index === -1) {
      throw new Error('Task not found')
    }

    tasks[index] = task

    saveState(state)

    return await Promise.resolve(task)
  }
}
