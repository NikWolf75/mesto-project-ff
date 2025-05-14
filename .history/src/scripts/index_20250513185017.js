import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js';
import logo from '../images/logo.svg';
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
  const cardElement = createCard(card, deleteCard, handleLike, handleImageClick);
  placesList.append(cardElement);
});

// Получаем все попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');
const popupAvatarEdit = document.querySelector('.popup_type_avatar-edit');
const popupAddCard = document.querySelector('.popup_type_add');

// Получаем все кнопки закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close');

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose); // добавляем слушатель
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
imageButton.addEventListener('click', () => openPopup(popupAvatarEdit)); // открывает попап для смены аватара

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

// Обработчик закрытия попапа при нажатии на Esc
function handleEscClose(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Редактирование профиля
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formElement = document.querySelector('.popup__form_type_edit');

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

// Добавление карточки
const addCardForm = document.querySelector('.popup__form_type_add');

addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const titleInput = document.querySelector('.popup__input_type_title');
  const linkInput = document.querySelector('.popup__input_type_link');

  // Проверка на пустые значения
  if (!titleInput.value || !linkInput.value) {
    return; // если одно из полей пустое, не добавляем карточку
  }

  const newCard = {
    name: titleInput.value,
    link: linkInput.value
  };

  // Создаем карточку и добавляем в начало списка
  const cardElement = createCard(newCard, deleteCard, handleLike, handleImageClick);
  placesList.prepend(cardElement);

  // Закрываем попап и очищаем форму
  closePopup(popupAddCard);
  addCardForm.reset(); // Очищаем форму
});

// Функция для лайка карточки
function handleLike(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_active');
}

// Функция для открытия попапа с картинкой
function handleImageClick(evt, name, link) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageTitle = popupImage.querySelector('.popup__image-title');
  const popupImageImage = popupImage.querySelector('.popup__image');

  // Устанавливаем источник изображения и текст заголовка
  popupImageImage.src = link;
  popupImageImage.alt = name;
  popupImageTitle.textContent = name;

  // Открываем попап с изображением
  openPopup(popupImage);
}

// Создание карточки
function createNewCard({ name, link }, deleteCard, handleLike, handleImageClick) {
  const cardElement = document.createElement('li');
  cardElement.classList.add('places__item', 'card');

  cardElement.innerHTML = `
    <img class="card__image" src="${link}" alt="${name}" />
    <button type="button" class="card__delete-button"></button>
    <div class="card__description">
      <h2 class="card__title">${name}</h2>
      <div class="card__like-container">
        <button type="button" class="card__like-button"></button>
        <span class="card__like-count"></span>
      </div>
    </div>
  `;

  // Добавляем обработчик для кнопки лайка
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', handleLike);

  // Добавляем обработчик для клика на картинку
  const imageElement = cardElement.querySelector('.card__image');
  imageElement.addEventListener('click', (evt) => handleImageClick(evt, name, link));

  return cardElement;
}
