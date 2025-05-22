function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
}

function checkInputValidityProfile(form, input, validationConfig) {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

  if (!input.value) {
    showInputError(form, input, "Вы пропустили это поле.", validationConfig);
    return false;
  }

  if (input.name === "name") {
    if (input.value.length < 2 || input.value.length > 40) {
      showInputError(
        form,
        input,
        `Минимальное количество символов: 2. Длина текста сейчас: ${
          input.value.length
        } ${input.value.length === 1 ? "символ" : "символов"}.`,
        validationConfig
      );
      return false;
    }
    if (!regex.test(input.value)) {
      showInputError(form, input, "Допустимы только буквы, пробелы и дефисы", validationConfig);
      return false;
    }
  }

  if (input.name === "description") {
    if (input.value.length < 2 || input.value.length > 200) {
      showInputError(
        form,
        input,
        `Минимальное количество символов: 2. Длина текста сейчас: ${
          input.value.length
        } ${input.value.length === 1 ? "символ" : "символов"}.`,
        validationConfig
      );
      return false;
    }
    if (!regex.test(input.value)) {
      showInputError(form, input, "Допустимы только буквы, пробелы и дефисы", validationConfig);
      return false;
    }
  }

  hideInputError(form, input, validationConfig);
  return true;
}

function checkInputValidityAddCard(form, input, validationConfig) {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

  if (!input.value) {
    showInputError(form, input, "Вы пропустили это поле.", validationConfig);
    return false;
  }

  if (input.name === "title") {
    if (input.value.length > 30) {
      showInputError(
        form,
        input,
        `Максимальное количество символов: 30. Длина текста сейчас: ${
          input.value.length
        } ${input.value.length === 1 ? "символ" : "символов"}.`,
        validationConfig
      );
      return false;
    }
    if (!regex.test(input.value)) {
      showInputError(form, input, "Допустимы только буквы, пробелы и дефисы", validationConfig);
      return false;
    }
  }

  if (input.name === "link") {
    try {
      new URL(input.value);
    } catch {
      showInputError(form, input, "Введите адрес сайта.", validationConfig);
      return false;
    }
  }

  hideInputError(form, input, validationConfig);
  return true;
}

function checkInputValidityAvatar(form, input, validationConfig) {
  if (!input.value) {
    showInputError(form, input, "Вы пропустили это поле.", validationConfig);
    return false;
  }

  try {
    new URL(input.value);
  } catch {
    showInputError(form, input, "Введите адрес сайта.", validationConfig);
    return false;
  }

  hideInputError(form, input, validationConfig);
  return true;
}

function toggleButtonState(inputs, button, validityCheck, validationConfig) {
  const allValid = inputs.every(
    (input) =>
      input.validity.valid && validityCheck(input.closest("form"), input, validationConfig)
  );
  button.disabled = !allValid;
  button.classList.toggle(validationConfig.inactiveButtonClass, !allValid);
}

function setFormValidation(form, checkValidityFn, validationConfig) {
  const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const button = form.querySelector(validationConfig.submitButtonSelector);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkValidityFn(form, input, validationConfig);
      toggleButtonState(inputs, button, checkValidityFn, validationConfig);
    });
  });

  toggleButtonState(inputs, button, checkValidityFn, validationConfig);
}

export function enableValidation(validationConfig) {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
  forms.forEach((form) => {
    if (form.classList.contains("popup__form_type_edit")) {
      setFormValidation(form, checkInputValidityProfile, validationConfig);
    }
    if (form.classList.contains("popup__form_type_add")) {
      setFormValidation(form, checkInputValidityAddCard, validationConfig);
    }
    if (form.name === "avatar") {
      setFormValidation(form, checkInputValidityAvatar, validationConfig);
    }
  });
}

export function resetValidation(form, validationConfig) {
  const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  inputs.forEach((input) => {
    hideInputError(form, input, validationConfig);
    input.value = "";
  });
  const button = form.querySelector(validationConfig.submitButtonSelector);
  button.disabled = true;
  button.classList.add(validationConfig.inactiveButtonClass);
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

export { validationConfig };
