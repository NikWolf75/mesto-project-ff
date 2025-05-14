import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard } from "./card.js";
import { handleLike, handleImageClick } from "./handlers.js";
import logo from "../images/logo.svg";
import avatar from "../images/avatar.jpg";

// Загрузка логотипа
const img = document.createElement("img");
img.src = logo;
img.alt = "Логотип проекта место";
img.classList.add("logo", "header__logo");
document.body.appendChild(img);

// Обновление аватара
const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${avatar})`;

// Обновление логотипа в header
const logoImg = document.querySelector(".header__logo");
logoImg.src = logo;

// Вывод карточек
const placesList = document.querySelector(".places__list");
initialCards.forEach((card) => {
  const cardElement = createCard(
    card,
    deleteCard,
    handleLike,
    handleImageClick
  ); // передаем обработчик лайка
  placesList.append(cardElement);
});

// Получаем все попапы
const popupEdit = document.querySelector(".popup_type_edit");
const popupImagePopup = document.querySelector(".popup_type_image");
const popupAvatarEdit = document.querySelector(".popup_type_avatar-edit");
const popupAddCard = document.querySelector(".popup_type_add");

// Получаем все кнопки закрытия попапов
const closeButtons = document.querySelectorAll(".popup__close");

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose); // добавляем слушатель
}

// Переименовали переменные для изображения и подписи
const imagePopupElement = popupImagePopup.querySelector(".popup__image");
const popupCaption = popupImagePopup.querySelector(".popup__caption");

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose); // удаляем слушатель
}

// Открываем попапы при клике на соответствующие кнопки
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const imageButton = document.querySelector(".profile__image");

editButton.addEventListener("click", () => openPopup(popupEdit));
addButton.addEventListener("click", () => openPopup(popupAddCard));
imageButton.addEventListener("click", () => openPopup(popupAvatarEdit));

// Закрываем попапы при клике на крестик
closeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const popup = e.target.closest(".popup");
    closePopup(popup);
  });
});

// Закрываем попапы при клике на фон
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  });
});

// Обработчик закрытия попапа при нажатии на Esc
function handleEscClose(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Редактирование профиля
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const formElement = document.querySelector(".popup__form_type_edit");

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

formElement.addEventListener("submit", handleFormSubmit);

// Добавление карточки
const addCardForm = document.querySelector(".popup__form_type_add");

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const titleInput = document.querySelector(".popup__input_type_title");
  const linkInput = document.querySelector(".popup__input_type_link");

  // Проверка на пустые значения
  if (!titleInput.value || !linkInput.value) {
    return; // если одно из полей пустое, не добавляем карточку
  }

  const newCard = {
    name: titleInput.value,
    link: linkInput.value,
  };

  // Создаем карточку и добавляем в начало списка
  const cardElement = createCard(
    newCard,
    deleteCard,
    handleLike,
    handleImageClick
  );
  placesList.prepend(cardElement);

  // Закрываем попап и очищаем форму
  closePopup(popupAddCard);
  addCardForm.reset(); // Очищаем форму
});
initialCards.forEach((card) => {
  const cardElement = createCard(
    card,
    deleteCard,
    handleLike,
    handleImageClick
  ); // передаем обработчик лайка
  placesList.append(cardElement);
});

function openAvatarPopup() {
  const avatarPopup = document.querySelector(".popup_type_avatar");
  openModal(avatarPopup); // Открываем попап
}


function handleAvatarChange(evt) {
  evt.preventDefault(); 

  const avatarInput = document.querySelector('input[name="avatar"]');
  const avatarFile = avatarInput.files[0];

  if (avatarFile) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const newAvatar = event.target.result;
      const avatarImage = document.querySelector("#profile-avatar");
      avatarImage.src = newAvatar; 
      closeModal(document.querySelector(".popup_type_avatar")); 
    };
    reader.readAsDataURL(avatarFile); 
  } else {
    console.error("Нет изображения для загрузки");
  }
}

const avatarForm = document.querySelector('.popup__form[name="avatar-edit"]');

avatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const avatarInput = avatarForm.querySelector('input[name="avatar"]');
  const newAvatarUrl = avatarInput.value;

  if (!newAvatarUrl) return;

  profileImage.style.backgroundImage = `url(${newAvatarUrl})`;

  closePopup(popupAvatarEdit);
  avatarForm.reset();
});
