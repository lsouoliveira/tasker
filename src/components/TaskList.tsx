import React from 'react'

import { type Task } from '../types'
import TaskListItem from './TaskListItem'

interface TaskListProps {
  tasks: Task[]
  onDelete?: (id: string) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskListItem key={task.id} {...task} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default TaskList
