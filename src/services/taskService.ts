import { type Task } from './../types'

export interface CreateTaskRequest {
  id: string
  name: string
  duration: number
}

export interface UpdateTaskRequest {
  id: string
  name: string
  duration: number
  position: number
  isActive: boolean
}

export interface TaskService {
  createTask: (req: CreateTaskRequest) => Promise<Task>
  updateTask: (req: UpdateTaskRequest) => Promise<Task>
  deleteTask: (id: string) => Promise<void>
  getTasks: () => Promise<Task[]>
}
