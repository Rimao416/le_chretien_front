import React, { useState, useEffect, useContext } from "react";

import AuthButton from "../AuthButton";
import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
import { UserContext } from "../../context/UserContext";
// import {
//   verifyToken,
//   resendToken,
// } from "../../redux/actions/AuthAction";
import { RegisterContext } from "../../context/RegisterContext";
// import CountDown from "../CountDown";
import Message from "../alert/Message";
import {
  intializeAuth,
  resendToken,
  verifyToken,
} from "../../redux/slice/authSlice";

function maskEmail(email) {
  const atIndex = email.indexOf("@");
  const username = email.slice(0, atIndex);
  const maskedUsername = `${username[0]}${"*".repeat(
    username.length - 2
  )}${username.slice(-1)}`;
  const domain = email.slice(atIndex);

  return `${maskedUsername}${domain}`;
}

function RegisterThirdSreen() {
  const { setScreen } = useContext(RegisterContext);
  const { authData, message, status, permission } = useSelector(
    (state) => state.authReducer
  );
  console.log(authData);
  // const takeAuth = useSelector((state) => state);
  // console.log(takeAuth);
  console.log(message);
  const { user, setUser } = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    permission === "tokenVerificationSuccess" && setScreen("fourth_register");
  }, [permission, setScreen]);

  const [inputValues, setInputValues] = useState(["", "", "", "", "", ""]);
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Vérifie si la valeur est un nombre
      const newInputValues = [...inputValues];
      newInputValues[index] = value;
      setInputValues(newInputValues);
      console.log(inputValues);
    }
  };
  const isButtonDisabled = inputValues.some((value) => value.length !== 1);
  // const showMe = () => {
  //   console.log(inputValues);
  // };
  const handleSubmit = (event) => {
    event.preventDefault();

    const otp = inputValues.join("").toString();
    // console.log(otp);
    // setOtp(inputValues.join("").toString());

    const updatedUser = { ...user, otp }; // Créez une copie de l'état user et mettez à jour la propriété otp
    console.log(updatedUser);
    setUser(updatedUser); // Mettez à jour l'état user avec la copie mise à jour
    console.log(user);

    dispatch(verifyToken(updatedUser)); // Utilisez la copie mise à jour pour l'appel de l'action

    // useDispatch
    //     const otp = inputValues.join("").toString();
    //     console.log(otp);
    //     // const updatedUser={...user,otp}
    //     // updatedUser.otp=otp
    //     // clg
    //     // setUser(updatedUser)
    //     setUser((prevUser) => ({
    //       ...prevUser,
    //       otp: otp,
    //     }));
    // console.log(user)
    //     // console.log(user)
    //     dispatch(verifyToken(user))
  };
  const handleInitialise = () => {
    // event.preventDefault();
    setUser({
      ...user,
      email: "",
      password: "",
      day: "24",
      month: "Juin",
      year: "2000",
      otp: "",
      username: "",
      telephone: "",
    });
    dispatch(intializeAuth());
    setScreen("second_register");
  };
  return (
    <div className="auth__third">
      <form className="auth__form" onSubmit={handleSubmit}>
        <p className="auth__label label">
          Nous vous invitons cordialement à saisir le code qui vous a été envoyé
          dans le but de procéder à la vérification {maskEmail(authData.email)}
        </p>
        <div className="auth__code u-margin-top-medium">
          {inputValues.map((value, index) => (
            <input
              value={value}
              onChange={(e) => handleChange(e, index)}
              className={`auth__code--input ${
                value.length > 0 ? "has-value" : ""
              } ${
                message.find(
                  (error) =>
                    error.field === "OtpSend" ||
                    error.field === "otpResendError"
                )
                  ? "error"
                  : ""
              } ${status === "success" && "success"}`}
              type="text"
              name=""
              id=""
              maxLength={1}
              key={index}
            />
          ))}
        </div>

        {message.find((error) => error.field === "OtpSend") ? (
          <Message
            message={message.find((error) => error.field === "OtpSend").message}
            type="error"
          />
        ) : null}
        {message.find((error) => error.field === "otpResendError") ? (
          <Message
            message={
              message.find((error) => error.field === "otpResendError").message
            }
            type="error"
          />
        ) : null}
        {message.find((error) => error.field === "OtpSubmit") ? (
          <Message
            message={
              message.find((error) => error.field === "OtpSubmit").message
            }
            type="success"
          />
        ) : null}

        <p
          onClick={() => dispatch(resendToken(user))}
          className="auth__message--privacy sub--label"
          style={{ textAlign: "left", cursor: "pointer" }}
        >
          Renvoyez le code
        </p>

        <AuthButton text="Continuer" isDisabled={isButtonDisabled} />
        <p
          onClick={handleInitialise}
          className="auth__message--privacy sub--label main-color"
          style={{ textAlign: "left", cursor: "pointer" }}
        >
          Changer d'adresse
        </p>
      </form>
    </div>
  );
}

export default RegisterThirdSreen;
