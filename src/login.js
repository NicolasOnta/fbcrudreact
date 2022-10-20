
import React,{useState} from "react";
import { app } from "./firebase-conf";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Login = (props) => {
  const [isRegistrando, setIsRegistrando] = useState(false);
  const [email, setEmail]=useState();
  const [password, setPassword]=useState();
  const auth = getAuth(app);

  const crearUsuario = () => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage)
  });
  };

  const iniciarSesion = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorMessage = error.message;
      window.alert(errorMessage);
      console.log(errorMessage);
    });
  };

  return (
    <div>
      <h1> {isRegistrando ? "Regístrate" : "Inicia sesión"}</h1>
      <div >
        <label htmlFor="emailField" > Correo </label>
        <input type="email" id="emailField" onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor="passwordField" > Contraseña </label>
        <input type="password" id="passwordField" onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={isRegistrando ? crearUsuario : iniciarSesion}>
          {" "}
          {isRegistrando ? "Regístrate" : "Inicia sesión"}{" "}
        </button>
      </div>
      <button onClick={() => setIsRegistrando(!isRegistrando)}>
        {isRegistrando
          ? "¿Tas basadote y ya tienes cuenta?, Entra papi clickeando acá 😉"
          : "Si no tienes cuenta mano'h, puedes registrate aca 😋"}
      </button>
    </div>
  );
};

export default Login;