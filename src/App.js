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
  const [form, setForm] = useState(0);
  const [newName, setNewName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setNewDescription]= useState("");
  const [brand, setBrand]= useState("");
const [appName, newAppName]= useState("");
const [popularity, setPopularity]= useState(0);

  const [components, setComponents] = useState([]);
  const[applications, setApplications]=useState([])
  const componentsCollectionRef = collection(db, "components");
  const applicationsCollectionRef = collection(db, "applications");
  const auth = getAuth();
  const [usuario, setUsuario] = useState(null);

  const createComponents = async () => {
    await addDoc(componentsCollectionRef, { name: newName, price: Number(price), description:description, brand:brand});
  };

  const createApplications = async () =>{
    await addDoc(applicationsCollectionRef, { name: appName, popularity: popularity});
  }

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

  const deleteComponent = async (id) => {
    const userDoc = doc(db, "components", id);
    await deleteDoc(userDoc);
  };

  const deleteApplications = async (id) =>{
    const userDoc = doc(db, "applications", id);
    await deleteDoc(userDoc);
  }

  useEffect(() => {
    const getComponents = async () => {
      const data = await getDocs(componentsCollectionRef);
      const appData = await getDocs(applicationsCollectionRef);
      setComponents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setApplications(appData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getComponents();
  }, [applicationsCollectionRef, componentsCollectionRef]);

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
        <div className="componentForm">
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

     <button onClick={createComponents}> Ingresar Componente</button>
     {components.map((component) => {
       return (
         <div>
           {" "}
           <h1>Nombre: {component.name}</h1>
           <h1>Precio: {component.price}</h1>
           <h1>Marca: {component.brand}</h1>
           <h1>Descripcion: {component.description}</h1>
           {/* <button
             onClick={() => {
               updateUser(component.id);
             }}
           >
             {" "}
             Cambiar Contraseña
           </button> */}
           <button
             onClick={() => {
               deleteComponent(component.id);
             }}
           >
             {" "}
             Eliminar Componente
           </button>
           <button onClick={cerrarSesion}>Cerrar Sesión</button>
         </div>
         
       );
     })}
     </div>
      (
<div className="ApplicationForm">
     <input
       placeholder="Nombre de aplicación"
       onChange={(event) => {
        newAppName(event.target.value);
       }}
     />
     <input
       type="number"
       placeholder="Popularity"
       onChange={(event) => {
        setPopularity(event.target.value);
       }}
     />
     <button onClick={createApplications}> Ingresar Aplicacion</button>
     {applications.map((application) => {
       return (
         <div>
           {" "}
           <h1>Nombre: {application.name}</h1>
           <h1>Precio: {application.popularity}</h1>
           <button
             onClick={() => {
               deleteApplications(application.id);
             }}
           >
             {" "}
             Eliminar Aplicacion
           </button>
           <button onClick={cerrarSesion}>Cerrar Sesión</button>
         </div>
         
       );
     })}
     </div>
      
     </div>
    : <Login setUsuario={setUsuario} />}</>;
      </div>
    </div>
  );
}

export default App;