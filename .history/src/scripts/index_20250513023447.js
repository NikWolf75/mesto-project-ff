
import '../pages/index.css';


import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js';

import logo from '../images/logo.svg'; // Используем import для загрузки изображений

const img = document.createElement('img');
img.src = logo;
img.alt = 'Логотип проекта место';
img.classList.add('logo', 'header__logo');
document.body.appendChild(img);


import avatar from '../images/avatar.jpg';

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

const logoImg = document.querySelector('.header__logo');
logoImg.src = logo;
// Вывод карточек
const placesList = document.querySelector('.places__list');

initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard);
  placesList.append(cardElement);
});

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const imageButton = document.querySelector('.profile__image');

// Получаем все попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');
const popupAvatarEdit = document.querySelector('.popup_type_avatar-edit');
const popupCardDelete = document.querySelector('.popup_type__card-delete');

// Получаем все кнопки закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close');

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Открываем попапы при клике на соответствующие кнопки
editButton.addEventListener('click', () => openPopup(popupEdit));
addButton.addEventListener('click', () => openPopup(popupAvatarEdit));
imageButton.addEventListener('click', () => openPopup(popupImage));

// Закрываем попапы при клике на крестик
closeButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const popup = e.target.closest('.popup');
    closePopup(popup);
  });
});

// Закрываем попапы при клике на фон
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  });
});

// Получаем все кнопки закрытия попапа
const closeButtons = document.querySelectorAll('.popup__close');

