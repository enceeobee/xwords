function formatDate (date) {
  const weekday = date.toLocaleString('en-us', { weekday: 'long' })
  const month = date.toLocaleString('en-us', { month: 'long' })

  return `${weekday}, ${month} ${date.getDate()}, ${date.getFullYear()}`
}

export default formatDate
