import { type Task } from './../types'

const STATE_KEY = 'tasker-1.0.0@state'

export interface TaskerState {
  tasks: Task[]
}

const defaultState: TaskerState = {
  tasks: [],
}

export const getState = (): TaskerState => {
  const data = localStorage.getItem(STATE_KEY) ?? JSON.stringify(defaultState)

  return JSON.parse(data)
}

export const saveState = (state: TaskerState): void => {
  localStorage.setItem(STATE_KEY, JSON.stringify(state))
}
