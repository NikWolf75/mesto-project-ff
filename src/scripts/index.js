import "../pages/index.css";
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard } from "./api.js";
import { createCard, deleteCard, toggleLike } from "./card.js";
import {
  avatarForm,
  avatarInput,
  avatarSubmitButton,
  avatarImage,
  avatarPopup,
  openPopup,
  closePopup
} from "./modal.js";
import { enableValidation, resetValidation } from "./validation.js";
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

const popupImageElem = popupImage.querySelector(".popup__image");
const popupCaptionElem = popupImage.querySelector(".popup__caption");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const editProfileForm = document.querySelector(".popup__form_type_edit");

const addCardForm = document.querySelector(".popup__form_type_add");
const titleInput = addCardForm.querySelector(".popup__input_type_title");
const linkInput = addCardForm.querySelector(".popup__input_type_link");

logoElement.src = logo;
profileAvatar.style.backgroundImage = `url(${avatar})`;

let userId = null;

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
      const cardElement = createCard(card, deleteCard, toggleLike, openImagePopup, userId);
      placesList.append(cardElement);
    });
  })
  .catch(console.error);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  updateUserInfo({ name: nameInput.value, about: jobInput.value })
    .then((updatedUser) => {
      updateProfile(updatedUser);
      closePopup(popupEdit);
    })
    .catch(console.error);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  addNewCard({ name: titleInput.value, link: linkInput.value })
    .then((card) => {
      const cardElement = createCard(card, deleteCard, toggleLike, openImagePopup, userId);
      placesList.prepend(cardElement);
      closePopup(popupAddCard);
      addCardForm.reset();
      resetValidation(addCardForm);
    })
    .catch(console.error);
}

profileAvatar.addEventListener("click", () => {
  avatarInput.value = "";
  avatarSubmitButton.disabled = true;
  avatarSubmitButton.classList.add("popup__button_disabled");
  resetValidation(avatarForm);
  openPopup(avatarPopup);
});

function openImagePopup(evt) {
  popupImageElem.src = evt.target.src;
  popupImageElem.alt = evt.target.alt;

  const card = evt.target.closest(".card");
  const title = card.querySelector(".card__title").textContent;
  const description = card.querySelector(".card__text")?.textContent;

  popupCaptionElem.textContent = description ? `${title} - ${description}` : title;

  openPopup(popupImage);
}

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  resetValidation(editProfileForm);
  openPopup(popupEdit);
});

addButton.addEventListener("click", () => {
  resetValidation(addCardForm);
  openPopup(popupAddCard);
});

document.querySelectorAll(".popup__close").forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    const form = popup.querySelector("form");
    if (form) resetValidation(form);
    closePopup(popup);
  });
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target === popup) {
      const form = popup.querySelector("form");
      if (form) resetValidation(form);
      closePopup(popup);
    }
  });
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

enableValidation({
  formSelector: ".popup__form"
});
