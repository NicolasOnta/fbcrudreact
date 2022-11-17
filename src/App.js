import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-conf";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
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
  const [newName, setNewName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setNewDescription]= useState("");
  const [brand, setBrand]= useState("");

  const [components, setComponents] = useState([]);
  const componentsCollectionRef = collection(db, "components");
  const auth = getAuth();
  const [usuario, setUsuario] = useState(null);

  const createUser = async () => {
    await addDoc(componentsCollectionRef, { name: newName, price: Number(price), description:description, brand:brand});
  };

  const updateUser = async (id) => {
  const passwordChange = prompt("Ingrese la nueva contraseña:");
  if (passwordChange == null || passwordChange === "") {
    window.alert("No se cambio la contraseña");
  } else {
    const userDoc = doc(db, "users", id);
    const newFields = { password: passwordChange };
    await updateDoc(userDoc, newFields);
  }
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "components", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(componentsCollectionRef);
      setComponents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [componentsCollectionRef]);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
      } else {
        setUsuario(null)
      }
    });
  })

  const cerrarSesion = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
    });
  };

  return (
    <div className="App">
      <div className="Login">
    <>{usuario ? 
     <div className="previous app">
     <input
       placeholder="Nombre del componente"
       onChange={(event) => {
         setNewName(event.target.value);
       }}
     />
     <input
       type="number"
       placeholder="Precio"
       onChange={(event) => {
         setPrice(event.target.value);
       }}
     />
     <input
       placeholder="Descripcion"
       onChange={(event) => {
         setNewDescription(event.target.value);
       }}
     />
     <input
       placeholder="Marca"
       onChange={(event) => {
         setBrand(event.target.value);
       }}
     />

     <button onClick={createUser}> Ingresar Componente</button>
     {components.map((component) => {
       return (
         <div>
           {" "}
           <h1>Nombre: {component.name}</h1>
           <h1>Precio: {component.price}</h1>
           <h1>Marca: {component.brand}</h1>
           <h1>Descripcion: {component.description}</h1>
           <button
             onClick={() => {
               updateUser(component.id);
             }}
           >
             {" "}
             Cambiar Contraseña
           </button>
           <button
             onClick={() => {
               deleteUser(component.id);
             }}
           >
             {" "}
             Eliminar usuario
           </button>
           <button onClick={cerrarSesion}>Cerrar Sesión</button>
         </div>
         
       );
     })}
     </div>
    : <Login setUsuario={setUsuario} />}</>;
      </div>
    </div>
  );
}

export default App;