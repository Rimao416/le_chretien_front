import React from "react";

function AuthButton({ icon, text, color,onClick }) {
  const handleClick=()=>{
    onClick();
  }
  return (
    <div>
      <button className="auth__button u-margin-bottom-medium" onClick={handleClick}>
        <span className={`auth__icon ${color ? `auth__icon--${color}` : ""}`}>
          <ion-icon name={icon}></ion-icon>
        </span>
        <span className="auth__text">{text}</span>
      </button>
    </div>
  );
}

export default AuthButton;
