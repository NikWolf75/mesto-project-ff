import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js'; 
import { handleLike, handleImageClick } from './handlers.js'; // Импортируем handleImageClick
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
  const cardElement = createCard(card, deleteCard, handleLike, handleImageClick); // Передаем обработчик клика по изображению
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
  document.addEventListener('keydown', handleEscClose); // Добавляем слушатель
}

// Переименовали переменные для изображения и подписи
const imagePopupElement = popupImagePopup.query
