function showInputError(form, input, message) {
  const errorElement = form.querySelector(`.${input.name}-error, .popup__error_type_${input.name}`);
  if (!errorElement) return;
  input.classList.add("popup__input_type_error");
  errorElement.textContent = message;
  errorElement.classList.add("popup__input-error_visible");
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`.${input.name}-error, .popup__error_type_${input.name}`);
  if (!errorElement) return;
  input.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_visible");
}

function checkInputValidityProfile(form, input) {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

  if (!input.value) {
    showInputError(form, input, "Вы пропустили это поле.");
    return false;
  }

  if (input.name === "name") {
    if (input.value.length < 2 || input.value.length > 40) {
      showInputError(
        form,
        input,
        `Минимальное количество символов: 2. Длина текста сейчас: ${input.value.length} ${
          input.value.length === 1 ? "символ" : "символов"
        }.`
      );
      return false;
    }
    if (!regex.test(input.value)) {
      showInputError(form, input, "Допустимы только буквы, пробелы и дефисы");
      return false;
    }
  }

  if (input.name === "description") {
    if (input.value.length < 2 || input.value.length > 200) {
      showInputError(
        form,
        input,
        `Минимальное количество символов: 2. Длина текста сейчас: ${input.value.length} ${
          input.value.length === 1 ? "символ" : "символов"
        }.`
      );
      return false;
    }
    if (!regex.test(input.value)) {
      showInputError(form, input, "Допустимы только буквы, пробелы и дефисы");
      return false;
    }
  }

  hideInputError(form, input);
  return true;
}

function checkInputValidityAddCard(form, input) {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

  if (!input.value) {
    showInputError(form, input, "Вы пропустили это поле.");
    return false;
  }

  if (input.name === "title") {
    if (input.value.length > 30) {
      showInputError(
        form,
        input,
        `Максимальное количество символов: 30. Длина текста сейчас: ${input.value.length} ${
          input.value.length === 1 ? "символ" : "символов"
        }.`
      );
      return false;
    }
    if (!regex.test(input.value)) {
      showInputError(form, input, "Допустимы только буквы, пробелы и дефисы");
      return false;
    }
  }

  if (input.name === "link") {
    try {
      new URL(input.value);
    } catch {
      showInputError(form, input, "Введите адрес сайта.");
      return false;
    }
  }

  hideInputError(form, input);
  return true;
}

function checkInputValidityAvatar(form, input) {
  if (!input.value) {
    showInputError(form, input, "Вы пропустили это поле.");
    return false;
  }

  try {
    new URL(input.value);
  } catch {
    showInputError(form, input, "Введите адрес сайта.");
    return false;
  }

  hideInputError(form, input);
  return true;
}

function toggleButtonState(inputs, button, validityCheck) {
  const allValid = inputs.every(
    (input) => input.validity.valid && validityCheck(input.closest("form"), input)
  );
  button.disabled = !allValid;
  button.classList.toggle("popup__button_disabled", !allValid);
}

function setFormValidation(form, checkValidityFn) {
  const inputs = Array.from(form.querySelectorAll(".popup__input"));
  const button = form.querySelector(".popup__button");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkValidityFn(form, input);
      toggleButtonState(inputs, button, checkValidityFn);
    });
  });

  toggleButtonState(inputs, button, checkValidityFn);
}

export function enableValidation({ formSelector }) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    if (form.classList.contains("popup__form_type_edit")) {
      setFormValidation(form, checkInputValidityProfile);
    }
    if (form.classList.contains("popup__form_type_add")) {
      setFormValidation(form, checkInputValidityAddCard);
    }
    if (form.name === "avatar") {
      setFormValidation(form, checkInputValidityAvatar);
    }
  });
}

export function resetValidation(form) {
  const inputs = Array.from(form.querySelectorAll(".popup__input"));
  inputs.forEach((input) => {
    hideInputError(form, input);
    input.value = "";
  });
  const button = form.querySelector(".popup__button");
  button.disabled = true;
  button.classList.add("popup__button_disabled");
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export { validationConfig };
