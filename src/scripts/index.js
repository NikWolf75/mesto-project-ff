import "../pages/index.css";
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, updateAvatar, deleteCardFromServer } from "./api.js";
import { createCard, toggleLike } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, resetValidation } from './validation.js';
import logo from "../images/logo.svg";
import avatar from "../images/avatar.jpg";
import "../blocks/popup/__image/popup__image.css";

const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const logoElement = document.querySelector(".header__logo");
const placesList = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const popupAddCard = document.querySelector(".popup_type_add");
const popupAvatar = document.querySelector(".popup_type_avatar");
const confirmPopup = document.querySelector(".popup_type_confirm");

const popupImageElem = popupImage.querySelector(".popup__image");
const popupCaptionElem = popupImage.querySelector(".popup__caption");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileAvatarEditButton = document.querySelector(".profile__avatar-edit");

const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_description");
const editProfileForm = popupEdit.querySelector(".popup__form");

const addCardForm = popupAddCard.querySelector(".popup__form");
const titleInput = addCardForm.querySelector(".popup__input_type_title");
const linkInput = addCardForm.querySelector(".popup__input_type_link");

const avatarForm = popupAvatar.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector(".popup__input");
const avatarSubmitButton = avatarForm.querySelector(".popup__button");

const confirmButton = confirmPopup.querySelector(".popup__button");

logoElement.src = logo;
profileAvatar.style.backgroundImage = `url(${avatar})`;

let userId = null;
let deleteCardCallback = null;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function updateProfile(user) {
  profileName.textContent = user.name;
  profileAbout.textContent = user.about;
  profileAvatar.style.backgroundImage = `url(${user.avatar})`;
  userId = user._id;
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    updateProfile(userData);
    cards.forEach((card) => {
      const cardElement = createCard(
        card,
        (cardId, cardEl) => handleDeleteCard(cardId, cardEl),
        toggleLike,
        openImagePopup,
        userId
      );
      placesList.append(cardElement);
    });
  })
  .catch(console.error);

function toggleButtonLoadingState(button, isLoading, originalText) {
  if (isLoading) {
    button.textContent = "Сохранение...";
    button.disabled = true;
    button.classList.add("popup__button_disabled");
  } else {
    button.textContent = originalText;
    button.disabled = false;
    button.classList.remove("popup__button_disabled");
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const button = editProfileForm.querySelector(".popup__button");
  const originalText = button.textContent;

  toggleButtonLoadingState(button, true, originalText);

  updateUserInfo({ name: nameInput.value, about: jobInput.value })
    .then((updatedUser) => {
      updateProfile(updatedUser);
      closePopup(popupEdit);
    })
    .catch(console.error)
    .finally(() => {
      toggleButtonLoadingState(button, false, originalText);
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const button = addCardForm.querySelector(".popup__button");
  const originalText = button.textContent;

  toggleButtonLoadingState(button, true, originalText);

  addNewCard({ name: titleInput.value, link: linkInput.value })
    .then((card) => {
      const cardElement = createCard(
        card,
        (cardId, cardEl) => handleDeleteCard(cardId, cardEl),
        toggleLike,
        openImagePopup,
        userId
      );
      placesList.prepend(cardElement);
      closePopup(popupAddCard);
      addCardForm.reset();
      resetValidation(addCardForm, validationConfig);
    })
    .catch(console.error)
    .finally(() => {
      toggleButtonLoadingState(button, false, originalText);
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const button = avatarForm.querySelector(".popup__button");
  const originalText = button.textContent;

  toggleButtonLoadingState(button, true, originalText);

  updateAvatar(avatarInput.value)
    .then((updatedUser) => {
      updateProfile(updatedUser);
      closePopup(popupAvatar);
      avatarForm.reset();
      resetValidation(avatarForm, validationConfig);
    })
    .catch(console.error)
    .finally(() => {
      toggleButtonLoadingState(button, false, originalText);
    });
}

function openImagePopup(evt) {
  popupImageElem.src = evt.target.src;
  popupImageElem.alt = evt.target.alt;

  const card = evt.target.closest(".card");
  const title = card.querySelector(".card__title").textContent;
  const description = card.querySelector(".card__text")?.textContent;

  popupCaptionElem.textContent = description
    ? `${title} - ${description}`
    : title;

  openPopup(popupImage);
}

function handleDeleteCard(cardId, cardElement) {
  deleteCardCallback = () =>
    deleteCardFromServer(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch(console.error);

  confirmButton.textContent = "Да";
  confirmButton.disabled = false;
  confirmButton.classList.remove("popup__button_disabled");

  openPopup(confirmPopup);
}

editButton.addEventListener("click", () => {
  resetValidation(editProfileForm, validationConfig);
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileAbout.textContent.trim();
  openPopup(popupEdit);
});

addButton.addEventListener("click", () => {
  resetValidation(addCardForm, validationConfig);
  openPopup(popupAddCard);
});

profileAvatar.addEventListener("click", () => {
  avatarInput.value = "";
  avatarSubmitButton.disabled = true;
  avatarSubmitButton.classList.add("popup__button_disabled");
  resetValidation(avatarForm, validationConfig);
  openPopup(popupAvatar);
});

avatarForm.addEventListener("submit", handleAvatarFormSubmit);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

confirmPopup.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const button = confirmButton;
  const originalText = button.textContent;
  toggleButtonLoadingState(button, true, originalText);
  if (deleteCardCallback) {
    deleteCardCallback().finally(() => {
      toggleButtonLoadingState(button, false, originalText);
      closePopup(confirmPopup);
    });
  }
});

document.querySelectorAll(".popup__close").forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    const form = popup.querySelector("form");
    if (form) resetValidation(form, validationConfig);
    closePopup(popup);
  });
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      const form = popup.querySelector("form");
      if (form) resetValidation(form, validationConfig);
      closePopup(popup);
    }
  });
});

enableValidation(validationConfig);