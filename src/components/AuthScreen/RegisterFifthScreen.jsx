import React, { useState } from "react";
import AuthButton from "../AuthButton";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { sendUsername, skipVerification } from "../../redux/slice/authSlice";
import MyForm from "../MyForm";

function RegisterFifthScreen() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  const { authData, message, status, permission } = useSelector(
    (state) => state.authReducer
  );
  const [usernameValidated, setUsernameValidatedValidated] = useState(false);
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9-_\.]{3,19}$/;

  const handleClick = () => {
    dispatch(skipVerification());
  };
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    if (usernameRegex.test(value)) {
      setUsernameValidatedValidated(true);
    } else {
      setUsernameValidatedValidated(false);
    }
    setUsername(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = { ...user, username };
    setUser(updatedUser);
    dispatch(sendUsername(updatedUser));
    // Dispatch Here
  };

  const isButtonDisabled = !usernameValidated;
  return (
    <div className="auth__fifth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <p className="auth__label u-margin-bottom-medium">
          Veuillez choisir un nom d'utilisateur unique pour votre compte. Ce nom
          d'utilisateur sera utilisé pour vous identifier et interagir avec
          notre plateforme.
        </p>
        <div className="auth__username" style={{ textAlign: "left" }}>
          <MyForm
            fieldName={"username"}
            label="Nom d'utilisateur"
            value={username}
            handleChange={handleChange}
            errorField={message.find((error) => error.field === "Username")}
          />
          <div
            className={`auth__verification--wrapper u-margin-top-medium ${
              usernameValidated && "auth__verification--wrapper--verified"
            }`}
          >
            <span className="auth__verification--icon">
              <ion-icon name="checkmark-outline"></ion-icon>
            </span>
            <span className="auth__verification--text">
              Le nom d'utilisation commence par une lettre, puis autorise les
              lettres, les chiffres, et seuls les caractères suivant sont
              autorisés: "-", "_", "." et se doit d'avoir une longueur de 4 à 20
              caractères
            </span>
          </div>

          <AuthButton text="Continuer" screen="null" isDisabled={isButtonDisabled} />
          <p
            onClick={handleClick}
            className="auth__message--privacy sub--label main-color"
            style={{ textAlign: "left", cursor: "pointer" }}
          >
            Sauter pour le moment
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterFifthScreen;
