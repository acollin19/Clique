import { useState } from "react";
import { create } from "ipfs-http-client";

function App() {
  const [ path, setPath ] = useState(null); 
  const [ imgUrl, setImgUrl ] = useState(null);

  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
  });

  const uploadIPFS = async() => {
    const obj = {
      "imageURL": imgUrl, 
      "Name": "fire", 
      "Description": "lol"
    }

    const stringify = JSON.stringify(obj);

    // try out with file 
    // let data = new FormData(); 
    // data.append('file', new Blob([JSON.stringify(obj)], {type: 'application/json'}));

    try{
      const res = await client.add(stringify, {
        progress: (prog) => {
          console.log("progress: ", prog);
        }
      });

      setPath(`https://ipfs.infura.io/ipfs/${res.path}`);
    }catch(error){
      console.log(error);
    }
  };

  const addImage = async(e) => {
    const file = e.target.files[0];

    try {
      const res = await client.add(file, {
        progress: (prog) => {
          console.log("progress: ", prog);
        }
      });

      setImgUrl(`https://ipfs.infura.io/ipfs/${res.path}`);
    }catch(error){
      console.log(error);
    }

  };

  return (
    <div className="App">
      <h1>IPFS HTTP Client Test</h1>
      <p>IMG gets uploaded onChange, can change this to when upload is pressed</p>
      <h1>IMG URL: {imgUrl}</h1>
      <h1>PATH: {path}</h1>


      <input type="file" onChange={addImage}></input>

      <button onClick={uploadIPFS}>Upload</button>
    </div>
  );
}

export default App;
