import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js'; 
import { handleLike, handleImageClick } from './handlers.js';
import logo from '../images/logo.svg';
import avatar from '../images/avatar.jpg';
import { openModal, closeModal } from './utils.js';

// Загрузка логотипа
const img = document.createElement('img');
img.src = logo;
img.alt = 'Логотип проекта место';
img.classList.add('logo', 'header__logo');
document.body.appendChild(img);

// Обновление аватара
const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

// Обновление логотипа в header
const logoImg = document.querySelector('.header__logo');
logoImg.src = logo;

// Вывод карточек
const placesList = document.querySelector('.places__list');
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard, handleLike, handleImageClick); // передаем обработчик лайка
  placesList.append(cardElement);
});

// Получаем все попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupImagePopup = document.querySelector('.popup_type_image');
const popupAvatarEdit = document.querySelector('.popup_type_avatar-edit');
const popupAddCard = document.querySelector('.popup_type_add');

// Получаем все кнопки закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close');

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose); // добавляем слушатель
}

// Переименовали переменные для изображения и подписи
const imagePopupElement = popupImagePopup.querySelector('.popup__image');
const popupCaption = popupImagePopup.querySelector('.popup__caption');

// Обработчик клика по картинке
function handleImageClick(evt) {
  imagePopupElement.src = evt.target.src;  // Устанавливаем картинку
  popupCaption.textContent = evt.target.alt; // Устанавливаем подпись
  openPopup(popupImagePopup);  // Открываем попап с изображением
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose); // удаляем слушатель
}

// Открываем попапы при клике на соответствующие кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const imageButton = document.querySelector('.profile__image');

editButton.addEventListener('click', () => openPopup(popupEdit));
addButton.addEventListener('click', () => openPopup(popupAddCard)); // открывает попап для добавления карточки
imageButton.addEventListener('click', () => openPopup(popupAvatarEdit)); // откры
