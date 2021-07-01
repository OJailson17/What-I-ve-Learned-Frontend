export const formatDate = date => {
  const getFullDate = String(new Date(date))
  const getDate = date.slice(0, 10)
  const getHour = getFullDate.split(" ")
  const newDate = getDate.replace(/-/g, "/")
  const hour = getHour[4].slice(0, 5)

  return `${newDate} - ${hour}`
}
