import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [state, setFile] = useState({ selectedFile: null });

  function onChangeHandler(event) {
    const filename = event.target.files[0];
    setFile({ selectedFile: filename });
  }
  function uploadFiles() {
    const data = new FormData();
    data.append('file',state.selectedFile);
    axios.post('http://localhost:8000/upload',data,{

    }).then(res => {
      console.log('result',res);
    })
  }
  useEffect(() => {
    console.log('I will run only when valueA changes', state);
  }, [state]);
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <div>
          <input type="file" name="file" onChange={onChangeHandler} />
        </div>
        <div>
          <button onClick={uploadFiles}> Upload</button>
        </div>
        {/* {state.selectedFile} */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
