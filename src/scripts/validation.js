function showInputError(form, input, errorMessage, config) {
  const errorElement = form.querySelector(`.${input.name}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(form, input, config) {
  const errorElement = form.querySelector(`.${input.name}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
    let errorMessage = input.validationMessage;

    if (input.validity.valueMissing && input.dataset.errorValueMissing) {
      errorMessage = input.dataset.errorValueMissing;
    } else if (input.validity.tooShort && input.dataset.errorTooShort) {
      errorMessage = input.dataset.errorTooShort.replace("{length}", input.value.length);
    } else if (input.validity.patternMismatch && input.dataset.errorPatternMismatch) {
      errorMessage = input.dataset.errorPatternMismatch;
    } else if (input.validity.typeMismatch && input.dataset.errorTypeMismatch) {
      errorMessage = input.dataset.errorTypeMismatch;
    }

    showInputError(form, input, errorMessage, config);
    return false;
  }

  hideInputError(form, input, config);
  return true;
}

function toggleButtonState(inputs, button, config) {
  const allValid = inputs.every((input) => input.validity.valid);
  button.disabled = !allValid;
  button.classList.toggle(config.inactiveButtonClass, !allValid);
}

function setFormValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });

  toggleButtonState(inputs, button, config);
}

export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => setFormValidation(form, config));
}

export function resetValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    hideInputError(form, input, config);
    input.value = "";
  });

  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
}
