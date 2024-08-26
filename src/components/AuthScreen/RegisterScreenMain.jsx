import React, { useContext, useState } from "react";
import AuthButton from "../buttons/AuthButton";
import { RegisterContext } from "../../context/RegisterContext";
import { userInfo } from "../../context/UserContext";
import { useDispatch } from "react-redux";
import { intializeAuth } from "../../redux/slice/authSlice";
function RegisterScreenMain() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(userInfo);

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const { actualScreen, setScreen } = useContext(RegisterContext);
  const handleOnClick = () => {
    dispatch(intializeAuth(user));
    setScreen("second_register");
  };
  console.log(actualScreen);
  return (
    <>
      <AuthButton
        icon="person-circle-outline"
        text="Utiliser un téléphone ou une adresse e-mail"
        color="user"
        onClick={handleOnClick}
      />
      <AuthButton
        icon="logo-google"
        text="S'inscrire avec Google"
        color="google"
        onClick={google}
      />
    </>
  );
}

export default RegisterScreenMain;
