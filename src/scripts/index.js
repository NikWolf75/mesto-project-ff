// index.js
import "../pages/index.css";
import { createCard, deleteCard, toggleLike } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, resetValidation } from "./validation.js";
import { getUserInfo, getInitialCards } from "./api.js";
import logo from "../images/logo.svg";
import avatar from "../images/avatar.jpg";

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

function updateProfile(user) {
  profileName.textContent = user.name;
  profileAbout.textContent = user.about;
  profileAvatar.style.backgroundImage = `url(${user.avatar})`;
}

function renderCard(cardData, userId) {
  const cardElement = createCard(cardData, deleteCard, toggleLike, openImagePopup, userId);
  placesList.append(cardElement);
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    updateProfile(userData);
    cardsData.forEach(card => renderCard(card, userData._id));
  })
  .catch((err) => {
    console.error(err);
  });

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupEdit);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: titleInput.value,
    link: linkInput.value,
  };
  const cardElement = createCard(newCard, deleteCard, toggleLike, openImagePopup);
  placesList.prepend(cardElement);
  closePopup(popupAddCard);
  addCardForm.reset();
}

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
  formSelector: ".popup__form",
});
