import React from 'react'

function Loading(props) {
  return (
    <div className="loading" aria-label="Loading Content">
      <div className="lds-ripple"><div></div><div></div></div>
    </div>
  )
}

export default Loading;