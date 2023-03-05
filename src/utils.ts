export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`
}

export const formatTime = (value: number): string => {
  const hours = Math.floor(value / 3600)
  const minutes = Math.floor((value % 3600) / 60)
  const seconds = Math.floor(value % 60)
  let output = `${padTime(minutes)}:${padTime(seconds)}`

  if (hours > 0) {
    output = `${hours}:${output}`
  }

  return output
}

export const padTime = (value: number): string => {
  return String(value).padStart(2, '0')
}
