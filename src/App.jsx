import React, { useState, useEffect } from 'react'

function App() {
  const [input, setInput] = useState('')

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('')
    } else if (value === '=') {
      try {
        setInput(eval(input).toString())
      } catch {
        setInput('Error')
      }
    } else {
      setInput(input + value)
    }
  }

  const handleKeyDown = (event) => {
    const { key } = event
    if (/^[0-9+\-*/.]$/.test(key)) {
      setInput((prev) => prev + key)
    } else if (key === 'Enter') {
      try {
        setInput(eval(input).toString())
      } catch {
        setInput('Error')
      }
    } else if (key === 'Backspace') {
      setInput((prev) => prev.slice(0, -1))
    } else if (key.toLowerCase() === 'c') {
      setInput('')
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  const buttons = [
    '7','8','9','/',
    '4','5','6','*',
    '1','2','3','-',
    '0','.','=','+',
    'C'
  ]

  return (
    <div className="calculator">
      <div className="display">{input || '0'}</div>
      <div className="buttons">
        {buttons.map((btn, index) => (
          <button key={index} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
