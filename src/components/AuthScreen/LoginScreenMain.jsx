import React,{useContext} from "react";
import AuthButton from "../buttons/AuthButton";
import { RegisterContext } from "../../context/RegisterContext";
function LoginScreenMain() {
    const {setScreen}=useContext(RegisterContext)

  return (
    <>
      <AuthButton
        icon="person-circle-outline"
        text="Utiliser un téléphone/e-mail/ nom d'utilisateur"
        color="user"
        onClick={() => setScreen("second_login")}
      />
      <AuthButton
        icon="logo-google"
        text="Continuer avec Google"
        color="google"
      />
      <AuthButton icon="logo-apple" text="Continuer avec Apple" color="apple" />
      <AuthButton
        icon="logo-facebook"
        text="Continuer avec Facebook"
        color="facebook"
      />
    </>
  );
}

export default LoginScreenMain;
