import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js';
import { handleLike, handleImageClick } from './handlers.js';
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

// Получаем список мест (карточек)
const placesList = document.querySelector('.places__list');

// Вывод карточек
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard, handleLike, (event) => handleImageClick(event, openPopup));
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
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);

  // Если попап редактирования открыт, заполняем поля формы
  if (popup === popupEdit) {
    const nameInput = popup.querySelector('.popup__input_type_name');
    const aboutInput = popup.querySelector('.popup__input_type_description');

    if (nameInput && aboutInput) {
      nameInput.value = profileName.textContent; // Заполняем полем из профиля
      aboutInput.value = profileAbout.textContent; // Заполняем полем из профиля
    }
  }
}

// Функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Обработчик закрытия попапа при нажатии на Esc
function handleEscClose(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Открываем попапы при клике на
