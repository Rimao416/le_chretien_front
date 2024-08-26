function validateField(value, fieldName, minLength, maxLength) {
  const validationErrors = [];

  if (!value) {
    validationErrors.push({
      field: fieldName,
      message: `Veuillez entrer un ${fieldName}`,
    });
  } else {
    if (value.length < minLength) {
      validationErrors.push({
        field: fieldName,
        message: `Le ${fieldName} doit avoir au moins ${minLength} caractères`,
      });
    }

    if (value.length > maxLength) {
      validationErrors.push({
        field: fieldName,
        message: `Le ${fieldName} ne doit pas avoir plus de ${maxLength} caractères`,
      });
    }
    const specialCharactersRegex = /[^a-zA-Z0-9]/;
    if (specialCharactersRegex.test(value)) {
      validationErrors.push({
        field: fieldName,
        message: `Le ${fieldName} ne doit pas contenir de caractères spéciaux`,
      });
    }
  }

  return validationErrors;
}

module.exports = { validateField };
