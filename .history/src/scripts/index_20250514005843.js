import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js';
import { handleLike, handleImageClick } from './handlers.js';

// Получаем попап с картинкой
const popupImage = document.querySelector('.popup_type_image');
const popupImageContent = popupImage.querySelector('.popup__image');
const closeButton = popupImage.querySelector('.popup__close');

// Функция для открытия попапа с изображением
function openImagePopup(imageSrc) {
  popupImageContent.src = imageSrc;
  popupImage.classList.add('popup_opened');
}

// Функция для закрытия попапа
function closeImagePopup() {
  popupImage.classList.remove('popup_opened');
}

// Закрытие попапа при клике на кнопку
closeButton.addEventListener('click', closeImagePopup);

// Закрытие попапа при клике на фон
popupImage.addEventListener('click', (e) => {
  if (e.target === popupImage) {
    closeImagePopup();
  }
});

// Вывод карточек с обработкой клика по картинке
const placesList = document.querySelector('.places__list');
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard, handleLike, (event) => {
    openImagePopup(card.link); // передаем ссылку на картинку
  });
  placesList.append(cardElement);
});
