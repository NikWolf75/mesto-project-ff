function showInputError(form, input, errorMessage) {
  const errorElement = form.querySelector(`.${input.name}-error`);
  input.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`.${input.name}-error`);
  input.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
}

function checkInputValidityProfile(form, input) {
  if (input.validity.valueMissing) {
    showInputError(form, input, "Вы пропустили это поле");
  } else if (input.name === "name" || input.name === "description") {
    if (input.value.length < 2) {
      showInputError(form, input, `Минимальное количество символов: 2. Сейчас: ${input.value.length}`);
    } else if (input.validity.patternMismatch) {
      showInputError(form, input, "Недопустимые символы. Разрешены только буквы, пробелы и дефисы.");
    } else {
      hideInputError(form, input);
    }
  } else {
    hideInputError(form, input);
  }
}

function checkInputValidityPlace(form, input) {
  const titlePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/;

  if (input.validity.valueMissing) {
    showInputError(form, input, "Пожалуйста, заполните это поле");
  } else if (input.name === "title") {
    if (!titlePattern.test(input.value)) {
      showInputError(form, input, "Допустимы буквы, пробелы и дефисы (2-30 символов)");
    } else {
      hideInputError(form, input);
    }
  } else if (input.type === "url" && input.validity.typeMismatch) {
    showInputError(form, input, "Введите корректный URL");
  } else {
    hideInputError(form, input);
  }
}

function toggleButtonState(inputs, button) {
  const isValid = inputs.every((input) => input.validity.valid);
  button.disabled = !isValid;
  button.classList.toggle("popup__button_disabled", !isValid);
}

function setEventListeners(form, checkValidityFn) {
  const inputs = Array.from(form.querySelectorAll(".popup__input"));
  const button = form.querySelector(".popup__button");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkValidityFn(form, input);
      toggleButtonState(inputs, button);
    });
  });

  toggleButtonState(inputs, button);
}

export function enableValidation({ formSelector }) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => evt.preventDefault());

    if (form.classList.contains("popup__form_type_edit")) {
      setEventListeners(form, checkInputValidityProfile);
    } else if (form.classList.contains("popup__form_type_add")) {
      setEventListeners(form, checkInputValidityPlace);
    } else {
      setEventListeners(form, checkInputValidityProfile);
    }
  });
}

export function resetValidation(form) {
  const inputs = Array.from(form.querySelectorAll(".popup__input"));
  const button = form.querySelector(".popup__button");

  inputs.forEach((input) => {
    hideInputError(form, input);
  });

  toggleButtonState(inputs, button);
}
