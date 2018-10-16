import React from 'react';

function DataFailed(props) {
  return (
    <div className="dataFailed">
      <span>Ceci n'est pas une pipe</span>
      <section className="message">
        <p>We had an error trying to fetch the data. Try again.</p>
      </section>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  )
}

export default DataFailed;