import React from 'react'

interface AddTaskButtonProps {
  show?: boolean
  onClick?: () => void
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ show, onClick }) => {
  if (show == null || !show) {
    return <></>
  }

  return (
    <div
      className="rounded-lg border border-2 border-gray-400 border-dashed py-3 bg-sky-800 font-bold text-center text-gray-300 hover:text-white cursor-pointer"
      onClick={onClick}
    >
      Add Task
    </div>
  )
}

export default AddTaskButton
