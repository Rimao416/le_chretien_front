import React, {  useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AuthButton from "../AuthButton";

function LoginSecondScreen() {
  const [isMailRegistration, setIsMailRegistration] = useState(true);
  const [ph, setPh] = useState("");

  const handleRegistrationTypeChange = () => {
    setIsMailRegistration(!isMailRegistration);
  };
  return (
    <div className="auth__second" style={{ textAlign: "left" }}>
      <div className="auth__contact u-margin-top-medium">
        <div className="auth__contact__flex-container">
          <label
            htmlFor="email"
            className={`auth__label ${
              isMailRegistration ? "auth__label--left" : "auth__label--right"
            }`}
          >
            {isMailRegistration ? "E-mail" : "Téléphone"}
          </label>
          <label
            htmlFor="phone"
            onClick={handleRegistrationTypeChange}
            style={{ cursor: "pointer" }}
            className={`auth__label label ${
              isMailRegistration ? "auth__label--right" : "auth__label--left"
            }`}
          >
            {isMailRegistration
              ? "Connexion par téléphone"
              : "Connexion par mail/nom d'utilisateur"}
          </label>
        </div>
        {isMailRegistration ? (
          <input
            type="email"
            id="email"
            placeholder="Adresse e-mail / Nom d'utilisateur"
            className="auth__input u-margin-top-medium auth__input--contact"
          />
        ) : (
          <PhoneInput country={"fr"} value={ph} onChange={setPh} />
        )}
      </div>
      <AuthButton text="Connexion" screen="null" />
    </div>
  );
}

export default LoginSecondScreen;
