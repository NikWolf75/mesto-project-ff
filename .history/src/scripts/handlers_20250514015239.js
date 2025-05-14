import { openModal } from './utils.js';  // Убедитесь, что openModal импортирован

// Обработчик лайка
export function handleLike(event) {
  const likeButton = event.target;

  // Проверяем, был ли уже лайкнут
  if (likeButton.classList.contains('card__like-button_is-active')) {
    // Убираем активный класс
    likeButton.classList.remove('card__like-button_is-active');
  } else {
    // Добавляем активный класс
    likeButton.classList.add('card__like-button_is-active');
  }
}

// Обработчик клика на изображение
export function handleImageClick(evt) {
  const imagePopupElement = document.querySelector('.popup__image'); // Здесь мы находим элемент изображения
  const popupCaption = document.querySelector('.popup__caption'); // Здесь находим элемент для подписи

  imagePopupElement.src = evt.target.src;  // Устанавливаем картинку
  popupCaption.textContent = evt.target.alt; // Устанавливаем подпись
  openModal(document.querySelector('.popup_type_image'));  // Открываем попап с изображением
}