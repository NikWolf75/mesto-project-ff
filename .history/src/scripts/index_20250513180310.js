import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js';
import logo from '../images/logo.svg'; // Используем import для загрузки изображений
import avatar from '../images/avatar.jpg';

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
  const cardElement = createCard(card, deleteCard);
  placesList.append(cardElement);
});

// Получаем все попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');
const popupAvatarEdit = document.querySelector('.popup_type_avatar-edit');

// Получаем все кнопки закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close');

// 2. Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose); // добавляем слушатель
}

// 3. Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose); // удаляем слушатель
}

// Открываем попапы при клике на соответствующие кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const imageButton = document.querySelector('.profile__image');

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

function handleEscClose(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}


const formElement = document.querySelector('.popup__form_type_edit'); // форма редактирования профиля
const nameInput = formElement.querySelector('.popup__input_type_name'); // поле "Имя"
const jobInput = formElement.querySelector('.popup__input_type_description'); // поле "О себе"
const profileName = document.querySelector('.profile__title'); // отображаемое имя
const profileAbout = document.querySelector('.profile__description');

// 2. Поля формы
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_description');

// 3. При открытии попапа редактирования подставляем значения
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(popupEdit);
});

function handleFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение

  // Обновляем содержимое на странице
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;

  // Закрываем попап после сохранения
  closePopup(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit);