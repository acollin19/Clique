import App from "./pinFile";
import { create} from 'ipfs-http-client';


import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';


var firebaseConfig = {
  apiKey: "AIzaSyCO__d0ZevYj_heN1OkgICJcyfs01Ear-w",
  authDomain: "clique-52833.firebaseapp.com",
  projectId: "clique-52833",
  storageBucket: "clique-52833.appspot.com",
  messagingSenderId: "336766890285",
  appId: "1:336766890285:web:33a121aea598e05a2723a4",
  measurementId: "G-LZFZNFT6N3"
};

async function initializeAppFunctions() {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }else {
    firebase.app(); // if already initialized, use that one

  }
  const db = firebase.firestore();

  return db;
}


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
    
  }


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

// export const dataFile = async(db, url) => {
//   //const db = admin.firestore();
//   // data = {
//   //   ImageURL: uploadIPFS.obj(url),
//   //   Name: uploadIPFS.obj(name),
//   //   Description: uploadIPFS.obj(description)
//   // };

//   // Add a new url in collection "urlList" with ID 'LA'
//   const imageURL = await db.collection('urlList').doc("ImageUrl");
//   const res = await imageURL.set({
//     ImageURL: uploadIPFS.obj(url)
//   }, { merge: true });


//   return res;
// }