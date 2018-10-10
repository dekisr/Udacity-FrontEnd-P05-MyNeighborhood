import React from 'react'

function DataFailed(props) {
  return (
    <div className="loading">
      <span>FAIL</span>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  )
}

export default DataFailed;