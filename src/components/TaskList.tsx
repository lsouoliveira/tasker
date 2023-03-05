import React from 'react'

import { type Task } from '../types'
import TaskListItem from './TaskListItem'

interface TaskListProps {
  tasks: Task[]
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskListItem key={task.id} {...task} />
      ))}
    </ul>
  )
}

export default TaskList
