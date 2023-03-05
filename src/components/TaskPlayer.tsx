import React from 'react'

const TaskPlayer: React.FC<any> = () => {
  return (
    <div className="grid-cols-1 gap-9 grid rounded-lg py-6 bg-white bg-opacity-25">
      <div className="text-9xl leading-none font-semibold text-center text-white">
        05:00
      </div>

      <div className="justify-center flex">
        <button
          type="button"
          className="rounded-md shadow-[rgb(209,213,219)_0px_6px_0px] mb-[6px] min-w-[12.5rem] py-3 px-3 bg-white text-xl font-bold uppercase text-sky-700 active:translate-y-[6px] active:shadow-none"
        >
          start
        </button>
      </div>
    </div>
  )
}

export default TaskPlayer
