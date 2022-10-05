import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-conf";
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
  const [newAge, setNewAge] = useState(0);
  const [password, setNewPassword]= useState("");
  const [lastName, setLastName]= useState("");
  const[username, setUsername]=useState("");

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge), password:password, lastName:lastName, username:username });
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
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [usersCollectionRef]);

  return (
    <div className="App">
      <input
        placeholder="Nombre"
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Edad..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <input
        placeholder="Apellido"
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      />
      <input
        placeholder="Contraseña"
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <input
        placeholder="Nombre de usuario"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />

      <button onClick={createUser}> Crear Usuario</button>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <h1>Nombre: {user.name}</h1>
            <h1>Edad: {user.age}</h1>
            <h1>Apellido: {user.lastName}</h1>
            <h1>Contraseña: {user.password}</h1>
            <h1>Nombre de usuario: {user.username}</h1>
            <button
              onClick={() => {
                updateUser(user.id);
              }}
            >
              {" "}
              Cambiar Contraseña
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              {" "}
              Eliminar usuario
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;