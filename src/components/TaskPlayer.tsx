import React from 'react'

import ToggleButton from './ToggleButton'
import { formatTime } from '../utils'

interface TaskPlayerProps {
  time?: number
  onActive?: () => void
  onInactive?: () => void
  onReset?: () => void
  onSkip?: () => void
  isPlaying?: boolean
}

const TaskPlayer: React.FC<TaskPlayerProps> = ({
  time,
  onActive,
  onInactive,
  onReset,
  onSkip,
  isPlaying,
}) => {
  const formattedTime = formatTime(time ?? 0)

  return (
    <div className="grid-cols-1 gap-9 grid rounded-lg py-6 bg-white bg-opacity-25">
      <div className="text-9xl leading-none font-semibold text-center text-white">
        {formattedTime}
      </div>

      <div className="justify-center gap-3 flex">
        <button
          type="button"
          className="px-3 py-3 text-white hover:text-gray-200"
          onClick={onReset}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>

        <ToggleButton
          activeText="pause"
          inactiveText="start"
          onActive={onActive}
          onInactive={onInactive}
          isActive={isPlaying}
        />

        <button
          type="button"
          className="px-3 py-3 text-white hover:text-gray-200"
          onClick={onSkip}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
              />
            </svg>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default TaskPlayer
