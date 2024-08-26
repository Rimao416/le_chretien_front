import React, { useContext } from "react";
import { RegisterContext } from "../context/RegisterContext";
import { useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";

function AuthButton({ text, screen, isDisabled }) {
  const loading = useSelector((state) => state.authReducer.loading);
  const { setScreen } = useContext(RegisterContext);
  return (
    <button
      className={`AuthButton ${isDisabled ? "AuthButton--disabled" : ""}`}
      type="submit"
      // onClick={() => setScreen(screen)}
      disabled={isDisabled}
    >
      {loading ? (
        <Oval
  height={50}
  width={50}
  color="#ffffff"
  wrapperStyle={{}}
  wrapperClass=""
  ariaLabel='oval-loading'
  secondaryColor="#4fa94d"
  strokeWidth={4}
  strokeWidthSecondary={4}

/>
      ) : (
        text
      )}
    </button>
  );
}

export default AuthButton;
