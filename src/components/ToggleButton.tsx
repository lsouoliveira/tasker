import React from 'react'

interface ToggleButtonProps {
  activeText?: string
  inactiveText?: string
  onClick?: () => void
  onActive?: () => void
  onInactive?: () => void
  isActive?: boolean
}

const BASE_CLASS_NAME = `rounded-md 
shadow-[rgb(209,213,219)_0px_6px_0px] 
mb-[6px] 
min-w-[12.5rem] 
py-3 
px-3 
bg-white 
text-xl 
font-bold 
uppercase 
text-sky-700`

const ACTIVE_CLASS_NAME = `translate-y-[6px] shadow-none`

const ToggleButton: React.FC<ToggleButtonProps> = ({
  activeText,
  inactiveText,
  onClick,
  onActive,
  onInactive,
  isActive
}) => {
  const isEnabled = (): boolean => {
    return isActive ?? false
  }

  const activeClassName = (): string => {
    if (!isEnabled()) {
      return ''
    }

    return ACTIVE_CLASS_NAME
  }

  const className = (): string => {
    return `${BASE_CLASS_NAME} ${activeClassName()}`
  }

  const handleClick = (): void => {
    onClick?.()
    isEnabled() ? onInactive?.() : onActive?.()
  }

  return (
    <button type="button" className={className()} onClick={handleClick}>
      {isEnabled() ? activeText : inactiveText}
    </button>
  )
}

export default ToggleButton
