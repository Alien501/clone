import './App.css'
import BoxHover from './BoxHover'

function App() {

  return (
    <>
      <div className="box-container">
        <BoxHover
          row={10}
          column={10}
          symbol='+'
          numberOfTrail={10}
        />
      </div>
    </>
  )
}

export default App
