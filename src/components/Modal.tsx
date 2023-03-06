import React from 'react'

interface ModalProps {
  show?: boolean
  title?: React.ReactNode
  body?: React.ReactNode
  footer?: React.ReactNode
  onClick?: () => void
}

const Modal: React.FC<ModalProps> = ({
  show,
  title,
  body,
  footer,
  onClick,
}) => {
  if (show == null || !show) {
    return <></>
  }

  return (
    <div
      className="absolute top-0 left-0 z-1 justify-center items-center flex w-full h-screen bg-gray-700 bg-opacity-80"
      onClick={onClick}
    >
      <div className="w-full max-w-md shadow rounded-lg bg-white">
        <div className="p-3 border-b border-gray-200 text-lg">{title}</div>

        <div className="px-3 py-4">{body}</div>

        <div className="p-3 border-t border-gray-200">{footer}</div>
      </div>
    </div>
  )
}

export default Modal
