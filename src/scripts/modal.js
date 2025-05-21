import { updateAvatar } from "./api.js";

export const avatarPopup = document.querySelector(".popup_type_avatar");
export const avatarForm = avatarPopup.querySelector(".popup__form");
export const avatarInput = avatarForm.querySelector(
  ".popup__input_type_avatar"
);
export const avatarSubmitButton = avatarForm.querySelector(".popup__button");
export const avatarImage = document.querySelector(".profile__image");

export const confirmPopup = document.querySelector(".popup_type_confirm");
export const confirmButton = confirmPopup.querySelector(".popup__button");

let confirmAction = null;

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
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) closePopup(openedPopup);
  }
}

export function openConfirmPopup(action) {
  confirmAction = action;
  openPopup(confirmPopup);
}

confirmButton.addEventListener("click", () => {
  if (typeof confirmAction === "function") {
    confirmAction();
  }
  closePopup(confirmPopup);
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const url = avatarInput.value;
  avatarSubmitButton.textContent = "Сохранение...";
  updateAvatar({ avatar: url })
    .then((user) => {
      avatarImage.style.backgroundImage = `url(${user.avatar})`;
      closePopup(avatarPopup);
      avatarForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      avatarSubmitButton.textContent = "Сохранить";
    });
});
