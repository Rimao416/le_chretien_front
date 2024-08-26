import React from "react";
import AuthButton from "../AuthButton";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function RegisterSixthScreen() {
  const dispatch = useDispatch();
  const { user, handleChange } = useContext(UserContext);
  const { authData, message, status, permission } = useSelector(
    (state) => state.authReducer
  );
  return (
    <div className="auth__sixth">
      <p className="auth__label u-margin-bottom-medium">
        Nous sommes ravis de vous accueillir ! Avant de commencer, veuillez
        entrer votre date de naissance. Cela nous permettra de personnaliser
        votre expérience et de vous offrir un contenu adapté à votre âge.
      </p>
      <form className="auth__form">
        <div className="auth__username" style={{ textAlign: "left" }}>
          <label htmlFor="" className="auth__label label">
            Nom d'utilisateur
          </label>
          <input
            type="text"
            className="auth__input u-margin-top-small"
            onChange={handleChange}
          />
          <h1
            onClick={() => console.log("Saluter")}
            className="auth__message--privacy sub--label main-color"
            style={{ textAlign: "left", cursor: "pointer" }}
          >
            Sauter pour le moment
          </h1>
          <AuthButton text="Continuer" screen="null" />
        </div>
      </form>
    </div>
  );
}

export default RegisterSixthScreen;
