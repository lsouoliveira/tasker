import React from 'react'

import { formatTime } from '../utils'

interface TaskListItemProps {
  id: string
  name: string
  duration: number
  position: number
  isActive: boolean
}

const TaskListItem: React.FC<TaskListItemProps> = ({
  id,
  name,
  duration,
  position,
  isActive,
}) => {
  const progressValue = (position / duration) * 100
  const formattedDuration = formatTime(duration)
  const formattedPosition = formatTime(position)

  const className = (): string => {
    return `relative 
      overflow-hidden 
      shadow-md 
      rounded-lg 
      h-12 
      ${isActive ? 'bg-white' : 'bg-gray-100'}
      cursor-pointer`
  }

  const progressBarClassName = (): string => {
    return `absolute 
            z-0 
            top-0 
            left-0 
            ${isActive ? '' : 'hidden'}
            h-full 
            bg-sky-100`
  }

  const elementsClassName = (): string => {
    return `absolute 
            z-1 
            justify-between 
            items-center 
            flex 
            w-full 
            h-full 
            px-3 
            ${isActive ? 'text-black' : 'text-gray-400'}`
  }

  return (
    <li className={className()} key={id}>
      <div
        className={progressBarClassName()}
        style={{ width: `${progressValue.toFixed(2)}%` }}
      ></div>

      <div className={elementsClassName()}>
        <div>{name}</div>

        <div className="text-gray-600">
          {formattedPosition}/{formattedDuration}
        </div>
      </div>
    </li>
  )
}

export default TaskListItem
