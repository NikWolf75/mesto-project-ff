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

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const formElement = document.forms['edit-profile']; // Правильный выбор формы

editButton.addEventListener('click', () => {
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

formElement.addEventListener('submit', handleFormSubmit);

const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = document.forms['add-card'];
const titleInput = formAddCard.querySelector('.popup__input_type_title');
const linkInput = formAddCard.querySelector('.popup__input_type_link');

addButton.addEventListener('click', () => {
  formAddCard.reset(); // очищаем поля
  openPopup(popupAddCard);
});
