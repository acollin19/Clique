import { firebaseStorageRef } from "../utils/firebase";
import App from "./pinFile";
import { create} from 'ipfs-http-client';

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
  });


  export const uploadIPFS = async(imgUrl, infoName, infoDescription ) => {

    const obj = {
      "imageURL": imgUrl,
      "name": infoName, 
      "description": infoDescription
    }

    const stringify = JSON.stringify(obj);

    let res = null;

    try{
      res = await client.add(stringify, {
        progress: (prog) => {
          console.log("progress: ", prog);
        }
      });

    }catch(error){
      console.log(error);
    }

    //console.log(res.path);  ** CID
    //console.log(stringify); ** METADATA JSON
    return `https://ipfs.infura.io/ipfs/${res.path}`;
    
};

export const addImage = async(file) => {

    let res = null;

    try {
        res = await client.add(file, {
        progress: (prog) => {
            console.log("progress: ", prog);
        }
        });

    }catch(error){
        console.log(error);
    }

    return `https://ipfs.infura.io/ipfs/${res.path}`;

};