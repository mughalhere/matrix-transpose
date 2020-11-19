export const transpose = (matrix) => matrix.reduce(($, row) => row.map((_, i) => [...($[i] || []), row[i]]), [])

export const processData = dataString => {
  dataString = dataString.split("|")
  dataString.shift()
  dataString.pop()
  let list = Array(dataString.length)
  for (let i = 0; i < dataString.length; i++) {
    const row = dataString[i].split(",")
    row.pop()
    list[i] = Array(row.length)
    row.map((rowData, index) => list[i][index] = rowData)
  }
  return list
}
