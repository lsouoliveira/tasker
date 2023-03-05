import React from 'react'

import { formatTime } from '../utils'

interface TaskListItemProps {
  id: string
  name: string
  duration: number
  position: number
  isActive: boolean
  onDelete?: (id: string) => void
}

const TaskListItem: React.FC<TaskListItemProps> = ({
  id,
  name,
  duration,
  position,
  isActive,
  onDelete,
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

        <div className="items-center gap-3 flex">
          <div className="text-gray-600">
            {formattedPosition}/{formattedDuration}
          </div>
          <div>
            <button
              type="button"
              className="px-3 py-3 text-gray-700 hover:text-gray-500"
              onClick={() => onDelete?.(id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default TaskListItem
