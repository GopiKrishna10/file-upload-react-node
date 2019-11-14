import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [state, setFile] = useState({ selectedFile: null });
  const [photoState, setPhotos] = useState({photos:[]});
  function onChangeHandler(event) {
    const filename = event.target.files[0];
    setFile({ selectedFile: filename });
  }
  function uploadFiles() {
    const data = new FormData();
    // for(let i = 0;i<state.selectedFile.length;i++){
    // data.append('file',state.selectedFile[i]);
    // }
    data.append('file',state.selectedFile);

    axios.post('http://localhost:8000/upload',data,{
    }).then(res => {
        axios.get('http://localhost:8000/photos').then((data) => {
          setPhotos({photos:data.data});
        });
    })
  }
  function DisplayImages(props){
    let listItems = []
    if(props.images.length){
          listItems = props.images.map((d) => <img key={d} width='100' height = '100' src={`data:image/jpeg;base64,${d}`} />);
    }
    return (
      // if(props.images.length)
      // {
        <div>
         <div>{listItems}</div>
        </div>
       
      // }
      )
  }
  useEffect(() => {
    console.log('I will run only when valueA changes', state);
  }, [state]);
   useEffect(() => {
    console.log('I will run only when photos changes', photoState.photos);
  }, [photoState]);
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <div>
          <input type="file" name="file" multiple onChange={onChangeHandler} />
        </div>
        <div>
          <button onClick={uploadFiles}> Upload</button>
        </div>
        <DisplayImages images={photoState.photos}/>

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
