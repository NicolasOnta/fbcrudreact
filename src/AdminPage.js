import React from "react";
import { useEffect, useState } from "react";
import { db } from "./firebase-conf";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const AdminPage = (props) => {
  const [newName, setNewName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setNewDescription]= useState("");
  const [brand, setBrand]= useState("");
  const [type, setType]= useState(0);
const [appName, newAppName]= useState("");
const [appID, setAppID]= useState("");
const [componentId, setComponentId]= useState("");
const [nota, setNota]= useState(0);
const [popularity, setPopularity]= useState(0);
const [components, setComponents] = useState([]);
const[applications, setApplications]=useState([]);
const[califications, setCalifications]=useState([])
  const componentsCollectionRef = collection(db, "components");
  const applicationsCollectionRef = collection(db, "applications");
  const calificationsCollectionRef = collection(db, "componentCalification");

  const createComponents = async () => {
    await addDoc(componentsCollectionRef, { name: newName, price: Number(price), description:description, brand:brand, type:type});
  };

  const createApplications = async () =>{
    await addDoc(applicationsCollectionRef, { name: appName, popularity: popularity});
  }

  const createCalification = async () =>{
    await addDoc(calificationsCollectionRef, { idApplication: appID, idComponent: componentId, nota:nota});
  }

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
      const notaData = await getDocs(calificationsCollectionRef);
      setComponents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setApplications(appData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setCalifications(notaData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getComponents();
  }, [applicationsCollectionRef, calificationsCollectionRef, componentsCollectionRef]);


  return (
    <div className="AdminPage">
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
<select name="type" onChange={(event)=>{setType(event.target.value)}}>
  <option value={0}>Trajeta Grafica</option>
  <option value={1} selected>Procesador</option>
  <option value={2}>Ram</option>
  <option value={3}>Disco Duro</option>
  <option value={4}>MotherBoard</option>
</select>
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
           {/* <button onClick={cerrarSesion}>Cerrar Sesión</button> */}
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

         </div>
         
       );
     })}
     </div>
      <div className="NotaForm">
      <select name="componentNota" onChange={(event)=>{setComponentId(event.target.value)}}>
      {components.map((component) => {
       return (
         <option value={component.id}>{component.name} &nbsp;{component.brand} &nbsp;{component.description}</option>
       );
     })}
</select>
<select name="applicationNota" onChange={(event)=>{setAppID(event.target.value)}}>
      {applications.map((application) => {
       return (
         <option value={application.id}>{application.name}</option>
       );
     })}
</select>
<input
       type="number"
       placeholder="Nota"
       onChange={(event) => {
        setNota(event.target.value);
       }}
     />
<button onClick={createCalification}> Ingresar nota</button>
      </div>
     </div>
    </div>
  )
};

export default AdminPage;
