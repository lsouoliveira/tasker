import React, { useState } from 'react'

export interface NewTaskFormData {
  name: string
  duration: number
}

interface NewTaskFormProps {
  show?: boolean
  onCancel?: () => void
  onSubmit?: (arg0: NewTaskFormData) => void
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({
  show,
  onCancel,
  onSubmit,
}) => {
  const [name, setName] = useState<string>('')
  const [duration, setDuration] = useState<number>(0)

  if (show == null || !show) {
    return <></>
  }

  const clearForm = (): void => {
    setName('')
    setDuration(0)
  }

  const handleNameChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setName(value)
  }

  const handleDurationChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setDuration(parseInt(value))
  }

  const handleSubmit = (): void => {
    const task = { name, duration }

    if (task.name === '' || task.duration === 0) {
      return
    }

    clearForm()
    onSubmit?.(task)
  }

  const handleCancel = (): void => {
    clearForm()
    onCancel?.()
  }

  return (
    <div className="overflow-hidden rounded-lg box-shadow bg-white">
      <div className="p-3 pt-4">
        <input
          type="text"
          className="w-full rounded-lg py-2 outline-none text-xl font-semibold text-gray-600 placeholder:italic placeholder:text-gray-200"
          placeholder="What task will you do?"
          onChange={handleNameChange}
          value={name}
        />

        <div className="flex-col gap-3 flex mt-3">
          <label className="font-bold text-gray-700">Time</label>
          <input
            type="text"
            className="rounded w-20 px-3 py-2 bg-gray-200 font-bold text-gray-600 outline-none"
            inputMode="numeric"
            onChange={handleDurationChange}
            value={duration}
          />
        </div>
      </div>

      <div className="gap-2 justify-end flex p-3 bg-gray-200">
        <button
          className="py-2 px-3 text-gray-600 active:translate-y-[3px]"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          className="mb-[3px] shadow-[rgb(209,213,219)_0px_3px_0px] rounded py-2 px-3 bg-gray-700 text-white active:translate-y-[3px] active:shadow-none"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default NewTaskForm
