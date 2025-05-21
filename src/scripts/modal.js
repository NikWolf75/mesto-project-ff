export const avatarForm = document.querySelector("form[name='avatar']");
export const avatarInput = avatarForm.querySelector(".popup__input_type_avatar");
export const avatarSubmitButton = avatarForm.querySelector(".popup__button");
export const avatarImage = document.querySelector(".profile__image");
export const avatarPopup = document.querySelector(".popup_type_avatar");

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    if (openPopup) {
      const form = openPopup.querySelector("form");
      if (form) form.reset();
      closePopup(openPopup);
    }
  }
}

export function closeAvatarPopup() {
  closePopup(avatarPopup);
}