import React from 'react'

import Modal from './Modal'

interface ConfirmationModalProps {
  show?: boolean
  onConfirm?: () => void
  onClose?: () => void
  children?: React.ReactNode
}

interface ModalFooterProps {
  onConfirm?: () => void
  onCancel?: () => void
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="justify-end gap-3 flex">
      <button
        className="py-2 px-3 text-gray-600 active:translate-y-[3px]"
        onClick={onCancel}
      >
        Cancel
      </button>

      <button
        className="mb-[3px] shadow-[rgb(209,213,219)_0px_3px_0px] rounded py-2 px-3 bg-gray-700 text-white active:translate-y-[3px] active:shadow-none"
        onClick={onConfirm}
      >
        Ok
      </button>
    </div>
  )
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  onConfirm,
  onClose,
  children,
}) => {
  const handleClick = (): void => {}
  const handleConfirm = (): void => {
    onConfirm?.()
    onClose?.()
  }

  return (
    <Modal
      show={show}
      title={<span>Confirmation</span>}
      footer={<ModalFooter onConfirm={handleConfirm} onCancel={onClose} />}
      body={children}
      onClick={handleClick}
    />
  )
}

export default ConfirmationModal
