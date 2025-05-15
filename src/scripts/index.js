import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, toggleLike } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import logo from "../images/logo.svg";
import avatar from "../images/avatar.jpg";

const profileAvatar = document.querySelector(".profile__image");
const logoElement = document.querySelector(".header__logo");
const placesList = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const popupAddCard = document.querySelector(".popup_type_add");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const editProfileForm = document.querySelector(".popup__form_type_edit");

const addCardForm = document.querySelector(".popup__form_type_add");

const titleInput = addCardForm.querySelector(".popup__input_type_title");
const linkInput = addCardForm.querySelector(".popup__input_type_link");


profileAvatar.style.backgroundImage = `url(${avatar})`;
logoElement.src = logo;

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

  const cardElement = createCard(
    newCard,
    deleteCard,
    toggleLike,
    openImagePopup
  );
  placesList.prepend(cardElement);
  closePopup(popupAddCard);
  addCardForm.reset();
}

function openImagePopup(evt) {
  const popupImage = popupImageElem();
  const popupCaption = popupCaptionElem();
  const popup = popupImage.closest(".popup_type_image");

  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;

  const card = evt.target.closest(".card");
  const title = card.querySelector(".card__title").textContent;
  const description = card.querySelector(".card__text")?.textContent;

  popupCaption.textContent = description ? `${title} - ${description}` : title;

  openPopup(popup);
}

function popupImageElem() {
  return document.querySelector(".popup__image");
}

function popupCaptionElem() {
  return document.querySelector(".popup__caption");
}

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(popupEdit);
});

addButton.addEventListener("click", () => openPopup(popupAddCard));

document.querySelectorAll(".popup__close").forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target === popup) closePopup(popup);
  });
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard, toggleLike, openImagePopup);
  placesList.append(cardElement);
});
