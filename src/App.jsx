import React, { useRef } from 'react'



function App() {
  const inputRef = useRef(null)

  // const onClickhanddler = () => {
  //   inputRef.current.focus();
  // }


  function onClickhanddler() {
    inputRef.current.focus();
  }
  return (
    <div>
      <h1>profilename</h1>
      <input
        type='text'
        
        ref={inputRef}
      />
      <button onClick={onClickhanddler}>save</button>
    </div>
  )
}

export default App