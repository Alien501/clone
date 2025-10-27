import { useState } from 'react'
import './App.css'
import BoxHover from './BoxHover'

function App() {
  const [config, setConfig] = useState({
    row: 10,
    column: 10,
    symbol: '+',
    numberOfTrail: 10
  });

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setConfig(prev => {
      return {
        ...prev,
        [id]: id === 'symbol' ? value : Number(value)
      }
    })
  }

  return (
    <>
      <div className="box-container">
        <BoxHover
          row={config.row}
          column={config.column}
          symbol={config.symbol}
          numberOfTrail={config.numberOfTrail}
        />

        <div className="controls">
          <div className="control-group">
            <label htmlFor="row">Rows: </label>
            <input value={config.row} onChange={onValueChange} type="number" name="row" id="row" min="1" max="20" />
          </div>
          <div className="control-group">
            <label htmlFor="column">Columns: </label>
            <input value={config.column} onChange={onValueChange} type="number" name="column" id="column" min="1" max="20" />
          </div>
          <div className="control-group">
            <label htmlFor="symbol">Symbol: </label>
            <input value={config.symbol} onChange={onValueChange} type="text" name="symbol" id="symbol" maxLength={1} />
          </div>
          <div className="control-group">
            <label htmlFor="numberOfTrail">Trail Length: </label>
            <input value={config.numberOfTrail} onChange={onValueChange} type="number" name="numberOfTrail" id="numberOfTrail" min="1" max="50" />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
