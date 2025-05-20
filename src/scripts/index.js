import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, toggleLike } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import logo from "../images/logo.svg";
import avatar from "../images/avatar.jpg";
import { enableValidation, resetValidation } from './validation.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const popupAddCard = document.querySelector(".popup_type_add");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const editProfileForm = popupEdit.querySelector(".popup__form_type_edit");
const addCardForm = popupAddCard.querySelector(".popup__form_type_add");

const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_description");

const titleInput = addCardForm.querySelector(".popup__input_type_title");
const linkInput = addCardForm.querySelector(".popup__input_type_link");

const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");
const placesList = document.querySelector(".places__list");
const profileAvatar = document.querySelector(".profile__image");
const logoElement = document.querySelector(".header__logo");

profileAvatar.style.backgroundImage = `url(${avatar})`;
logoElement.src = logo;

enableValidation(validationConfig);

function openImagePopup(name, link) {
  const popupImageImg = popupImage.querySelector(".popup__image");
  const popupImageCaption = popupImage.querySelector(".popup__caption");
  popupImageImg.src = link;
  popupImageImg.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, toggleLike, openImagePopup);
  placesList.append(cardElement);
});

editButton.addEventListener("click", () => {
  resetValidation(editProfileForm);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(popupEdit);
});

addButton.addEventListener("click", () => {
  addCardForm.reset();
  resetValidation(addCardForm);
  openPopup(popupAddCard);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupEdit);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const title = evt.target.querySelector('input[name="title"]').value;
  const link = evt.target.querySelector('input[name="link"]').value;

  const cardData = { name: title, link: link };
  const cardElement = createCard(cardData, deleteCard, toggleLike, openImagePopup);

  placesList.prepend(cardElement);

  closePopup(popupAddCard);

  evt.target.reset();
  resetValidation(evt.target);
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
