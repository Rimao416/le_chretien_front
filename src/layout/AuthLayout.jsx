import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/dist";
import { RegisterContext, screens } from "../context/RegisterContext";
import RegisterScreenMain from "../components/AuthScreen/RegisterScreenMain";
import RegisterSecondScreeen from "../components/AuthScreen/RegisterSecondScreeen";
import RegisterThirdSreen from "../components/AuthScreen/RegisterThirdSreen";
import RegisterFourth from "../components/AuthScreen/RegisterFourthScreen";
import RegisterFifthScreen from "../components/AuthScreen/RegisterFifthScreen";
import { useSelector,useDispatch } from "react-redux";
import LoginScreenMain from "../components/AuthScreen/LoginScreenMain";
import LoginSecondScreen from "../components/AuthScreen/LoginSecondScreen";
import { UserContext, userInfo } from "../context/UserContext";
import { updatePermission } from "../redux/slice/authSlice";
// import { updatePermission } from "../redux/actions/AuthAction";
function AuthLayout({ title, children }) {
  const dispatch = useDispatch();
  const { permission } = useSelector(
    (state) => state.authReducer
  );
  const [user, setUser] = useState(userInfo);
  let actualLayout = null;
  if (title === "Inscription") {
    actualLayout = screens[0].screens;
  } else if (title === "Connexion") {
    actualLayout = screens[1].screens;
  }
 
  const [actualScreen, setActualScreen] = useState(actualLayout[0]);
  const firstScreen = ["main_register", "main_login"];

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    //    setUser({ ...user, [name]: value });
    setUser({
      ...user,
      [name]: value,
    });
  };

  function setScreen(value) {
    setActualScreen(value);
  }

  const location = useLocation();
  const isLoginPage = location.pathname === "/connexion";

  const alreadyMemberText = isLoginPage
    ? "Tu n'as pas de compte ?"
    : "Déjà membre ?";
  const alreadyMemberLinkText = isLoginPage ? "Inscris toi" : "Connectez-vous";
  const alreadyMemberLink = isLoginPage ? "/inscription" : "/connexion";

  // Configuration du Arrow

  const handleClick = () => {
    console.log(permission)
    // Ici la fonction de la permission, cette fonction est ultra mega, giga COOOL
    dispatch(updatePermission(permission));

    // Trouver la position de notre élément dans le tableau
    const currentIndex = actualLayout.indexOf(actualScreen);
    // Si l'index est supérieur à 0 alors on passe au précèdent
    console.log(actualLayout[currentIndex - 1]);
    if (currentIndex > 0) {
      setScreen(actualLayout[currentIndex - 1]);
    }

    // Ici la fonction de la permission, cette fonction est ultra mega, giga COOOL
  };

  return (
    <>
      <RegisterContext.Provider value={{ actualScreen, setScreen }}>
        <UserContext.Provider value={{ user, handleChange,setUser }}>
          <div className="auth">
            <div className="auth__container u-center-text">
              {!firstScreen.includes(actualScreen) && (
                <span
                  style={{ cursor: "pointer" }}
                  className="auth__arrow"
                  onClick={handleClick}
                ></span>
              )}

              <h2 className="auth__title">{title}</h2>
              <div className="auth__group u-margin-top-big">
                {actualScreen === "main_register" && <RegisterScreenMain />}
                {actualScreen === "second_register" && (
                  <RegisterSecondScreeen />
                )}
                {actualScreen === "third_register" && <RegisterThirdSreen />}
                {actualScreen === "fourth_register" && <RegisterFourth />}
                {actualScreen === "fifth_register" && <RegisterFifthScreen />}
                {actualScreen === "main_login" && <LoginScreenMain />}
                {actualScreen === "second_login" && <LoginSecondScreen />}
              </div>
              <div className="auth__message">
                <p className="auth__privacy">
                  En continuant, vous acceptez &nbsp;
                  <Link className="auth__privacy-link" to="/">
                    les Conditions d’utilisation
                  </Link>
                  de Iic no et reconnaissez avoir lu notre Politique de
                  confidentialité.
                  <Link className="auth__privacy-link" to="/">
                    <br />
                    Informations concernant la collecte de données
                  </Link>
                </p>
                <br />
                <p className="auth__already-member">
                  {alreadyMemberText}&nbsp;
                  <Link
                    className="auth__already-member-link"
                    to={alreadyMemberLink}
                  >
                    {alreadyMemberLinkText}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </UserContext.Provider>
      </RegisterContext.Provider>
    </>
  );
}

export default AuthLayout;
