import React, { useState } from 'react'

// ----- UTILS ----- //
import { transpose } from './utils'

// ----- STYLES ----- //
import './App.css'

const App = props => {
  const [state, setState] = useState({ matrix: [] })
  const [input, setInput] = useState({ m: '', n: '' })
  const { m, n } = input
  const { matrix } = state

  const handleChange = (event) => {
    setInput(m => ({ ...m, [event.target.name]: event.target.value }))
  }

  const handleMatrixChange = (event, m, n) => {
    setState(s => ({ ...s, matrix: matrix.map((row, index) => index === m ? row.map((col, i) => i === n ? event.target.value : col) : row) }))
  }

  const handleTranspose = () => {
    setState(s => ({ ...s, matrix: transpose(matrix) }))
  }

  const handleSubmit = event => {
    try {
      event.preventDefault()
      Object.entries(input).forEach(([key, value]) => {
        if (!parseInt(value))
          throw new Error(`Please input a number at '${key}'`)
      })
      setState(s => ({ ...s, matrix: Array(parseInt(m)).fill('').map(() => Array(parseInt(n)).fill('')) }))
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className='app-container center-align'>
      <form onSubmit={handleSubmit}>
        <label>
          m: <input type="text" name="m" value={m} onChange={handleChange} />
        </label>
        <label>
          n: <input type="text" name="n" value={n} onChange={handleChange} />
        </label>
        <br />
        <input type="submit" value="Create Transpose" />
      </form>
      {!!matrix.length && <div className='matrix-container'>
        Matrix:
        {matrix.map((_, m) =>
          <div key={m}>
            {_.map((_, n) => <input key={n} value={matrix[m][n]} onChange={event => handleMatrixChange(event, m, n)} />)}
          </div>
        )}
        <button onClick={handleTranspose}>Transpose</button>
      </div>}
    </div>
  )
}

export default App
