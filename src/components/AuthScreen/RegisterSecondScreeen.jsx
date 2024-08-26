import React, { useContext, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import AuthButton from "../AuthButton";
import { UserContext } from "../../context/UserContext";
// import { verifyEmail } from "../../redux/actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { RegisterContext } from "../../context/RegisterContext";
import { validationError, verifyEmail } from "../../redux/slice/authSlice";
import MyForm from "../MyForm";
import { validateField } from "../../utils/function";

function RegisterSecondScreeen() {
  // const [authorize, setAuthorize] = useState(false);
  const { setScreen } = useContext(RegisterContext);
  // const [errors, setErrors] = useState([]);

  const { user, handleChange } = useContext(UserContext);
  console.log(user);
  const { status, message, permission } = useSelector(
    (state) => state.authReducer
  );
  console.log(message);
  useEffect(() => {
    if (permission === "emailSuccess") {
      setScreen("third_register");
    }
  }, [status, setScreen, permission]);
  const dispatch = useDispatch();

  // const regex = /\d+/; // Expression régulière pour trouver un ou plusieurs chiffres

  console.log(user);
  const isButtonDisabled =
    user.email.length === 0 ||
    user.firstName.length === 0 ||
    user.lastName.length === 0;
  // console.log(isButtonDisabled);

  // const [isMailRegistration, setIsMailRegistration] = useState(true);
  // const [ph, setPh] = useState("");

  // const handleRegistrationTypeChange = () => {
  //   setIsMailRegistration(!isMailRegistration);
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Tout doit se faire ici");
    let validationErrors = [];
    const firstNameErrors = validateField(user.firstName, "Nom", 2, 30);
    const lastNameErrors = validateField(user.lastName, "Prenom", 2, 30);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = [];
    // Vérifier si l'e-mail est vide ou ne correspond pas au format attendu
    (!user.email || !emailRegex.test(user.email)) &&
      emailError.push({
        field: "Email",
        message: `Veuillez entrer un email valide`,
      });

    validationErrors = [...firstNameErrors, ...lastNameErrors, ...emailError];
    if (validationErrors.length > 0) {
      // console.log("Oui")
      dispatch(validationError(validationErrors));

      return;
    }

    // console.log("Tout doit se faire ici");
    // if(!user.email)

    dispatch(verifyEmail(user));
  };

  return (
    <div className="auth__second" style={{ textAlign: "left" }}>
      <form className="auth__form" onSubmit={handleSubmit}>
        <MyForm
          fieldName="firstName"
          label="Nom"
          value={user.firstName}
          handleChange={handleChange}
          errorField={message.find((error) => error.field === "Nom")}
        />
        <MyForm
          fieldName="lastName"
          label="Prenom"
          value={user.lastName}
          handleChange={handleChange}
          errorField={message.find((error) => error.field === "Prenom")}
        />

        <MyForm
          fieldName="email"
          label="E-mail"
          value={user.email}
          handleChange={handleChange}
          errorField={message.find((error) => error.field === "Email")}
        />

        <AuthButton
          text="Obtenir le Code"
          screen="third_register"
          isDisabled={isButtonDisabled}
        />
      </form>
    </div>
  );
}

export default RegisterSecondScreeen;
