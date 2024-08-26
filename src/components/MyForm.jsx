import React, { useState, useEffect } from "react";

function MyForm({ fieldName, label, value, handleChange, errorField }) {
  const [showError, setShowError] = useState(false);
  const [errorBorder, setErrorBorder] = useState(false);

  useEffect(() => {
    if (errorField) {
      // Afficher le message d'erreur et la bordure rouge pendant 5 secondes
      setShowError(true);
      setErrorBorder(true);

      const timer = setTimeout(() => {
        setShowError(false);
        setErrorBorder(false);
      }, 5000);

      // Nettoyer le timer lorsqu'un nouveau message d'erreur arrive ou le composant se démonte
      return () => clearTimeout(timer);
    }
  }, [errorField]);
  return (
    <div className="auth__contact u-margin-top-medium">
      <div className="auth__contact__flex-container">
        <label
          htmlFor={fieldName}
          name={fieldName}
          className="auth__label auth__label--left"
        >
          {label}
        </label>
      </div>

      <input
        type="text"
        id={fieldName}
        name={fieldName}
        onChange={handleChange}
        value={value}
        placeholder={`Entrez votre ${label.toLowerCase()}`}
        className={`auth__input u-margin-top-small auth__input--contact ${
          errorBorder && "error"
        }`}
        maxLength={20}
      />

      {showError && (
        <p className="auth__message--error error-message">
          {errorField.message}
        </p>
      )}
    </div>
  );
}

export default MyForm;
