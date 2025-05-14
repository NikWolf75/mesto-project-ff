import './styles.css';  // Подключите стили, если они используются
import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js';
import { handleLike, handleImageClick } from './handlers.js';

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// Получаем попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupAvatarEdit = document.querySelector('.popup_type_avatar-edit');
const popupAddCard = document.querySelector('.popup_type_add');

// Получаем кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const imageButton = document.querySelector('.profile__image');

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Закрытие попапа при нажатии на Esc
function handleEscClose(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Обработчик изменения профиля
const formEditProfile = popupEdit.querySelector('form');
formEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = formEditProfile.querySelector('input[name="name"]').value;
  const description = formEditProfile.querySelector('input[name="description"]').value;

  profileTitle.textContent = name;
  profileDescription.textContent = description;
  closePopup(popupEdit);
});

// Обработчик смены аватара
const formEditAvatar = popupAvatarEdit.querySelector('form');
formEditAvatar.addEventListener('submit', (e) => {
  e.preventDefault();
  const avatarUrl = formEditAvatar.querySelector('input[name="avatar"]').value;

  profileImage.style.backgroundImage = `url(${avatarUrl})`;
  closePopup(popupAvatarEdit);
});

// Открытие попапа редактирования профиля
editButton.addEventListener('click', () => {
  const name = profileTitle.textContent;
  const description = profileDescription.textContent;

  popupEdit.querySelector('input[name="name"]').value = name;
  popupEdit.querySelector('input[name="description"]').value = description;

  openPopup(popupEdit);
});

// Открытие попапа для добавления новой карточки
addButton.addEventListener('click', () => openPopup(popupAddCard));

// Открытие попапа для смены аватара
imageButton.addEventListener('click', () => openPopup(popupAvatarEdit));

// Закрытие попапа при клике на крестик
document.querySelectorAll('.popup__close').forEach((button) => {
  button.addEventListener('click', (e) => {
    const popup = e.target.closest('.popup');
    closePopup(popup);
  });
});

// Закрытие попапа при клике на фон
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  });
});

// Отображение карточек
const placesList = document.querySelector('.places__list');
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard, handleLike, handleImageClick);
  placesList.append(cardElement);
});
