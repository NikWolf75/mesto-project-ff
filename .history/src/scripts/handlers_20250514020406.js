// handlers.js

// Функция обработки клика по лайку
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

export function handleImageClick(evt) {
  const imagePopupElement = document.querySelector('.popup__image');  // Получаем элемент изображения в попапе
  const popupCaption = document.querySelector('.popup__caption');  // Получаем элемент подписи в попапе

  imagePopupElement.src = evt.target.src;  // Устанавливаем картинку
  popupCaption.textContent = evt.target.alt; // Устанавливаем подпись

  const popupImagePopup = document.querySelector('.popup_type_image'); // Получаем сам попап с изображением
  openModal(popupImagePopup);  // Открываем попап с изображением
}
export function openModal(popup) {
  popup.classList.add('popup_opened');  // Добавляем класс, чтобы попап открылся
  document.addEventListener('keydown', handleEscClose);  // Обработчик закрытия попапа по Esc
}
export function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');  // Ищем открытый попап
    if (openPopup) {
      closeModal(openPopup);  // Закрываем попап
    }
  }
}