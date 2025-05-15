import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard } from "./card.js";
import {
  openPopup,
  closePopup,
  handleEscClose,
  handleLike,
  handleImageClick,
} from "./modal.js";
import logo from "../images/logo.svg";
import avatar from "../images/avatar.jpg";

const profileAvatar = document.querySelector(".profile__image");
profileAvatar.style.backgroundImage = `url(${avatar})`;

const logoElement = document.querySelector(".header__logo");
logoElement.src = logo;

const placesList = document.querySelector(".places__list");
initialCards.forEach((card) => {
  const cardElement = createCard(
    card,
    deleteCard,
    handleLike,
    handleImageClick
  );
  placesList.append(cardElement);
});

const popupEdit = document.querySelector(".popup_type_edit");
const popupImagePopup = document.querySelector(".popup_type_image");
const popupAvatarEdit = document.querySelector(".popup_type_avatar-edit");
const popupAddCard = document.querySelector(".popup_type_add");

const closeButtons = document.querySelectorAll(".popup__close");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__image");

editButton.addEventListener("click", () => openPopup(popupEdit));
addButton.addEventListener("click", () => openPopup(popupAddCard));
avatarEditButton.addEventListener("click", () => openPopup(popupAvatarEdit));

closeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const popup = e.target.closest(".popup");
    closePopup(popup);
  });
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  });
});

const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const editProfileForm = document.querySelector(".popup__form_type_edit");

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(popupEdit);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupEdit);
}

editProfileForm.addEventListener("submit", handleFormSubmit);

const addCardForm = document.querySelector(".popup__form_type_add");

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const titleInput = document.querySelector(".popup__input_type_title");
  const linkInput = document.querySelector(".popup__input_type_link");

  if (!titleInput.value || !linkInput.value) {
    return;
  }

  const newCard = {
    name: titleInput.value,
    link: linkInput.value,
  };

  const cardElement = createCard(
    newCard,
    deleteCard,
    handleLike,
    handleImageClick
  );
  placesList.prepend(cardElement);

  closePopup(popupAddCard);
  addCardForm.reset();
});

const avatarForm = document.querySelector('.popup__form[name="avatar-edit"]');

avatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const avatarInput = avatarForm.querySelector('input[name="avatar"]');
  const newAvatarUrl = avatarInput.value;

  if (!newAvatarUrl) return;

  profileAvatar.style.backgroundImage = `url(${newAvatarUrl})`;

  closePopup(popupAvatarEdit);
  avatarForm.reset();
});
