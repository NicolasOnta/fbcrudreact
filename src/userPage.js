import React, { useState, useEffect } from 'react';
import { db } from './firebase-conf';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";

const ComponentPicker =(props)=> {
  const [components, setComponents] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [selectedApplication, setSelectedApplication]=useState();
  const [searchedApplication, setSearchedApplication]=useState();
  const [searchedbudget, setSearchedBudget]=useState(0);
  const[searchedType, setSearchedType]=useState(0);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [budget, setBudget]=useState(0);
  let componentSelectedList=[];
  const componentsCollectionRef = collection(db, "components");
  const calificationsCollectionRef = collection(db, "componentCalification");
  const[califications, setCalifications]=useState([]);
  const[operation, setOperation]=useState(0);
  const [averageCalification, setAverageCalification] = useState(0);
  const[showSearch,setShowSearch]=useState(false)
  const[finalList, setFinalList]=useState([]);
  const applicationsCollectionRef = collection(db, "applications");
  const [recomendations, setRecomendations]=useState([]);
  const[applications, setApplications]=useState([]);

  function fetchAll(){
    const getComponents = async () => {
      const data = await getDocs(componentsCollectionRef);
      const appData = await getDocs(applicationsCollectionRef);
      const notaData = await getDocs(calificationsCollectionRef);
      setComponents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setApplications(appData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setCalifications(notaData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getComponents();
  };

  function handleComponentChange(event) {
    const selectedComponent = components[event.target.value];
    componentSelectedList.push(selectedComponent)
    setSelectedComponents((prevSelectedComponents) => [...prevSelectedComponents, selectedComponent]);
    setTotalCost((prevTotalCost) => prevTotalCost + selectedComponent.price);
  }

 function handleApplicationChange(event){ 
    setSelectedApplication(event.target.value);
 }

 function handleBudgetChange(event){
  setBudget(parseFloat(event.target.value));
 }

 function handleSearchedBudgerChange(event){
  setSearchedBudget(event.target.value);
 }

 function handleSearchedApplicationChange(event){
  setSearchedApplication(event.target.value);
 }

 function handleSearchedTypeChange(event){
  setSearchedType(event.target.value);
 }

 function handleOperatorChange(event){
  setOperation(event.target.value);
 }

 function handleSearch(){
  let finalList=[];
  finalList=components
 }

//  function calculateAverageCalification() {
//   let totalCalification = 0;
//   let numComponents = 0;
//   selectedComponents.forEach((selectedComponent) => {
//     const calification = califications.find((calification) => calification.idComponent === selectedComponent.id);
//     const calificationCatched = calification ? calification.find((calf) => calf.idApplication === selectedApplication.id) : null;
//     console.log(calificationCatched);
//   });
// }
function ordenarPorCalidadPrecio(a, b) {
  const relacionCalidadPrecioA =( (califications.filter((calification)=>calification.idComponent === a.id).find((calf)=>calf.idApplication === selectedApplication))!==undefined ? (califications.filter((calification)=>calification.idComponent === a.id).find((calf)=>calf.idApplication === selectedApplication).nota/ a.price):1);
  const relacionCalidadPrecioB = ( (califications.filter((calification)=>calification.idComponent === b.id).find((calf)=>calf.idApplication === selectedApplication))!==undefined ? (califications.filter((calification)=>calification.idComponent === b.id).find((calf)=>calf.idApplication === selectedApplication).nota/ b.price):1);
  console.log(relacionCalidadPrecioA+ a.name);
  console.log(relacionCalidadPrecioB );
  if (relacionCalidadPrecioA > relacionCalidadPrecioB) {
    return -1;
  } else if (relacionCalidadPrecioA < relacionCalidadPrecioB) {
    return 1;
  } else {
    return 0;
  }
}

function getSearchedCalifications() {
  const calificacionesFiltradas = califications.filter(calificacion => calificacion.nota >= searchedbudget && calificacion.idApplication == searchedApplication);
  return calificacionesFiltradas.map(calificacion => {
    const componente = components.find(c => c.id === calificacion.idComponent && c.type==searchedType);
    if(componente===undefined)return(<div></div>);
    return (
      <div>
        {componente.name} {calificacion.nota}
      </div>
    );
  });
}

function getSearchedNota(component){
  if((califications.filter((calification)=>calification.idComponent === component.id).find((calf)=>calf.idApplication === searchedApplication))===undefined){
    // eslint-disable-next-line no-unused-expressions
    (califications.filter((calification)=>calification.idComponent === component.id).find((calf)=>calf.idApplication === searchedApplication)).nota
  }
 else{
  return(1)
 }
}


  
  return (
    <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <button class="btn btn-primary btn-block" onClick={fetchAll}>Get component</button>
        <div class="form-group mt-3">
          <label for="budget">Budget</label>
          <input class="form-control" onChange={handleBudgetChange} type="number"></input>
        </div>
        <div class="form-group">
          <label for="application">Application</label>
          <select class="form-control" onChange={handleApplicationChange} >
            {applications.map((application, index) => (
              <option key={index} value={application.id}>{application.name}</option>
            ))}
          </select>
        </div>
        {Object.keys(components).map((type) => (
          <div class="form-group" key={type}>
            <label htmlFor={type}>{type}</label>
            <select class="form-control" name={type} onChange={handleComponentChange} >
              {components.map((component, index) => (
                component.type==type ? <option key={component.id} value={index}>{component.name}</option> : null 
              ))}
            </select>
          </div>
        ))}
        <div class="mt-3">
          <p>Total cost: {totalCost}$</p>
          {totalCost > budget &&  <div><p class="text-danger">The total cost exceeds the budget!</p> {components.sort(ordenarPorCalidadPrecio).map((component,index)=>(<div>{component.name}</div>))}</div>} 
        </div>
      </div>
    </div>
    <div style={
      {
        "backgroundColor":"yellow",
        "display":"flex"
      }
    }>
      <div class="form-group mt-3">
        <label for="comp">Searched Component</label>
        <select class="form-group mt-3" onChange={handleSearchedTypeChange} defaultValue="--">
          <option value={0}>Graphic Card</option>
          <option value={1}>CPU</option>
          <option value={2}>Ram</option>
          <option value={3}>HDD/SDD</option>
          <option value={4}>MotherBoard</option>
        </select>
    </div>
<div class="form-group mt-3">
          <label for="budget">Searched Grade</label>
          <input class="form-control" onChange={handleSearchedBudgerChange} type="number"></input>
        </div>
    <div class="form-group mt-3">
    <label for="budget">Searched Application</label>
    <select class="form-control" onChange={handleSearchedApplicationChange} >
            {applications.map((application, index) => (
              <option key={index} value={application.id}>{application.name}</option>
            ))}
          </select>
    </div>
{getSearchedCalifications()}
    </div>
   
    </div>
  );
            }

            export default ComponentPicker;