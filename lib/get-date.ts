export default function getDate() {
  let date = new Date()

  return date.toISOString().substring(0, 10)
}