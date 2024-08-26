import React, { useState, useEffect, useContext } from "react";
import AuthButton from "../AuthButton";
import { RegisterContext } from "../../context/RegisterContext";
import { UserContext } from "../../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { verifyPassword } from "../../redux/slice/authSlice";
// import { verifyPassword } from "../../redux/actions/AuthAction";

// function VerificationItem({ text }) {
//   return (
//     <div className="auth__verification--wrapper">
//       <span className="auth__verification--icon">
//         <ion-icon name="checkmark-outline"></ion-icon>
//       </span>
//       <span className="auth__verification--text">
//         {text}
//       </span>
//     </div>
//   );
// }
function RegisterFourth() {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { setScreen } = useContext(RegisterContext);
  const { user, setUser } = useContext(UserContext);
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);
  console.log(user)
  const { errorType, status, permission } = useSelector(
    (state) => state.authReducer
  );

  useEffect(() => {
    permission === "passwordVerificationSuccess" && setScreen("fifth_register");
  }, [permission, setScreen]);
  console.log(status);
  const handleChange = (event) => {
    const {value}=event.currentTarget
    console.log(value)
    // dispatch(verifyPassword)
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*_-])");
    const length = new RegExp("(?=.{8,})");
    if (lower.test(value)) {
      setLowerValidated(true);
    } else {
      setLowerValidated(false);
    }
    if (upper.test(value)) {
      setUpperValidated(true);
    } else {
      setUpperValidated(false);
    }
    if (number.test(value)) {
      setNumberValidated(true);
    } else {
      setNumberValidated(false);
    }
    if (special.test(value)) {
      setSpecialValidated(true);
    } else {
      setSpecialValidated(false);
    }
    if (length.test(value)) {
      setLengthValidated(true);
    } else {
      setLengthValidated(false);
    }
    setPassword(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = { ...user,password};
    // console.log(updatedUser)
    console.log(updatedUser)
    setUser(updatedUser)
    dispatch(verifyPassword(updatedUser))
    // console.log(pa)
    // console.log(updatedUser)
  };
  const isValidPassword =
    lowerValidated &&
    upperValidated &&
    numberValidated &&
    specialValidated &&
    lengthValidated;
  console.log(isValidPassword);

  const [type, setType] = useState("password");
  return (
    <div className="auth__fourth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <p className="auth__label">
          Nous vous encourageons chaleureusement à définir un mot de passe pour
          votre compte. Il est crucial de choisir un mot de passe solide qui
          assure la sécurité de votre compte.
        </p>
        <div
          className="auth__password u-margin-top-medium"
          style={{ textAlign: "left" }}
        >
          <label htmlFor="" className="auth__password--label">
            Mot de passe
          </label>
          <div className="auth__password--wrapper u-margin-top-small">
            <input
              type={type}
              name="password"
              className={`auth__password--input ${
                errorType === "passwordTypeError" && "error"
              }`}
              onChange={handleChange}
            />
            <span
              className="auth__password--check"
              onClick={() => setType(type === "password" ? "text" : "password")}
            >
              {type === "password" ? (
                <ion-icon name="eye-off-outline"></ion-icon>
              ) : (
                <ion-icon name="eye-outline"></ion-icon>
              )}
            </span>
          </div>
        </div>
        <div className="auth__verification u-margin-top-small">
          <div
            className={`auth__verification--wrapper ${
              lowerValidated && "auth__verification--wrapper--verified"
            }`}
          >
            <span className="auth__verification--icon">
              <ion-icon name="checkmark-outline"></ion-icon>
            </span>
            <span className="auth__verification--text">
              Avoir au moins une lettre miniscule
            </span>
          </div>
          <div
            className={`auth__verification--wrapper ${
              upperValidated && "auth__verification--wrapper--verified"
            }`}
          >
            <span className="auth__verification--icon">
              <ion-icon name="checkmark-outline"></ion-icon>
            </span>
            <span className="auth__verification--text">
              Avoir au moins une lettre majuscule
            </span>
          </div>
          <div
            className={`auth__verification--wrapper ${
              numberValidated && "auth__verification--wrapper--verified"
            }`}
          >
            <span className="auth__verification--icon">
              <ion-icon name="checkmark-outline"></ion-icon>
            </span>
            <span className="auth__verification--text">
              Avoir au moins un nombre
            </span>
          </div>
          <div
            className={`auth__verification--wrapper ${
              specialValidated && "auth__verification--wrapper--verified"
            }`}
          >
            <span className="auth__verification--icon">
              <ion-icon name="checkmark-outline"></ion-icon>
            </span>
            <span className="auth__verification--text">
              Avoir au moins un caractère spécial
            </span>
          </div>
          <div
            className={`auth__verification--wrapper ${
              lengthValidated && "auth__verification--wrapper--verified"
            }`}
          >
            <span className="auth__verification--icon">
              <ion-icon name="checkmark-outline"></ion-icon>
            </span>
            <span className="auth__verification--text">
              Avoir au moins 8 caractères
            </span>
          </div>
        </div>

        <AuthButton text="Continuer" isDisabled={!isValidPassword} />
      </form>
    </div>
  );
}

export default RegisterFourth;
