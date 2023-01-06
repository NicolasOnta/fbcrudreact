import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-conf";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import AdminPage from "./AdminPage";
import ComponentPicker from "./userPage";
import Login from "./login";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [form, setForm] = useState(0);
  const [newName, setNewName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setNewDescription]= useState("");
  const [brand, setBrand]= useState("");
const [appName, newAppName]= useState("");
const [popularity, setPopularity]= useState(0);

 

  const auth = getAuth();
  // const [usuario, setUsuario] = useState(null);


  // const updateUser = async (id) => {
  // const passwordChange = prompt("Ingrese la nueva contraseña:");
  // if (passwordChange == null || passwordChange === "") {
  //   window.alert("No se cambio la contraseña");
  // } else {
  //   const userDoc = doc(db, "users", id);
  //   const newFields = { password: passwordChange };
  //   await updateDoc(userDoc, newFields);
  // }
  // };

 
  // useEffect(()=>{
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUsuario(user);
  //     } else {
  //       setUsuario(null)
  //     }
  //   });
  // })

  const cerrarSesion = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
    });
  };

  return (
    <div className="App">
      <div className="Login">
  
    <div>
              <button onClick={cerrarSesion}>Cerrar Sesión</button>
              <div>

               <ComponentPicker/>
               {/* <AdminPage/>  */}
              </div>
              </div> 
     {/* <Login setUsuario={setUsuario} /></> */}
      </div>
    </div>
  );
}

export default App;