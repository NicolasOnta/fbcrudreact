
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCz8OoEk0CB_P8Ha1MfZp2v8KfTmBgxD_w",
    authDomain: "fir-crud-c586b.firebaseapp.com",
    databaseURL: "https://fir-crud-c586b-default-rtdb.firebaseio.com",
    projectId: "fir-crud-c586b",
    storageBucket: "fir-crud-c586b.appspot.com",
    messagingSenderId: "498813592130",
    appId: "1:498813592130:web:24127b98a52bc97557c3db"
  };
  // Initialize Firebase
  const fireDB=firebase.initializeApp(firebaseConfig);

  export default fireDB.database().ref();