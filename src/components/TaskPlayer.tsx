import React from 'react'

import ToggleButton from './ToggleButton'
import { formatTime } from '../utils'

interface TaskPlayerProps {
  time?: number
  onActive?: () => void
  onInactive?: () => void
}

const TaskPlayer: React.FC<TaskPlayerProps> = ({
  time,
  onActive,
  onInactive,
}) => {
  const formattedTime = formatTime(time ?? 0)

  return (
    <div className="grid-cols-1 gap-9 grid rounded-lg py-6 bg-white bg-opacity-25">
      <div className="text-9xl leading-none font-semibold text-center text-white">
        {formattedTime}
      </div>

      <div className="justify-center flex">
        <ToggleButton
          activeText="pause"
          inactiveText="start"
          onActive={onActive}
          onInactive={onInactive}
        />
      </div>
    </div>
  )
}

export default TaskPlayer
